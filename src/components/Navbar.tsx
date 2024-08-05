"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import LOGO from "../../public/LOGO.png";
import Image from "next/image";
import "../app/globals.css";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-background h-20 flex items-center text-primary">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <Image src={LOGO} className="w-24 object-cover" alt="logo" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden lg:hidden"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[200px] bg-background p-4">
              <nav className="grid gap-4">
                <Link
                  href="#"
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  Chi siamo
                </Link>
                <Link
                  href="#"
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  Prodotti
                </Link>
                <Button variant="default"> Contattaci </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex lg:flex gap-4">
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Chi siamo
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Prodotti
            </Link>
          </nav>
          <div className="lg:flex md:flex hidden">
            <Link href="/contatti">
              <Button variant="secondary">Contattaci</Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
