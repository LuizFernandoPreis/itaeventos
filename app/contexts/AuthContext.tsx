import { createContext, useEffect, useState, ReactNode } from "react";
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { recoverUserInformation, signInRequest, signUpRequest } from "../services/auth";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
}

type SignInData = {
  email: string;
  password: string;
}

type SignUpData = {
  email: string;
  password: string;
  name: string;
  role: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
}

type SignInResponse = {
  token: string;
  user: {
    name: string;
    email: string;
  };
} | null;
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'token': token } = parseCookies();

    if (token) {
      recoverUserInformation().then(response => {
        if (response) {
          setUser(response.user);
        }
      }).catch(error => {
        console.error('Erro ao recuperar informações do usuário:', error);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await fetch('/api/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        console.log(data.data); 
         
        const { token, user } = data.data;

        setCookie(undefined, 'token', token, {
          maxAge: 60 * 60 * 1, 
        })

        router.push('/')

      } else {
        alert('Email ou senha incorretos!')
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  }
  


  async function signUp({ email, password, name, role }: SignUpData) {
    try {
      await signUpRequest({ email, password, name, role });
      router.push('/signin');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      // Adicione feedback para o usuário aqui
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
