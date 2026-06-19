import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Objectives from "@/components/home/Objectives";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Objectives />
      <Footer />
    </>
  );
}