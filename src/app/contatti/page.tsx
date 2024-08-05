import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import contactImage from "../../../public/images/contattaci.png"; // Assuming you save the uploaded image in the public directory
import { Label } from "@/components/ui/label";
import "../../app/globals.css";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className=" md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <Image
              src={contactImage}
              alt="Contact Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Contattaci per ordini e informazioni
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="flex flex-col space-y-4">
                  <Button variant="ghost" asChild className="w-min">
                    <div className="inline-flex space-x-2 items-center">
                      <Mail className="h-8 w-8 text-primary" />
                      <p className="font-semibold">info@agricolapichello.it</p>
                    </div>
                  </Button>
                  <Button variant="ghost" asChild className="w-min">
                    <div className="inline-flex space-x-2 items-center">
                      <Phone className="h-8 w-8 text-primary" />
                      <p className="font-semibold">3462136256</p>
                    </div>
                  </Button>
                  <Button variant="ghost" asChild className="w-min">
                    <div className="inline-flex space-x-2 items-center">
                      <Phone className="h-8 w-8 text-primary" />
                      <p className="font-semibold">3462136256</p>
                    </div>
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant={"ghost"} className="w-min">
                      <Instagram className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant={"ghost"} className="w-min">
                      <Facebook className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form className="mt-12 grid gap-4">
            <div>
              <Label htmlFor="name">Nome e cognome</Label>
              <Input placeholder="Mario Rossi" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Il tuo numero di telefono</Label>
                <Input placeholder="346..." />
              </div>
              <div>
                <Label htmlFor="email">La tua email</Label>
                <Input placeholder="mariorossi@gmail.com" />
              </div>
            </div>
            <Label htmlFor="message">Messaggio</Label>
            <Textarea
              placeholder="Ciao, sono interessato/a alle vostre..."
              rows={5}
            />
            <Button type="submit" className="mt-4">
              Invia messaggio
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
