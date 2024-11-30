import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = (await params).id;

    const timeBlock = await prisma.timeBlock.findUnique({
      where: {
        id: id
      },
      include: {
        goal: {
          include: {
            role: true
          }
        }
      }
    });

    if (!timeBlock) {
      return NextResponse.json({ error: "TimeBlock not found" }, { status: 404 });
    }

    return NextResponse.json(timeBlock);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const { 
      goalId, 
      title, 
      description, 
      startTime, 
      endTime, 
      isCompleted,
      isRecurring, 
      recurrence 
    } = json;

    const id = (await params).id;

    const timeBlock = await prisma.timeBlock.update({
      where: {
        id: id
      },
      data: {
        goalId,
        title,
        description,
        startTime: startTime ? new Date(startTime) : undefined,
        endTime: endTime ? new Date(endTime) : undefined,
        isCompleted,
        isRecurring,
        recurrence
      },
      include: {
        goal: true
      }
    });

    return NextResponse.json(timeBlock);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = (await params).id;

    await prisma.timeBlock.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json({ message: "TimeBlock deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}