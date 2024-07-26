import { v4 as uuid } from 'uuid'
import { db } from '@/app/lib/db'
import {UserService} from '@/app/actions/user/user'
import { NextResponse } from 'next/server';

type SignInRequestData = {
  email: string;
  password: string;
}
type SignUpRequestData = {
  name: string;
  password: string;
  email: string;
  role: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {
  const {email,password} = data;
  const response = await fetch('/api/getUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

   console.log(response)

  return NextResponse.json(response);
}

export async function signUpRequest(data : SignUpRequestData) {
  const { email, password, name, role } = data;
  const response = await fetch('/api/teste', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, role }),
  });

   if (!response.ok) {
    throw new Error('Erro ao criar usuário');
   }

  return response;
}

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com.br',
      avatar_url: 'https://github.com/diego3g.png'
    }
  }
}