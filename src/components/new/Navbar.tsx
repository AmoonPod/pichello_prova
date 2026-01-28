"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, Package, Wheat, CircleDot, Soup } from "lucide-react"; // using MenuIcon for clarity
import { cn } from "@/lib/utils";
import LOGO from "../../../public/LOGO.png";
import Image from "next/image";

// Import Sheet components and SheetClose
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const NavbarV2 = () => {
  return (
    <header
      className={cn(
        "relative top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        // Apply background, shadow, and slightly reduced padding when scrolled
        "bg-transparent py-4" // Transparent background initially, standard padding
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={LOGO}
            className="w-44 object-cover"
            alt="Logo Azienda Agricola Il Pichello"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link
            href="/#la-nostra-azienda"
            className="text-foreground hover:text-primary transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 transform"
          >
            La Nostra Azienda
          </Link>
          <Link
            href="/prodotti"
            className="text-foreground hover:text-primary transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 transform"
          >
            Prodotti
          </Link>
          <Link
            href="/pasta-artigianale-trafilata-bronzo"
            className="text-foreground hover:text-primary transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 transform flex items-center gap-1"
          >
            <Wheat className="h-4 w-4" />
            Pasta
          </Link>
          <Link
            href="/farina-grani-antichi-macinata-pietra"
            className="text-foreground hover:text-primary transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 transform flex items-center gap-1"
          >
            <CircleDot className="h-4 w-4" />
            Farina
          </Link>
          <Link
            href="/zuppe-legumi-cereali-artigianali"
            className="text-foreground hover:text-primary transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 transform flex items-center gap-1"
          >
            <Soup className="h-4 w-4" />
            Zuppe
          </Link>
          <Link
            href="/catalogo"
            className="text-foreground hover:text-primary transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 transform flex items-center gap-1"
            title="Catalogo commerciale per presentazioni clienti"
          >
            <Package className="h-4 w-4" />
            Catalogo
          </Link>
          <Link
            href="/#dove-siamo"
            className="text-foreground hover:text-primary transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 transform"
          >
            Dove Siamo
          </Link>
          <Link
            href="/contatti"
            className="transform transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Button size="sm">Contattaci</Button>
          </Link>
        </nav>

        {/* Mobile Navigation using Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className={cn("bg-white")}>
                {" "}
                {/* Ensure button is visible */}
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-white p-6">
              {" "}
              {/* Increased width & padding */}
              {/* Add accessible title for screen readers */}
              <SheetTitle className="sr-only">Menu di navigazione</SheetTitle>
              {/* Add Logo at the top */}
              <div className="mb-8 border-b pb-4">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src={LOGO}
                    className="w-36 object-cover"
                    alt="Logo Azienda Agricola Il Pichello"
                  />
                </Link>
              </div>
              {/* Navigation Links */}
              <nav className="grid gap-6">
                {" "}
                {/* Increased gap */}
                {/* Use SheetClose to close panel on click */}
                <SheetClose asChild>
                  <Link
                    href="/#la-nostra-azienda"
                    className="font-medium text-lg hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    La Nostra Azienda
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/prodotti"
                    className="font-medium text-lg hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    Prodotti
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/pasta-artigianale-trafilata-bronzo"
                    className="font-medium text-lg hover:text-primary transition-colors flex items-center gap-2"
                    prefetch={false}
                  >
                    <Wheat className="h-5 w-5" />
                    Pasta
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/farina-grani-antichi-macinata-pietra"
                    className="font-medium text-lg hover:text-primary transition-colors flex items-center gap-2"
                    prefetch={false}
                  >
                    <CircleDot className="h-5 w-5" />
                    Farina 50 Grani
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/zuppe-legumi-cereali-artigianali"
                    className="font-medium text-lg hover:text-primary transition-colors flex items-center gap-2"
                    prefetch={false}
                  >
                    <Soup className="h-5 w-5" />
                    Zuppe e Risotti
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/catalogo"
                    className="font-medium text-lg hover:text-primary transition-colors flex items-center gap-2"
                    prefetch={false}
                  >
                    <Package className="h-5 w-5" />
                    Catalogo
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#dove-siamo"
                    className="font-medium text-lg hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    Dove siamo
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contatti">
                    {/* Use Link wrapping Button for consistency */}
                    <Button className="w-full">Contattaci</Button>
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarV2;
