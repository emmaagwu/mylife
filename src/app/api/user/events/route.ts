import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = {
    events: [
      {
        id: '1',
        title: "Weekly Review",
        date: new Date().toISOString(),
        type: 'growth',
        description: "Review weekly goals and progress"
      },
      {
        id: '2',
        title: "Meditation Session",
        date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        type: 'personal',
        description: "Daily meditation practice"
      }
    ]
  };

  return NextResponse.json(data);
} 