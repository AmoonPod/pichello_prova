// components/ContactInfo.js
import { Button } from "@/components/ui/button";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

const ContactInfo = () => (
  <div className="flex flex-col justify-center space-y-4">
    <div className="space-y-4">
      <h2 className="text-4xl font-bold tracking-tighter sm:text-[56px] xl:text-6xl/none text-primary">
        Contattaci per ordini e informazioni
      </h2>
      <p className="max-w-[600px] text-muted-foreground md:text-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
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
