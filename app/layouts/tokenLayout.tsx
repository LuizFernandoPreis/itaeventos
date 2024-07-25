// pages/_layouts/tokenLayout.tsx
import React from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const TokenLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default TokenLayout;
