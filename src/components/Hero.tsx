import { Button } from "@/components/ui/button";
import Image from "next/image";
import home from "../../public/home.png"; // Assuming you save the uploaded image in the public directory
import Link from "next/link";
import ScrittaPiccolina from "./scrittaPiccolina";

export default function Hero() {
  return (
    <section className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20">
      <div className="container px-4 md:px-6 container">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            src={home}
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <ScrittaPiccolina>100% Prodotti Naturali</ScrittaPiccolina>
              <h1 className="font-extrabold text-4xl lg:text-5xl text-primary tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
                Seminiamo Tradizione, Raccogliamo Autenticità
              </h1>
              <p className="max-w-[600px] text-black text-lg font-light">
                Nel cuore dell’Appennino Reggiano coltiviamo con passione
                cereali, legumi e miele, che trasformiamo con cura nel nostro
                laboratorio aziendale insieme a tante altre nostre produzioni.
                Al Pichello ogni prodotto nasce dalla terra e arriva sulle
                tavole con la sincerità di chi rispetta la natura e i suoi
                tempi.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button variant="secondary" asChild>
                <Link href="#contatti">Contattaci</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
