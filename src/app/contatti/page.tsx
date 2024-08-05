"use client";
import Image from "next/image";
import contactImage from "../../../public/images/contattaci.png";
import "../../app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactInfo from "@/components/contattaci/info";
import ContactForm from "@/components/contattaci/form";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className="md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <Image
              src={contactImage}
              alt="Contact Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
            <ContactInfo />
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
