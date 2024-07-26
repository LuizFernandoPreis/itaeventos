import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid'

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email }, 
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    if(user.password != password) return NextResponse.json({ message: 'Senha incorreta' }, { status: 501 });
    
    const data = {
      token: uuid(),
      user: {
        name: user.name,
        email: user.email,
      }
    }
    console.log(data)
    return NextResponse.json({data }, { status: 200 });
    
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json({ message: 'Erro ao buscar usuário' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: 'oi' });
}
