"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Spinner from "@/app/_components/spinner";
import Footer from "@/app/_components/Footer";

interface EditEventFormInputs {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  id: number;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export default function EditEvent({ params }: { params: { id: Number } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id;
  const { register, handleSubmit, setValue } = useForm<EditEventFormInputs>();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/event?${id}`)
        .then((response) => {
          setEvent(response.data[0]);
          const data = response.data[0];
          console.log(response);
          setValue("title", data.title);
          setValue("date", data.date);
          setValue("location", data.location);
          setValue("description", data.description);
          setValue("image", data.image);
          setValue("id", data.id)
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching event data:", error);
        });
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<EditEventFormInputs> = async (data) => {
    try {
        console.log(data)
      await axios.put(`/api/event`, data);
      router.push(`/event/${id}`);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!event) return <Spinner />;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Editar Evento
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="title" className="sr-only">
                  Título
                </label>
                <input
                  {...register("title")}
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Título do Evento"
                />
              </div>
              <div>
                <label htmlFor="date" className="sr-only">
                  Data
                </label>
                <input type="number" className="hidden" {...register("id")}/>
                <input
                  {...register("date")}
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Data do Evento"
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">
                  Localização
                </label>
                <input
                  {...register("location")}
                  id="location"
                  name="location"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Localização do Evento"
                />
              </div>
              <div>
                <label htmlFor="description" className="sr-only">
                  Descrição
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Descrição do Evento"
                />
              </div>
              <div>
                <label htmlFor="image" className="sr-only">
                  Imagem
                </label>
                <input
                  {...register("image")}
                  id="image"
                  name="image"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="URL da Imagem"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-screen">
        <Footer />
      </div>
    </>
  );
}
