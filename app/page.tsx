'use client'
import Image from "next/image";
import HomePage from "./_components/HomePage";
import { AuthProvider } from "./contexts/AuthContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthProvider>
        

      <HomePage/>
      
      </AuthProvider>

      </main>
  );
}
