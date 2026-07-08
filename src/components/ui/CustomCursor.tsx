"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Detect if it's a touch device; if so, don't show the custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleHover = () => {
      gsap.to(cursor, {
        scale: 3,
        duration: 0.3,
        ease: "power2.out",
        backgroundColor: "transparent",
        border: "1px solid var(--text)"
      });
    };

    const handleLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        backgroundColor: "var(--text)",
        border: "none"
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Add hover listeners to clickable elements
    const links = document.querySelectorAll("a, button, .cursor-pointer, input, textarea");
    links.forEach(link => {
      link.addEventListener("mouseenter", handleHover);
      link.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleHover);
        link.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[var(--text)] pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
    />
  );
}
