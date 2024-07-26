"use client";
import Image from "next/image";
import HomePage from "./_components/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import HomeCard from "./_components/HomeCard";
import { Event } from "./types/event";

export default function Home() {
  const events: Event[] = [
    {
      id: 1,
      title: 'Conference 2024',
      date: '2024-08-20',
      location: 'New York, NY',
      description: 'An exciting conference about technology and innovation.',
      image: '/config.jpeg'
    },
    {
      id: 2,
      title: 'Workshop on AI',
      date: '2024-09-15',
      location: 'San Francisco, CA',
      description: 'Hands-on workshop on Artificial Intelligence.',
      image: '/path/to/image2.jpg'
    }
    // Adicione mais eventos conforme necessário
  ];

  return (
    <div className="flex flex-wrap justify-center items-center h-screen space-x-4">
      {events.map(event => (
        <HomeCard key={event.id} event={event} />
      ))}
    </div>
  )
}
