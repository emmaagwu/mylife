import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // This would normally fetch from your database
  const data = {
    statement: "I am a creative problem solver dedicated to making a positive impact",
    values: ["Growth", "Authenticity", "Impact", "Balance"],
    mission: "To inspire and empower others through technology and innovation",
    purpose: "Creating solutions that make the world a better place",
    drivers: ["Learning", "Creating", "Connecting", "Contributing"]
  };

  return NextResponse.json(data);
} 