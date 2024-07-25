import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { parseCookies } from "nookies";
import TokenLayout from "./layouts/tokenLayout";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt">
      <head>
        <title>ItaEventos</title>
        <style>{`body { font-family: ${inter}; }`}</style>
      </head>
      <body className="flex flex-col min-h-screen">
        <header>
          <nav></nav>
          <Navbar/>
          </header>
          {children}
          <Footer/>
      </body>
    </html>
  );
};

export default RootLayout;