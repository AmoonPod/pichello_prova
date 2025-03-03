import Hero from "@/components/Hero";
import ChiSiamo from "@/components/ChiSiamo";
import Products from "@/components/Products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Mappa from "@/components/contattaci/mappa";
import Contattaci from "@/components/contattaci/contattaci";
import LaNostraAzienda from "@/components/LaNostraAzienda";

export default function Index() {
  return (
    <div className="bg-[#FBECC9]">
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <LaNostraAzienda />
        <Products />
        <section className="mx-auto flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-8">
          <Mappa />
          <Contattaci />
        </section>
      </main>
      <Footer />
    </div>
  );
}
