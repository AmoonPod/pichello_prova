import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScrittaPiccolina from "./scrittaPiccolina";

export default function UniscitiANoi() {
  return (
    <section className="mx-auto py-8 lg:py-16 bg-secondary text-secondary-foreground text-center">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="space-y-4">
          <ScrittaPiccolina white={true}>Unisciti a Noi</ScrittaPiccolina>
          <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
            Vuoi gustare anche tu l'eccellenza dei nostri prodotti?
          </h1>
          <p className="max-w-[600px] mx-auto text-lg font-thin">
            Contattaci ora e scopri come ordinare i nostri prodotti.
          </p>
          <div className="w-full max-w-sm mx-auto mt-8">
            <Button variant="outline" asChild>
              <Link href="#" className="text-black">
                Contattaci
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
