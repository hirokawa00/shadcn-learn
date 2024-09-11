import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, role, store, status } = await req.json();
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        store,
        status,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
