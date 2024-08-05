import Hero from "@/components/Hero";
import ChiSiamo from "@/components/ChiSiamo";
import Products from "@/components/Products";
import Navbar from "@/components/Navbar";
import UniscitiANoi from "@/components/UniscitiANoi";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <ChiSiamo />
      <Products />
      <UniscitiANoi />
      <Footer />
    </>
  );
}
