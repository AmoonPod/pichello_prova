"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react"; // using MenuIcon for clarity
import { cn } from "@/lib/utils";
import LOGO from "../../../public/LOGO.png";
import Image from "next/image";

// Import Sheet components from your UI library
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const NavbarV2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={cn(
        "w-full transition-all duration-300",
        // Fixed only on desktop (md and up)
        "sticky md:top-0 md:left-0 md:right-0",
        "bg-white py-4",
        isScrolled ? "bg-white/90 backdrop-blur-sm z-50 shadow-md" : ""
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src={LOGO} className="w-44 object-cover" alt="logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-foreground hover:text-primary transition-colors"
          >
            Chi Siamo
          </button>
          <Link href="/prodotti">
            <button className="text-foreground hover:text-primary transition-colors">
              Prodotti
            </button>
          </Link>
          <button
            onClick={() => scrollToSection("location")}
            className="text-foreground hover:text-primary transition-colors"
          >
            Dove Siamo
          </button>
          <Button onClick={() => scrollToSection("contact")}>Contattaci</Button>
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
            <SheetContent side="right" className="w-[200px] bg-white p-4">
              <nav className="grid gap-4">
                <Link
                  href="#"
                  onClick={() => scrollToSection("about")}
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  Chi siamo
                </Link>
                <Link
                  href="/prodotti"
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  Prodotti
                </Link>
                <Link
                  href="#"
                  onClick={() => scrollToSection("location")}
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  Dove siamo
                </Link>
                <Button onClick={() => scrollToSection("contact")}>
                  Contattaci
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarV2;
