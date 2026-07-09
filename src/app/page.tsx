import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWorks />
        <About />
        <Clients />
        <Contact />
      </main>
    </>
  );
}
