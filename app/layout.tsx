import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { parseCookies } from "nookies";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ItaEventos",
  description: "Itamar, Gestão de Eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token } = parseCookies();

  if (!token) {
    return (
      <html lang="pt-br">
        <body className="flex h-full min-h-screen flex-col bg-white text-primary ">
          {children}
        </body>
      </html>
    );
  } else {
    return (
      <html lang="pt-br">
        <body className="flex h-full min-h-screen flex-col bg-white text-primary">
          <header>
            <Navbar />
          </header>
          {children}
          <Footer />
        </body>
      </html>
    );
  }
}
