import React from "react";
import { parseCookies } from "nookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Event } from "../types/event";



interface HomeCardProps {
  event: Event;
}

const HomeCard: React.FC<HomeCardProps> = ({ event }) => {
    const router = useRouter();
  
    const handleCardClick = () => {
      router.push(`/events/${event.id}`);
    };
  
    return (
      <div 
        className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" 
        onClick={handleCardClick}
      >
        <div className="relative h-64 w-full">
          <Image 
            src={event.image} 
            alt={event.title} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-t" 
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{event.title}</div>
          <p className="text-gray-700 text-base">
            {event.date} - {event.location}
          </p>
          <p className="text-gray-700 text-base">
            {event.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => { e.stopPropagation(); router.push(`/events/edit/${event.id}`); }}
          >
            Edit
          </button>
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => { e.stopPropagation(); alert('Delete functionality here'); }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

export default HomeCard;
