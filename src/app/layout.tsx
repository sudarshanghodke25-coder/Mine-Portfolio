import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudarshan Ghodke — Developer Portfolio",
  description: "Sudarshan Ghodke — Computer Technology Student, Python Developer, Future AI Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="mesh-bg">
          <div className="mesh-blob b1"></div>
          <div className="mesh-blob b2"></div>
          <div className="mesh-blob b3"></div>
        </div>
        <div id="progress" className="fixed top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-cyan)] z-[1000] transition-all duration-75"></div>
        {children}
      </body>
    </html>
  );
}
