import Footer from "@/components/Footer";
import HeroSection from "@/components/new/HeroSection";
import AboutSection from "@/components/new/LaNostraAzienda";
import ProductsSection from "@/components/new/Prodotti";
import LocationSection from "@/components/new/DoveSiamo";
import ContactSection from "@/components/new/Contatti";
import "../app/globals.css";

export default function Index() {
  return (
    <div>
      {/* <Navbar /> */}
      <main className="min-h-[90vh]">
        {/* <Hero /> */}
        <HeroSection />
        <div className="bg-[#FBECC9]">
          <AboutSection />
        </div>
        <ProductsSection />
        <div className="bg-[#FBECC9]">
          <LocationSection />
        </div>
        <ContactSection />
      </main>
    </div>
  );
}
