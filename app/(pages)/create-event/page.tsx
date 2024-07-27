import EventForm from "@/app/_components/Eventform";
import Footer from "@/app/_components/Footer";

export default function CreateEventPage() {
  return (
    <>
      <div>
        <EventForm />
      </div>
      <div className="w-screen">
        <Footer />
      </div>
    </>
  );
}
