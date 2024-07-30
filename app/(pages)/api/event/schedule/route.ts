import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { description, schedule, status, eventId } = await request.json();

  try {
    const script = await prisma.schedule.create({
      data: {
        description,
        time: new Date(schedule),
        status,
        eventId,
      },
    });

    return NextResponse.json(script, { status: 201 }); // Use 201 para criação bem-sucedida
  } catch (error) {
    console.error('Error creating script:', error);
    return NextResponse.json({ error: 'Erro ao criar roteiro' }, { status: 400 });
  }
}
