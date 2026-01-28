import FooterV2 from "@/components/new/Footer";
import { getProdotti, getCategorie } from "../../sanity/sanity.query";
import NotFoundClient from "@/components/new/NotFoundClient";
import "@/app/globals.css";

export default async function NotFound() {
  // Fetch data for the footer
  const [prodotti, categorie] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  return (
    <>
      <NotFoundClient />
      <FooterV2 prodotti={prodotti} categorie={categorie} />
    </>
  );
}
