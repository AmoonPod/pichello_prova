import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio - Il Pichello",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
