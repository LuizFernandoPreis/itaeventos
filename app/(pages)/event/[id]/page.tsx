// pages/edit-event/[id].tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Spinner from "@/app/_components/spinner";
import Footer from "@/app/_components/Footer";
import { CalendarDaysIcon, ChatBubbleBottomCenterTextIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import HeaderSection from "@/app/_components/HeaderSection";
import EditEventModal from "@/app/_components/EditEvenForm";
import CreateScriptModal from "@/app/_components/ScheduleModal";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export default function EditEvent({ params }: { params: { id: number } }) {
  const router = useRouter();
  const id = params.id;
  const [event, setEvent] = useState<Event | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateScriptModalOpen, setIsCreateScriptModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleEditModalOpen = (eventId: number) => {
    setSelectedEventId(eventId);
    setIsEditModalOpen(true);
  };

  const handleCreateScriptModalOpen = () => {
    setIsCreateScriptModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsCreateScriptModalOpen(false);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/event?id=${id}`)
        .then((response) => {
          const data = response.data;
          setEvent(data);
          setTitle(data.title);
          setDate(data.date);
          setDescription(data.description);
        })
        .catch((error) => {
          console.error("Error fetching event data:", error);
        });
    }
  }, [id]);

  

  if (!event) return <Spinner />;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <HeaderSection event={event}></HeaderSection>
      <div className="lg:col-start-3 lg:row-end-1">
        <h2 className="sr-only">Summary</h2>
        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
          <dl className="flex flex-wrap">
            <div className="flex-auto pl-6 pt-6">
              <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
              <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$10,560.00</dd>
            </div>
            <div className="flex-none self-end px-6 pt-4">
              <dt className="sr-only">Status</dt>
              <button id="edit" onClick={openModal}>
                <PencilSquareIcon aria-hidden="true" className="h-6 w-5 text-gray-400"/>
              </button>
            </div>
            <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
              <dt className="flex-none">
                <span className="sr-only">Client</span>
                <UserCircleIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
              </dt>
              <dd className="text-sm font-medium leading-6 text-gray-900">{title}</dd>
            </div>
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
              <dt className="flex-none">
                <span className="sr-only">Due date</span>
                <CalendarDaysIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
              </dt>
              <dd className="text-sm leading-6 text-gray-500">
                <time dateTime="2023-01-31">{date}</time>
              </dd>
            </div>
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
              <dt className="flex-none">
                <span className="sr-only">Description</span>
                <ChatBubbleBottomCenterTextIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
              </dt>
              <dd className="text-sm leading-6 text-gray-500">{description}</dd>
            </div>
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            </div>
          </dl>
        </div>
        <button
        type="button"
        onClick={handleCreateScriptModalOpen}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Criar Roteiro
      </button>

      {/* Exemplo de como você pode abrir o modal de edição */}
      <EditEventModal isOpen={isEditModalOpen} onClose={handleCloseModal} event={event} />

      <CreateScriptModal
        isOpen={isCreateScriptModalOpen}
        onClose={handleCloseModal}
        eventId={selectedEventId ?? 0} 
      />
      </div>
      <Footer />
      <EditEventModal isOpen={isModalOpen} onClose={closeModal} event={event} />
    </>
  );
}
