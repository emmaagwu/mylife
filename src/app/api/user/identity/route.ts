import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';


export async function GET() {
  console.log("debug: GET /api/user/identity");
  const session = await getServerSession(authOptions);
  console.log("Session:", session); // Log the session object

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user?.id; // Use optional chaining to avoid undefined errors
  console.log("User ID:", userId); // Debugging line

  if (!userId) {
    return NextResponse.json({ error: 'User ID not found in session' }, { status: 401 });
  }

  try {
    console.log("Fetching identity data for user ID:", userId);
    const coreIdentity = await prisma.coreIdentity.findUnique({
      where: { userId },
    });
    
    return NextResponse.json(coreIdentity || {});
  } catch (error) {
    console.error("Error fetching identity data:", error); // Debugging line
    return NextResponse.json(
      { error: 'Failed to fetch identity data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = session.user.id;
    const data = await request.json();
    const { statement, values, mission, purpose, drivers } = data;

    const updatedIdentity = await prisma.coreIdentity.upsert({
      where: { userId },
      update: { statement, values, mission, purpose, drivers },
      create: { userId, statement, values, mission, purpose, drivers },
    });

    return NextResponse.json(updatedIdentity);
  } catch (error) {
    console.error("Error updating identity data:", error); // Debugging line
    return NextResponse.json(
      { error: 'Failed to update identity data' },
      { status: 500 }
    );
  }
}
