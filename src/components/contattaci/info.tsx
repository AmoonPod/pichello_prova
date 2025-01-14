// components/ContactInfo.js
import { Button } from "@/components/ui/button";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

const ContactInfo = () => (
  <div className="flex flex-col justify-center space-y-4">
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <Link href="mailto:info@agricolailpichello.it">
          <Button variant="ghost" asChild className="w-min">
            <div className="inline-flex space-x-2 items-center">
              <Mail className="h-8 w-8 text-primary" />
              <p className="font-semibold">info@agricolapichello.it</p>
            </div>
          </Button>
        </Link>
        <Link href="tel:3408200080">
          <Button variant="ghost" asChild className="w-min">
            <div className="inline-flex space-x-2 items-center">
              <Phone className="h-8 w-8 text-primary" />
              <p className="font-semibold"> Mirco: 340 8200080</p>
            </div>
          </Button>
        </Link>
        <Link href="tel:3397981644">
          <Button variant="ghost" asChild className="w-min">
            <div className="inline-flex space-x-2 items-center">
              <Phone className="h-8 w-8 text-primary" />
              <p className="font-semibold"> Viviana: 339 7981644</p>
            </div>
          </Button>
        </Link>
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
);

export default ContactInfo;
