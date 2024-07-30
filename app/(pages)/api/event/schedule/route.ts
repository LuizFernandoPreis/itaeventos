import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { description, schedule, status, eventId } = await request.json();
  const eventIdInt = parseInt(eventId, 10)
  try {
    const script = await prisma.schedule.create({
      data: {
        description,
        time: schedule,
        status,
        eventId: eventIdInt,
      },
    });

    return NextResponse.json(script, { status: 201 }); // Use 201 para criação bem-sucedida
  } catch (error) {
    console.error('Error creating script:', error);
    return NextResponse.json({ error: 'Erro ao criar roteiro' }, { status: 400 });
  }
}
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log(id)
    try {
      if (id) {
        const event = await prisma.schedule.findUnique({
          where: { id: Number(id) },
        });
  
        if (event) {
          return NextResponse.json(event, { status: 200 });
        } else {
          return NextResponse.json({ error: 'roteiro não encontrado' }, { status: 404 });
        }
      } else {
        const events = await prisma.schedule.findMany();
        return NextResponse.json(events, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json({ error: 'Erro ao buscar eventos' }, { status: 500 });
    }
  }