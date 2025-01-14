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
      <section className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20">
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
