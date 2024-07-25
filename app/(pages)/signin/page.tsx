'use client'
import Image from "next/image";
import LoginForm from "../../_components/LoginForm";
import { AuthProvider } from "../../contexts/AuthContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthProvider>
      <LoginForm/>
      </AuthProvider>
      </main>
  );
}
