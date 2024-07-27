"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { token } = parseCookies();
  const isAuthenticated = !!token;

  
  return (
    <>
    {isAuthenticated ? (
      <nav className={`${!isAuthenticated ? 'hidden' : ''}bg-gray-900 p-4 `}>
        <div className="container mx-auto flex items-center justify-between relative">
          <a href="/" className="flex items-center text-white mr-auto w-[100%]">
            <img src="/logo.jpg" alt="Logo" className="h-12 mr-1 w-auto" />
            ItaEventos
          </a>
          <button
            onClick={toggleMenu}
            className="text-white lg:hidden"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={isOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div
            className={`lg:flex lg:flex-row-reverse lg:items-center lg:space-x-4 absolute bg-gray-900 lg:relative right-0 top-full z-10 mt-2 w-full origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              isOpen ? "block" : "hidden"
            }`}
            id="navbarNav"
          >
            <a
              href="/login"
              className="block lg:inline-block text-gray-300 hover:text-white mt-4 lg:mt-0 px-4 py-2"
            >
              Deslogar
            </a>
            
            <a
              href="/create-event"
              className="block lg:inline-block text-gray-300 hover:text-white mt-4 lg:mt-0 px-4 py-2"
            >
              Novo Evento
            </a>
            <a
              href="/getTask"
              className="block lg:inline-block text-gray-300 hover:text-white mt-4 lg:mt-0 px-4 py-2"
            >
              Ver Tarefas
            </a>
            <a
              href="/calendario"
              className="block lg:inline-block text-gray-300 hover:text-white mt-4 lg:mt-0 px-4 py-2"
            >
              Meu Calendário
            </a>
            <a
              href="/"
              className="block lg:inline-block text-gray-300 hover:text-white mt-4 lg:mt-0 px-4 py-2"
            >
              Página Principal
            </a>
          </div>
        </div>
      </nav>)
      : (<></>)}
    </>
  );
};

export default Navbar;
