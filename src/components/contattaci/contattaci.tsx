import { FacebookIcon, InstagramIcon } from "lucide-react";
import ContactForm from "./form";

export default function Contattaci() {
    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-start mt-8" id="contatti">
            <ContactForm />
            <div className="text-left">
                <h3 className="font-semibold text-xl">
                    Agricola Il Pichello S.r.l.
                </h3>
                <p className="mt-4 text-gray-700">
                    <strong>Indirizzo:</strong> Via Dante Alighieri 141 – 42033
                    Marola, Carpineti (RE)
                </p>
                <a href="tel:3408200080">
                    <p className="mt-2 text-gray-700">
                        <strong>Telefono (Mirco):</strong> 340/8200080
                    </p>
                </a>
                <a href="tel:3397981644">
                    <p className="mt-2 text-gray-700">
                        <strong>Telefono (Viviana):</strong> 339/7981644
                    </p>
                </a>
                <a href="mailto:info@agricolailpichello.it">
                    <p className="mt-2 text-gray-700">
                        <strong>Email:</strong> info@agricolailpichello.it
                    </p>
                </a>
                <p className="mt-4 text-gray-600">
                    Seguici sui nostri social per restare aggiornato!
                </p>
                <div className="flex justify-start space-x-4 mt-4">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-700"
                    >
                        <InstagramIcon size={28} />
                    </a>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <FacebookIcon size={28} />
                    </a>
                </div>
            </div>
        </div>
    )
}