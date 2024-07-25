import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>
}

type SignInResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    avatar_url: string;
  };
} | null;

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children} : any) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      recoverUserInformation().then(response => {
        setUser(response.user)
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const response: SignInResponse = await signInRequest({
      email,
      password,
    });
  
    if (response === null) {
      return 
    }
  
    const { token, user } = response;

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, 
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user)


  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
