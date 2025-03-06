"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LOGO from "../../../public/LOGO.png";
import Image from "next/image";

const NavbarV2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("about")}
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              Chi Siamo
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              Prodotti
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              Dove Siamo
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              Contatti
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full"
            >
              Ordina Ora
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavbarV2;
