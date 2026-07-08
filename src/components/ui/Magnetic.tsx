"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const magneticRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    // Detect if it's a touch device; if so, don't apply magnetic effect
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={magneticRef as any} className="inline-block">{children}</div>;
}
