"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateOnLoad?: boolean;
}

export default function SplitText({ text, className = "", delay = 0, animateOnLoad = false }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Animate each word
    const words = containerRef.current.querySelectorAll(".split-word");
    
    const animConfig: any = {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      delay: delay,
      ease: "power4.out"
    };

    if (!animateOnLoad) {
      animConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      };
    }

    gsap.fromTo(words, 
      { y: 50, opacity: 0 },
      animConfig
    );
  }, { scope: containerRef, dependencies: [delay, text, animateOnLoad] });

  return (
    <div ref={containerRef} className={`${className} flex flex-wrap overflow-hidden`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block mr-[0.25em]">
          {word}
        </span>
      ))}
    </div>
  );
}
