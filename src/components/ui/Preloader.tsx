"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    // Disable scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        document.body.style.overflow = "auto";
        // Ensure scroll triggers are refreshed after layout changes
        setTimeout(() => {
          if (window.ScrollTrigger) {
            window.ScrollTrigger.refresh();
          }
        }, 100);
      }
    });

    // Animate the words sequence
    const wordElements = textRef.current.children;
    
    tl.to(wordElements[0], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(wordElements[0], { opacity: 0, y: -20, duration: 0.4, delay: 0.3, ease: "power2.in" })
      
      .to(wordElements[1], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(wordElements[1], { opacity: 0, y: -20, duration: 0.4, delay: 0.3, ease: "power2.in" })
      
      .to(wordElements[2], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(wordElements[2], { opacity: 0, y: -30, duration: 0.5, delay: 0.4, ease: "power3.in" })
      
      // Slide the entire container up aggressively
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
      });

  }, { scope: containerRef });

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--bg)] text-[var(--text)]"
    >
      <div ref={textRef} className="relative flex items-center justify-center font-[family-name:var(--font-syne)] font-black tracking-tighter text-center px-4 w-full">
        <div className="absolute opacity-0 translate-y-10 grad-text w-full text-3xl md:text-5xl lg:text-7xl">Crafting digital experiences.</div>
        <div className="absolute opacity-0 translate-y-10 grad-text w-full text-3xl md:text-5xl lg:text-7xl">Where logic meets creativity.</div>
        <div className="absolute opacity-0 translate-y-10 grad-text w-full text-5xl md:text-7xl lg:text-8xl">Sudarshan Ghodke</div>
      </div>
    </div>
  );
}
