import type { Metadata } from "next";
import { Noto_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "greek"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "greek"],
});

export const metadata: Metadata = {
  title: "Parliament Matrix",
  description:
    "Σύγκριση θέσεων ελληνικών κομμάτων ανά θέμα — hackathon MVP με δεδομένα υπόδειγμα.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="el"
      className={`${notoSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
