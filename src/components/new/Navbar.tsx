"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react"; // using MenuIcon for clarity
import { cn } from "@/lib/utils";
import LOGO from "../../../public/LOGO.png";
import Image from "next/image";

// Import Sheet components and SheetClose
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

const NavbarV2 = () => {
  return (
    <header
      className={cn(
        "w-full transition-all duration-300",
        // Fixed only on desktop (md and up)
        "relative md:top-0 md:left-0 md:right-0",
        "bg-white py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src={LOGO} className="w-44 object-cover" alt="logo" />
        </Link>

        {/* Desktop Navigation - Update to use Links for sections */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {" "}
          {/* Increased spacing */}
          <Link
            href="/#about"
            className="text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Chi Siamo
          </Link>
          <Link
            href="/prodotti"
            className="text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Prodotti
          </Link>
          <Link
            href="/#location"
            className="text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Dove Siamo
          </Link>
          <Link href="/#contact">
            <Button size="sm">Contattaci</Button>{" "}
            {/* Use Link wrapping Button */}
          </Link>
        </nav>

        {/* Mobile Navigation using Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-white p-6">
              {" "}
              {/* Increased width & padding */}
              {/* Add Logo at the top */}
              <div className="mb-8 border-b pb-4">
                <Link href="/" className="flex items-center gap-2">
                  <Image src={LOGO} className="w-36 object-cover" alt="logo" />
                </Link>
              </div>
              {/* Navigation Links */}
              <nav className="grid gap-6">
                {" "}
                {/* Increased gap */}
                {/* Use SheetClose to close panel on click */}
                <SheetClose asChild>
                  <Link
                    href="/#about"
                    className="font-medium text-lg hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    Chi siamo
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
                    href="/#location"
                    className="font-medium text-lg hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    Dove siamo
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#contact">
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
