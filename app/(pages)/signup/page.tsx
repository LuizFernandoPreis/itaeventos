"use client";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { signUpRequest } from "@/app/services/auth"; 
import { AuthContext, AuthProvider } from "@/app/contexts/AuthContext";

export default function Home() {
  const { signUp } = useContext(AuthContext);
  useEffect(() => {
    const form = document.getElementById("userForm");
    const handleSubmit = async (event: Event) => {
      event.preventDefault();

      const name = (document.getElementById("nome") as HTMLInputElement).value;
      const email = (document.getElementById("email") as HTMLInputElement)
        .value;
      const password = (document.getElementById("senha") as HTMLInputElement)
        .value;
      const role = "adm";

      await signUp({ email, password, name, role });
    };

    form?.addEventListener("submit", handleSubmit);

    return () => {
      form?.removeEventListener("submit", handleSubmit);
    };
  }, []);
  return (
    <>
    <AuthProvider>
      <div className="flex justify-center h-screen">
        <div className="bg-white bg-opacity-50 p-8 rounded-lg  md:shadow-lg w-full md:my-auto max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
          <form id="userForm">
            <div className="mb-4">
              <label
                htmlFor="nome"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Digite seu nome"
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Digite seu email"
              ></input>
            </div>
            <div className="mb-6">
              <label
                htmlFor="senha"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Digite sua senha"
              ></input>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Cadastrar
              </button>
              <Link href="/signin" className="text-blue-500">
                Já Possuo Conta
              </Link>
            </div>
          </form>
        </div>
      </div>
      </AuthProvider>
    </>
  );
}