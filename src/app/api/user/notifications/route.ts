import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = {
    notifications: [
      {
        id: '1',
        message: "New comment on your goal",
        time: "5m ago",
        read: false,
        type: "message"
      },
      {
        id: '2',
        message: "Daily reflection reminder",
        time: "1h ago",
        read: true,
        type: "reminder"
      }
    ]
  };

  return NextResponse.json(data);
} 