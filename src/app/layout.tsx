import type { Metadata } from "next";
import { Anton, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kunal Bansal — Film Director",
  description:
    "Kunal Bansal is a filmmaker with 10+ years of experience and 150 million+ views collectively across advertisements, fiction, corporate videos and documentaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${anton.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
