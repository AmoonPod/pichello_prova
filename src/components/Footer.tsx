import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 py-8 md:py-12">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <p className="text-xs md:text-sm text-gray-600 text-center">
          © Agricola Il Pichello S.r.l. {new Date().getFullYear()} | Disegnato
          da{" "}
          <span className="font-semibold">
            <a
              href="https://www.manueldeceglie.it"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Manuel De Ceglie
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
