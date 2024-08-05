import { Button } from "@/components/ui/button";
import Image from "next/image";
import home from "../../public/home.png"; // Assuming you save the uploaded image in the public directory
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            src={home}
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-secondary text-lg tracking-widest">
                100% Prodotti Naturali
              </h2>
              <h1 className="text-primary text-4xl  tracking-tighter sm:text-5xl xl:text-6xl/none font-extrabold">
                Natura e qualità a portata di mano
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl font-light">
                L'Azienda Agricola Il Pichello è il tuo punto di riferimento per
                gustare e vivere la genuinità, con una gamma di prodotti 100%
                naturali, coltivati e prodotti con amore e dedizione.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button variant="secondary" asChild>
                <Link href="#">Scopri di più</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
