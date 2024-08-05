import { Button } from "@/components/ui/button";
import Image from "next/image";
import ChiSiamoImage from "../../public/ChiSiamoImage.png"; // Assuming you save the uploaded image in the public directory
import Link from "next/link";
import "../app/globals.css";

export default function ChiSiamo() {
  return (
    <section className="py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary text-secondary-foreground">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[600px_1fr]">
          <Image
            src={ChiSiamoImage}
            alt="Chi siamo"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg tracking-widest">Chi siamo</h2>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                La nostra storia, le nostre radici
              </h1>
              <p className="max-w-[600px] md:text-lg">
                Il Pichello trae il suo nome dalla storica casa contadina
                chiamata 'pichel' in dialetto reggiano, italianizzato nel tempo
                come Pichello. Da generazioni, la nostra famiglia si è dedicata
                alla coltivazione e all'allevamento, mantenendo vive le antiche
                tradizioni agricole.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button variant="outline" className="text-black" asChild>
                <Link href="#">Leggi di più</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
