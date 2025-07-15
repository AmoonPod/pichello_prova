"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { Metadata } from "next";

// Explicitly prevent indexing of the studio page
export const metadata: Metadata = {
  title: "Studio - Il Pichello",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Studio() {
  return <NextStudio config={config} />;
}
