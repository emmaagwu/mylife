import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // This would normally fetch from your database
  const data = {
    quotes: [
      {
        id: '1',
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        isFavorite: true
      },
      {
        id: '2',
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        isFavorite: false
      }
    ],
    visionBoard: [
      "/placeholder1.jpg",
      "/placeholder2.jpg",
      "/placeholder3.jpg"
    ]
  };

  return NextResponse.json(data);
} 