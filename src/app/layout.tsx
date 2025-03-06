import Footer from "@/components/Footer";
import NavbarV2 from "@/components/new/Navbar";
import { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  keywords: ["example", "keywords"],
  title: {
    default: "Il Pichello",
    template: `%s | Example Title`,
  },
  openGraph: {
    description: "Example Description",
    images: [],
  },
};
const bricolageGrotesque = Bricolage_Grotesque({
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${bricolageGrotesque.className} `}>
        <NavbarV2 />
        {children}
        <Footer />
      </body>
    </html>
  );
}
