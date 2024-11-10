import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = {
    books: [
      {
        id: '1',
        title: "Atomic Habits",
        author: "James Clear",
        progress: 65
      }
    ],
    achievements: [
      {
        id: '1',
        title: "30 Days Meditation Streak",
        date: "2024-02-15"
      }
    ],
    mentors: [
      {
        id: '1',
        name: "Sarah Johnson",
        expertise: "Leadership Development"
      }
    ]
  };

  return NextResponse.json(data);
} 