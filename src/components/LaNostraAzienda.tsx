import { Button } from "@/components/ui/button";
import Image from "next/image";
import ChiSiamoImage from "../../public/ChiSiamoImage.png"; // Assuming you save the uploaded image in the public directory
import Link from "next/link";
import "../app/globals.css";
import ScrittaPiccolina from "./scrittaPiccolina";

export default function LaNostraAzienda() {
  return (
    <section className=" bg-primary   text-secondary-foreground">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[600px_1fr]">
          <Image
            src={ChiSiamoImage}
            alt="Chi siamo"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <ScrittaPiccolina white={true}>Il Pichello</ScrittaPiccolina>
              <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
                La nostra azienda
              </h1>
              <p className="max-w-[600px] text-lg font-light">
                L’azienda agricola Il Pichello deve il suo nome alla storica
                casa contadina chiamata da sempre ‘pichel‘ (in dialetto
                reggiano), che poi venne italianizzato sulle carte più antiche
                come Pichello. La nostra azienda produce prodotti secondo il
                nostro metodo biorazionale, ovvero: seguendo i ritmi naturali
                delle stagioni, studiando con sapienza le composizioni dei vari
                terreni e selezionando le piante migliori senza l’utilizzo di
                stratagemmi moderni. La nostra idea di agricoltura sostenibile
                in montagna per offrirti un prodotto sincero!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button variant="outline" className="text-black" asChild>
                <Link href="#contatti">Contattaci</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
