import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const { timeBlockIds, calendarId } = json;

    // Get Google Calendar credentials from user's account
    const account = await prisma.account.findFirst({
      where: {
        user: { email: session.user.email },
        provider: 'google'
      }
    });

    if (!account) {
      return NextResponse.json({ error: "Google account not connected" }, { status: 400 });
    }

    // Initialize Google Calendar API
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: account.access_token });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Get time blocks to sync
    const timeBlocks = await prisma.timeBlock.findMany({
      where: {
        id: { in: timeBlockIds },
        user: { email: session.user.email }
      },
      include: {
        goal: true
      }
    });

    // Sync each time block to Google Calendar
    const syncedEvents = await Promise.all(
      timeBlocks.map(async (block) => {
        const event = {
          summary: block.title,
          description: `${block.description}\nRelated Goal: ${block.goal?.title}`,
          start: {
            dateTime: block.startTime.toISOString(),
            timeZone: 'UTC'
          },
          end: {
            dateTime: block.endTime.toISOString(),
            timeZone: 'UTC'
          }
        };

        const response = await calendar.events.insert({
          calendarId: calendarId || 'primary',
          requestBody: event
        });

        return response.data;
      })
    );

    return NextResponse.json(syncedEvents);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}