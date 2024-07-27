'use client';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LockClosedIcon } from '@heroicons/react/24/solid';

interface SignInFormInputs {
  email: string;
  password: string;
}

export default function HomePage() {
  const { register, handleSubmit } = useForm<SignInFormInputs>();
  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormInputs> = async (data) => {
    await signIn(data);
  };

  return (
    <div className="grow flex items-center justify-center bg-white py-6 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Login</title>
      </Head>

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Efetue Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">Endereço de email</label>
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Endereço de email..."
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Senha..."
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 flex-col sm:flex-row">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Lembre-se de mim
              </label>
            </div>

            <div className="ml-5 text-sm">
              <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Cadastre-se
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Logar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
