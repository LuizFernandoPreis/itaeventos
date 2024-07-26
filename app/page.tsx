"use client";
import Image from "next/image";
import HomePage from "./_components/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
      <Footer />
    </>
  );
}
