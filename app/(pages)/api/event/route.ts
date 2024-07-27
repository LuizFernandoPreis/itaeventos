// src/app/api/events/route.ts (ou onde estiver o arquivo de rotas API)

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { title, date, location, description, image } = await request.json();

  try {
    const event = await prisma.events.create({
      data: {
        title,
        date,
        location,
        description,
        image,
      },
    });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Erro ao criar evento' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
    try {
        const event = await prisma.events.findMany({});
    
        return NextResponse.json(event, { status: 200 });
      } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({ error: 'Erro ao criar evento' }, { status: 400 });
      }
    return NextResponse.json({ data: 'oi' });
  }
  