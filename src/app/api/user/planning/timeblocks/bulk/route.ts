import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { generateRecurringDates } from "@/lib/utils/timeblock";
import { BulkTimeBlockOperation, TimeBlockCreateInput} from "@/types/planning";


export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json: BulkTimeBlockOperation = await request.json();
    const { originalId, dates, operation, timeBlockData } = json;

    if (!dates || dates.length === 0) {
      return NextResponse.json({ error: "Dates are required" }, { status: 400 });
    }

    // Validate the `timeBlockData` structure if provided
    if (operation === 'create' && (!timeBlockData?.title || !timeBlockData?.userId)) {
      return NextResponse.json({ error: "Title and userId are required for creating a TimeBlock" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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

            if (!timeBlockData?.title) {
              throw new Error("Title is required for time block creation");
            }
            
            const { title, description, isCompleted, isRecurring, recurrence } = timeBlockData || {};

            return prisma.timeBlock.create({
              data: {
                ...timeBlockData,
                title: timeBlockData.title ?? 'Untitled Block', // Provide default title
                startTime,
                endTime,
                userId: user.id,
              } as TimeBlockCreateInput, // Type casting ensures Prisma compliance
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
