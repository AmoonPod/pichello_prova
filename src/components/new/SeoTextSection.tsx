import React from "react";
import Link from "next/link";

export default function SeoTextSection() {
  return (
    <section className="bg-white py-12 border-t border-stone-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-xl font-bold text-stone-800 mb-4">
          Vendita Farine di Grani Antichi e Prodotti Artigianali - Spedizioni in tutta Italia
        </h2>
        <div className="text-sm text-stone-600 space-y-4 leading-relaxed">
          <p>
            L'<strong>Azienda Agricola Il Pichello</strong> è il punto di riferimento per chi cerca prodotti genuini e naturali,
            coltivati con <strong>metodo biorazionale</strong> (un'agricoltura sostenibile senza pesticidi né additivi chimici) nell'incontaminato Appennino Reggiano. Dal nostro laboratorio di Marola (RE),
            portiamo sulla tua tavola sapori autentici: dalla <Link href="/pasta-artigianale-trafilata-bronzo" className="text-primary hover:underline">pasta artigianale trafilata al bronzo</Link>
            {" "}alla pregiata <Link href="/farina-grani-antichi-macinata-pietra" className="text-primary hover:underline">farina di 50 grani antichi macinata a pietra</Link>.
          </p>
          <p>
            Non solo cereali: la nostra offerta include <Link href="/zuppe-legumi-cereali-artigianali" className="text-primary hover:underline">zuppe di legumi pronte da cuocere</Link>,
            miele artigianale italiano, conserve e trasformati naturali. Siamo orgogliosi di preservare la biodiversità locale,
            coltivando varietà antiche dimenticate dalla grande distribuzione, senza residui chimici.
          </p>
          <p>
            Effettuiamo <strong>vendita diretta dal produttore</strong> presso i mercati di Campagna Amica a Reggio Emilia e provincia,
            e <strong>spediamo in tutta Italia</strong> tramite il nostro shop online. Se cerchi prodotti tipici genuini come farina macinata a pietra, pasta artigianale, zuppe o miele italiano,
            Il Pichello è la garanzia di qualità e trasparenza dal campo alla tavola.
          </p>
        </div>
      </div>
    </section>
  );
}
