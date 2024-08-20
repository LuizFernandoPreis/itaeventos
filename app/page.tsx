"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import HomeCard from "./_components/HomeCard";
import { Event } from "./types/event";
import Spinner from "./_components/spinner";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/api/event");
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex flex-wrap justify-center items-center h-screen space-x-4">
        {events.map((event: Event) => (
          <HomeCard key={event.id} event={event} />
        ))}
      </div>
      <div className="w-screen">
        <Footer />
      </div>
    </>
  );
}
