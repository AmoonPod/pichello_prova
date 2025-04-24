import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Leaf,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const FooterV2 = () => {
  return (
    <footer className="bg-secondary-foreground text-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-playfair font-bold text-white">
                Il Pichello
              </span>
            </div>
            <p className="text-secondary/80 mb-6">
              Azienda agricola biologica che produce e vende prodotti genuini
              dal 1985, rispettando la natura e le tradizioni.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-secondary/80 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-secondary/80 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-secondary/80 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-secondary/80 hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-secondary/80 hover:text-primary transition-colors"
                >
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="text-secondary/80 hover:text-primary transition-colors"
                >
                  I Nostri Prodotti
                </Link>
              </li>
              <li>
                <Link
                  href="#dove-siamo"
                  className="text-secondary/80 hover:text-primary transition-colors"
                >
                  Dove Siamo
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-secondary/80 hover:text-primary transition-colors"
                >
                  Contattaci
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary/80 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary/80 hover:text-primary transition-colors"
                >
                  Termini e Condizioni
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contatti</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
                <span className="text-secondary/80">
                  Via della Campagna, 123
                  <br />
                  53100 Siena (SI)
                  <br />
                  Toscana, Italia
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
                <span className="text-secondary/80">
                  +39 0577 123456
                  <br />
                  +39 333 1234567
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
                <span className="text-secondary/80">
                  info@ilpichello.it
                  <br />
                  ordini@ilpichello.it
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-secondary/80 mb-4">
              Iscriviti alla nostra newsletter per ricevere aggiornamenti sui
              nostri prodotti e offerte speciali.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="La tua email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button>Iscriviti</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-secondary/60">
          <p>
            © {new Date().getFullYear()} Azienda Agricola Il Pichello. Tutti i
            diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;
