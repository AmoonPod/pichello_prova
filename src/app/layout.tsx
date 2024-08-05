import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  keywords: ["example", "keywords"],
  title: {
    default: "Example Title",
    template: `%s | Example Title`,
  },
  openGraph: {
    description: "Example Description",
    images: [],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
