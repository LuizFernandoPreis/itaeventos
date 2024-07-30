"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CreateScriptFormInputs {
  description: string;
  schedule: string;
  status: string;
  eventId: number;
}

interface CreateScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number; 
}

const CreateScriptModal: React.FC<CreateScriptModalProps> = ({ isOpen, onClose, eventId }) => {
  const { register, handleSubmit } = useForm<CreateScriptFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateScriptFormInputs> = async (data) => {
    console.log(eventId)
    try {
      await axios.post(`/api/event/schedule`, { ...data, eventId });
      router.refresh();
      alert("Roteiro criado com sucesso!");
      onClose(); 
    } catch (error) {
      console.error("Error creating script:", error);
      alert("Erro ao criar roteiro. Tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-8">
        <h2 className="text-2xl font-bold text-center">Criar Roteiro</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                {...register("description")}
                id="description"
                name="description"
                required
                className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Descrição do Roteiro"
              />
            </div>
            <div>
              <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                Horário
              </label>
              <input
                {...register("schedule")}
                id="schedule"
                name="schedule"
                type="datetime-local"
                required
                className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Horário do Roteiro"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status")}
                id="status"
                name="status"
                required
                className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="pending">Pendente</option>
                <option value="completed">Completo</option>
              </select>
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

export default CreateScriptModal;
