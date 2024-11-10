import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/authoptions';
// import { authOptions } from '../../auth/[...nextauth]/route';


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const coreIdentity = await prisma.coreIdentity.findUnique({
      where: { userId },
    });
    
    // If no identity exists yet, return default empty values
    if (!coreIdentity) {
      return NextResponse.json({
        statement: "",
        values: [],
        mission: "",
        purpose: "",
        drivers: [],
      });
    }
    
    return NextResponse.json(coreIdentity);
  } catch (error) {
    console.error("Error fetching identity data:", error);
    return NextResponse.json(
      { error: 'Failed to fetch identity data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const data = await request.json();

    // Validate and sanitize the input data
    const sanitizedData = {
      statement: data.statement || "",
      values: Array.isArray(data.values) ? data.values : [],
      mission: data.mission || "",
      purpose: data.purpose || "",
      drivers: Array.isArray(data.drivers) ? data.drivers : [],
    };

    const updatedIdentity = await prisma.coreIdentity.upsert({
      where: { userId },
      create: {
        userId,
        ...sanitizedData
      },
      update: sanitizedData,
    });

    return NextResponse.json(updatedIdentity);
  } catch (error) {
    console.error("Error updating identity data:", error);
    return NextResponse.json(
      { error: 'Failed to update identity data' },
      { status: 500 }
    );
  }
}
