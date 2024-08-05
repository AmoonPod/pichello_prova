import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UniscitiANoi() {
  return (
    <section className="py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary text-secondary-foreground text-center">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-lg tracking-widest italic">Unisciti a noi</h2>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            Vuoi gustare anche tu l'eccellenza dei nostri prodotti?
          </h1>
          <p className="max-w-[600px] mx-auto md:text-xl">
            Contattaci ora e scopri come ordinare i nostri prodotti.
          </p>
          <div className="w-full max-w-sm mx-auto mt-8">
            <Button variant="outline" asChild>
              <Link href="#">Contattaci</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
