import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Geist, Syne } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

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
    <html lang="en" data-theme="dark" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body className={`${geist.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable} antialiased font-[family-name:var(--font-sans)] bg-[var(--bg)] text-[var(--text)] overflow-x-hidden selection:bg-[var(--accent-cyan)] selection:text-[var(--bg)]`}>
        <div className="mesh-bg">
          <div className="mesh-blob b1"></div>
          <div className="mesh-blob b2"></div>
          <div className="mesh-blob b3"></div>
        </div>
        <div id="progress" className="fixed top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-cyan)] z-[1000] transition-all duration-75"></div>
        <SmoothScroll>
          <TooltipProvider>{children}</TooltipProvider>
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
