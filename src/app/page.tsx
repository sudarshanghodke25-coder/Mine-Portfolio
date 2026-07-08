"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Moon, Sun, ArrowRight, Code, BrainCircuit, Layout, Layers } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

// 3D Background Component
function Scene() {
  const sphereRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, -5]} scale={1.2}>
          <MeshDistortMaterial 
            color="#9D5CFF" 
            attach="material" 
            distort={0.4} 
            speed={2} 
            roughness={0.2} 
            metalness={0.8}
            wireframe={true}
          />
        </Sphere>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <Sphere args={[0.8, 32, 32]} position={[-4, 2, -8]} scale={1}>
          <MeshDistortMaterial 
            color="#22D3EE" 
            attach="material" 
            distort={0.6} 
            speed={3} 
            roughness={0.1} 
            metalness={1}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.2, 32, 32]} position={[4, -2, -6]} scale={1}>
          <MeshDistortMaterial 
            color="#4F7FFF" 
            attach="material" 
            distort={0.3} 
            speed={1.5} 
            roughness={0.3} 
            metalness={0.6}
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const containerRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useGSAP(() => {
    const updateProgress = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      const progressEl = document.getElementById("progress");
      if (progressEl) progressEl.style.width = scrolled + "%";
      
      const navEl = document.getElementById("nav");
      if (navEl) navEl.classList.toggle("scrolled", h.scrollTop > 40);
    };
    window.addEventListener("scroll", updateProgress, { passive: true });

    gsap.from(".hero-anim", {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      delay: 0.3,
      duration: 1.2,
      ease: "power4.out"
    });

    gsap.utils.toArray('.reveal').forEach((elem: any) => {
      gsap.fromTo(elem, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            toggleActions: "play none none reverse" 
          }
        }
      );
    });

    gsap.utils.toArray('.parallax-card').forEach((card: any) => {
      gsap.fromTo(card, 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 40%",
            scrub: 1.5
          }
        }
      );
    });

    return () => window.removeEventListener("scroll", updateProgress);
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative">
      
      {/* 3D CANVAS BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-80" style={{ pointerEvents: 'auto' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Scene />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)] pointer-events-none z-10"></div>
      </div>

      {/* ---------- NAV ---------- */}
      <nav id="nav" className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-[6vw] py-6 transition-all duration-300 bg-transparent">
        <div className="flex items-center gap-3 font-[family-name:var(--font-space-grotesk)] text-xl font-black tracking-tighter">
          <span className="w-3 h-3 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-cyan)]"></span>
          SUDARSHAN
        </div>
        <ul className="hidden md:flex gap-10 list-none">
          <li><a href="#about" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">About</a></li>
          <li><a href="#skills" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Skills</a></li>
          <li><a href="#learning" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Learning</a></li>
          <li><a href="#contact" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Contact</a></li>
        </ul>
        <button onClick={toggleTheme} className="w-12 h-12 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] hover:scale-110 transition-transform text-[var(--text)] backdrop-blur-md">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* ---------- MASSIVE HERO REDESIGN ---------- */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-[6vw] relative z-20 pt-20">
        <div className="max-w-[1000px] flex flex-col items-center">
          <div className="hero-anim font-[family-name:var(--font-jetbrains-mono)] text-sm text-[var(--accent-cyan)] tracking-[0.3em] uppercase flex items-center gap-3 mb-8 bg-[var(--surface)] border border-[var(--border)] px-6 py-2 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)] animate-pulse"></span>
            PORTFOLIO / SOLAPUR, INDIA
          </div>
          
          <h1 className="hero-anim font-[family-name:var(--font-space-grotesk)] text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-tighter mb-8 grad-text drop-shadow-2xl mix-blend-screen">
            SUDARSHAN
            <br />
            GHODKE
          </h1>
          
          <p className="hero-anim font-[family-name:var(--font-jetbrains-mono)] text-[var(--text)] text-lg md:text-2xl font-light mb-12 max-w-2xl bg-[var(--surface)] border border-[var(--border)] px-8 py-4 rounded-3xl backdrop-blur-md">
            Python Developer <span className="text-[var(--accent-purple)] mx-3">/</span> Future AI Engineer
          </p>
          
          <div className="hero-anim flex flex-wrap justify-center gap-6">
            <a href="#skills" className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold px-10 py-5 rounded-full bg-[var(--text)] text-[var(--bg)] flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              View Projects <ArrowRight size={20} />
            </a>
            <a href="#contact" className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold px-10 py-5 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.1)] transition-all backdrop-blur-md text-[var(--text)]">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT BENTO ---------- */}
      <section id="about" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)]">
        <div className="reveal flex items-center justify-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-sm tracking-widest uppercase text-[var(--accent-cyan)] mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--accent-cyan)] to-transparent"></div>
          01 — About
          <div className="w-12 h-[1px] bg-gradient-to-l from-[var(--accent-cyan)] to-transparent"></div>
        </div>
        <h2 className="reveal font-[family-name:var(--font-space-grotesk)] font-black text-5xl md:text-7xl mb-16 text-center tracking-tighter">
          Who Am <span className="grad-text">I?</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass parallax-card lg:col-span-2 p-10 rounded-[2.5rem] border border-[var(--border)] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-blue)] opacity-20 blur-[100px] rounded-full group-hover:bg-[var(--accent-purple)] transition-colors duration-700"></div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold mb-2">S.E.S. Polytechnic</h3>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--accent-cyan)] text-sm tracking-widest uppercase mb-8">Diploma in Computer Technology</p>
            <p className="text-[var(--text-muted)] leading-relaxed text-lg lg:text-xl font-light">
              Hello! I'm Sudarshan Ghodke. For me, programming is more than writing code — it's about transforming ideas into reality. I enjoy experimenting with modern technologies, exploring artificial intelligence, and developing software solutions. Instead of simply following tutorials, I believe in learning by building projects that challenge me to think differently.
            </p>
          </div>
          
          <div className="glass parallax-card p-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-cyan)] text-white flex flex-col items-center justify-center text-center shadow-2xl hover:scale-[1.02] transition-transform duration-500">
            <Code size={64} className="mb-6 drop-shadow-lg" />
            <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-black leading-tight drop-shadow-md">Building<br/>innovative<br/>solutions.</p>
          </div>
          
          <div className="glass parallax-card lg:col-span-3 p-12 rounded-[2.5rem] text-center border border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl">
            <p className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-4xl italic font-light text-[var(--text)] tracking-tight">
              "I don't build projects to prove what I know — I build them to discover what I'm capable of becoming."
            </p>
          </div>
        </div>
      </section>

      {/* ---------- SKILLS BENTO ---------- */}
      <section id="skills" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)]">
        <div className="reveal flex items-center justify-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-sm tracking-widest uppercase text-[var(--accent-cyan)] mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--accent-cyan)] to-transparent"></div>
          02 — Toolkit
          <div className="w-12 h-[1px] bg-gradient-to-l from-[var(--accent-cyan)] to-transparent"></div>
        </div>
        <h2 className="reveal font-[family-name:var(--font-space-grotesk)] font-black text-5xl md:text-7xl mb-16 text-center tracking-tighter">
          Skills &amp; <span className="grad-text">Technologies</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass parallax-card p-12 rounded-[3rem] border border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl">
            <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--text)] text-sm uppercase tracking-[0.3em] mb-12 text-center">Core Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: "0s" }}>
                <i className="devicon-python-plain colored text-7xl mb-4 drop-shadow-xl"></i>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">Python</span>
              </div>
              <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: "0.2s" }}>
                <i className="devicon-java-plain colored text-7xl mb-4 drop-shadow-xl"></i>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">Java</span>
              </div>
              <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: "0.4s" }}>
                <i className="devicon-cplusplus-plain colored text-7xl mb-4 drop-shadow-xl"></i>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">C++</span>
              </div>
              <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: "0.6s" }}>
                <i className="devicon-sqldeveloper-plain colored text-7xl mb-4 drop-shadow-xl"></i>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">SQL</span>
              </div>
            </div>
          </div>
          
          <div className="glass parallax-card p-12 rounded-[3rem] border border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl">
            <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--text)] text-sm uppercase tracking-[0.3em] mb-12 text-center">Tools & Cloud</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: "0.1s" }}>
                <i className="devicon-git-plain colored text-7xl mb-4 drop-shadow-xl"></i>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">Git</span>
              </div>
              <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: "0.3s" }}>
                <i className="devicon-github-original colored theme-icon text-7xl mb-4 drop-shadow-xl"></i>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">GitHub</span>
              </div>
              <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: "0.5s" }}>
                <i className="devicon-figma-plain colored text-7xl mb-4 drop-shadow-xl"></i>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">Figma</span>
              </div>
              <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: "0.7s" }}>
                <i className="devicon-supabase-plain colored text-7xl mb-4 drop-shadow-xl"></i>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">Supabase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- LEARNING ---------- */}
      <section id="learning" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="reveal flex items-center justify-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-sm tracking-widest uppercase text-[var(--accent-cyan)] mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--accent-cyan)] to-transparent"></div>
          03 — In Progress
          <div className="w-12 h-[1px] bg-gradient-to-l from-[var(--accent-cyan)] to-transparent"></div>
        </div>
        <h2 className="reveal font-[family-name:var(--font-space-grotesk)] font-black text-5xl md:text-7xl mb-16 text-center tracking-tighter">
          Currently <span className="grad-text">Exploring</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass parallax-card p-10 rounded-[3rem] border border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl hover:-translate-y-4 transition-transform duration-500 cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-purple)] to-purple-900 flex items-center justify-center mb-8 shadow-lg">
              <BrainCircuit className="text-white" size={32} />
            </div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold mb-4">Artificial Intelligence</h4>
            <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed">Understanding how machines learn, reason, and make decisions.</p>
          </div>
          
          <div className="glass parallax-card p-10 rounded-[3rem] border border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl hover:-translate-y-4 transition-transform duration-500 cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)] to-blue-900 flex items-center justify-center mb-8 shadow-lg">
              <Layout className="text-white" size={32} />
            </div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold mb-4">Modern Web Dev</h4>
            <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed">Building fast, responsive, and thoughtfully engineered interfaces.</p>
          </div>
          
          <div className="glass parallax-card p-10 rounded-[3rem] border border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl hover:-translate-y-4 transition-transform duration-500 cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-blue-900 flex items-center justify-center mb-8 shadow-lg">
              <Layers className="text-white" size={32} />
            </div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold mb-4">UI/UX Design</h4>
            <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed">Designing experiences that feel intuitive, human, and considered.</p>
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)]">
        <h2 className="reveal font-[family-name:var(--font-space-grotesk)] font-black text-6xl md:text-[8rem] text-center tracking-tighter mb-16 grad-text">
          Let's Connect
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <a href="mailto:sudarshanghodke25@gmail.com" className="reveal glass p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.05)] transition-all floating shadow-2xl text-center" style={{ animationDelay: "0s" }}>
            <div className="text-5xl text-[#ea4335]"><i className="fa-solid fa-envelope"></i></div>
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Email</div>
          </a>

          <a href="https://github.com/sudarshanghodke25-coder" target="_blank" rel="noopener noreferrer" className="reveal glass p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.05)] transition-all floating shadow-2xl text-center" style={{ animationDelay: "0.2s" }}>
            <div className="text-5xl theme-icon-text"><i className="fa-brands fa-github"></i></div>
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">GitHub</div>
          </a>

          <a href="https://www.linkedin.com/in/sudarshan-ghodke-a211a2378/" target="_blank" rel="noopener noreferrer" className="reveal glass p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.05)] transition-all floating shadow-2xl text-center" style={{ animationDelay: "0.4s" }}>
            <div className="text-5xl text-[#0A66C2]"><i className="fa-brands fa-linkedin"></i></div>
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">LinkedIn</div>
          </a>

          <a href="https://www.instagram.com/darshan_ghodke_?igsh=dWZhaWlpcmp6eGp5" target="_blank" rel="noopener noreferrer" className="reveal glass p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.05)] transition-all floating shadow-2xl text-center" style={{ animationDelay: "0.6s" }}>
            <div className="text-5xl"><i className="fa-brands fa-instagram" style={{ background: "-webkit-linear-gradient(#f9ce34, #ee2a7b, #6228d7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}></i></div>
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Instagram</div>
          </a>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="relative z-20 text-center py-16 px-[6vw] border-t border-[var(--border)] bg-[var(--bg)]">
        <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-xl mb-3 tracking-tight">Designed &amp; Developed by Sudarshan Ghodke</p>
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--accent-purple)] text-sm tracking-widest uppercase">"Always learning. Always building. Always moving forward."</p>
      </footer>
    </main>
  );
}
