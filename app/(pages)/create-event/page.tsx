import EventForm from "@/app/_components/Eventform";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";

export default function CreateEventPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <EventForm />
      </div>
      <div className="w-screen">
        <Footer />
      </div>
    </>
  );
}
