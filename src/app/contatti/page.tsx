"use client";
import "../../app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contattaci/form";
import { FacebookIcon, InstagramIcon } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-8">
        <div className="container px-4 md:px-6 max-w-7xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d711.536457105119!2d10.482757569662631!3d44.491678654872366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d552e2ba719e27%3A0x22cdb0cf8ee2dcff!2sAzienda%20Agricola%20Il%20Pichello!5e0!3m2!1sit!2sit!4v1736855691728!5m2!1sit!2sit"
            width="100%"
            height="450"
            loading="lazy"
            className="rounded-lg shadow-md"
          ></iframe>
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold">
              Contattaci per ordini e informazioni
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Non vediamo l'ora di sentirti! Siamo disponibili per qualsiasi
              domanda o ordine.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-start mt-8">
            <ContactForm />
            <div className="text-left">
              <h3 className="font-semibold text-xl">
                Agricola Il Pichello S.r.l.
              </h3>
              <p className="mt-4 text-gray-700">
                <strong>Indirizzo:</strong> Via Dante Alighieri 141 – 42033
                Marola, Carpineti (RE)
              </p>
              <a href="tel:3408200080">
                <p className="mt-2 text-gray-700">
                  <strong>Telefono (Mirco):</strong> 340/8200080
                </p>
              </a>
              <a href="tel:3397981644">
                <p className="mt-2 text-gray-700">
                  <strong>Telefono (Viviana):</strong> 339/7981644
                </p>
              </a>
              <a href="mailto:info@agricolailpichello.it">
                <p className="mt-2 text-gray-700">
                  <strong>Email:</strong> info@agricolailpichello.it
                </p>
              </a>
              <p className="mt-4 text-gray-600">
                Seguici sui nostri social per restare aggiornato!
              </p>
              <div className="flex justify-start space-x-4 mt-4">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700"
                >
                  <InstagramIcon size={28} />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FacebookIcon size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
