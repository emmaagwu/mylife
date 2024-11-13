import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userVisionBoard = await prisma.visionBoard.findMany({
      where: {
        userId: session.user.id
      },
      select: {
        id: true,
        imageUrl: true
      }
    });

    // Using specific Unsplash image IDs for more reliable placeholders
    const placeholderImages = [
      "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&q=80"
    ];

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
      visionBoard: userVisionBoard.length > 0 
        ? userVisionBoard.map(item => item.imageUrl)
        : {
            images: placeholderImages,
            isPlaceholder: true,
            message: "Personalize your vision board by adding your own inspiring images"
          }
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inspiration data' }, 
      { status: 500 }
    );
  }
} 