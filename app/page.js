import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import HotTours from "./components/HotTours";
import TheDeets from "./components/TheDeets";
import MeetFoodie from "./components/MeetFoodie";
import Testimonials from "./components/Testimonials";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyUs />
        <HotTours />
        <TheDeets />
        <MeetFoodie />
        <Testimonials />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
