
"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface EditEventFormInputs {
    title: string;
    date: string;
    location: string;
    description: string;
    image?: string; 
    id: number;
  }

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EditEventFormInputs;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ isOpen, onClose, event }) => {
  const { register, handleSubmit, setValue } = useForm<EditEventFormInputs>({
    defaultValues: event,
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<EditEventFormInputs> = async (data) => {
    try {
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
          data.image = reader.result as string;
          await axios.put(`/api/event`, data);
          router.push(`/event/${data.id}`);
          alert("Evento editado!");
          window.location.reload();
        };
        reader.readAsDataURL(file);
      } else {
        delete data.image; // Remove the image key if no new image is selected
        await axios.put(`/api/event`, data);
        router.push(`/event/${data.id}`);
        alert("Evento editado!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Editar Evento</h2>
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
              <input type="number" className="hidden" {...register("id")} />
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
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="URL da Imagem"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => onClose()}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
