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
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
  
    try {
      if (id) {
        // Se um ID for fornecido, retorna o evento com esse ID
        const event = await prisma.events.findUnique({
          where: { id: Number(id) },
        });
  
        if (event) {
          return NextResponse.json(event, { status: 200 });
        } else {
          return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 });
        }
      } else {
        // Se nenhum ID for fornecido, retorna todos os eventos
        const events = await prisma.events.findMany();
        return NextResponse.json(events, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json({ error: 'Erro ao buscar eventos' }, { status: 500 });
    }
  }