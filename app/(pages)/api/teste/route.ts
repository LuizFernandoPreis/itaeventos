
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password, name, role } = await request.json();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password, 
        name,
        role,
      },
    });

    NextResponse.json(user);
    return NextResponse.json({},{status: 200})
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar usuário' }, {status: 400});
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({'data': 'oi'})
}
