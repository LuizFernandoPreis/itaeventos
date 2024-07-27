"use client";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { parseCookies } from "nookies";
import { AuthProvider } from "./contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { token } = parseCookies();
  const isAuthenticated = !!token;

  return (
    <html lang="pt">
      <head>
        <title>ItaEventos</title>
      </head>
      <body className="flex flex-col min-h-screen">
        {isAuthenticated && (
          <header className="bg-gray-800 text-white">
            <Navbar />
          </header>
        )}
        <main className="flex-grow">
          <AuthProvider>{children}</AuthProvider>
        </main>
        {isAuthenticated && (
          <footer className="bg-gray-800 text-white">
            <Footer />
          </footer>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
