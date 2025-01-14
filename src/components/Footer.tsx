import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center py-12 border-t border-gray-300">
      <p className="text-sm text-gray-600">
        © Agricola Il Pichello S.r.l. {new Date().getFullYear()} | Disegnato da{" "}
        <span className="font-semibold"><a href="https://www.manueldeceglie.it" target="_blank">Manuel De Ceglie</a></span>
      </p>
    </footer>
  );
};

export default Footer;
