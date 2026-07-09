"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function LiquidBackground() {
  const cursorOrbRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursorOrb = cursorOrbRef.current;
    if (!cursorOrb) return;

    // Detect if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const xTo = gsap.quickTo(cursorOrb, "x", { duration: 2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorOrb, "y", { duration: 2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the orb's size to center it on the cursor
      xTo(e.clientX - 300);
      yTo(e.clientY - 300);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[var(--bg)]">
      {/* Massive blurred background orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[var(--accent-purple)] opacity-60 blur-[100px] floating" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[var(--accent-cyan)] opacity-50 blur-[120px] floating" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[var(--accent-blue)] opacity-50 blur-[110px] floating" style={{ animationDuration: '18s', animationDelay: '5s' }}></div>
      
      {/* Mouse tracking orb */}
      <div 
        ref={cursorOrbRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] opacity-40 blur-[80px] hidden md:block"
        style={{ willChange: "transform" }}
      ></div>
      
      {/* Dark overlay to ensure contrast for text */}
      <div className="absolute inset-0 bg-[var(--bg)] opacity-30 mix-blend-multiply"></div>
    </div>
  );
}
