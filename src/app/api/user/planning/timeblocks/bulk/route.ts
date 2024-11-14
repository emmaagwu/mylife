import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { generateRecurringDates } from "@/lib/utils/timeblock";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json: BulkTimeBlockOperation = await request.json();
    const { originalId, dates, operation, timeBlockData } = json;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    switch (operation) {
      case 'create': {
        if (!timeBlockData) {
          return NextResponse.json({ error: "Time block data required" }, { status: 400 });
        }

        const createdBlocks = await Promise.all(
          dates.map(date => {
            const startTime = new Date(date);
            const endTime = new Date(date);
            endTime.setHours(endTime.getHours() + 1); // Default 1-hour duration

            return prisma.timeBlock.create({
              data: {
                ...timeBlockData,
                startTime,
                endTime,
                userId: user!.id
              }
            });
          })
        );

        return NextResponse.json(createdBlocks);
      }

      case 'update': {
        if (!originalId) {
          return NextResponse.json({ error: "Original ID required" }, { status: 400 });
        }

        const updatedBlocks = await Promise.all(
          dates.map(date => 
            prisma.timeBlock.update({
              where: { id: originalId },
              data: {
                ...timeBlockData,
                startTime: date
              }
            })
          )
        );

        return NextResponse.json(updatedBlocks);
      }

      case 'delete': {
        if (!originalId) {
          return NextResponse.json({ error: "Original ID required" }, { status: 400 });
        }

        await prisma.timeBlock.deleteMany({
          where: {
            id: originalId,
            startTime: {
              in: dates
            }
          }
        });

        return NextResponse.json({ message: "Time blocks deleted successfully" });
      }

      default:
        return NextResponse.json({ error: "Invalid operation" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}