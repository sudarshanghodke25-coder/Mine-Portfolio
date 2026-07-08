"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Moon, Sun, ArrowRight, Code, BrainCircuit, Layout, Layers, ExternalLink } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import Magnetic from "@/components/ui/Magnetic";
import SplitText from "@/components/ui/SplitText";

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

const SkillTooltip = ({ icon, name, delay }: { icon: string, name: string, delay: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="floating flex flex-col items-center hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: delay }}>
        <i className={`${icon} colored text-7xl mb-4 drop-shadow-xl`}></i>
      </div>
    </TooltipTrigger>
    <TooltipContent className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)] px-4 py-2 font-bold font-[family-name:var(--font-space-grotesk)] text-lg">
      <p>{name}</p>
    </TooltipContent>
  </Tooltip>
);

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

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

    // Infinite Marquee
    if (marqueeRef.current) {
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });
    }

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
        <Magnetic>
          <div className="flex items-center gap-3 font-[family-name:var(--font-syne)] text-3xl font-black tracking-tighter cursor-pointer">
            <span className="w-3 h-3 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-cyan)]"></span>
            SG
          </div>
        </Magnetic>
        <ul className="hidden md:flex gap-10 list-none">
          <li><Magnetic><a href="#about" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors inline-block px-2 py-1">About</a></Magnetic></li>
          <li><Magnetic><a href="#skills" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors inline-block px-2 py-1">Skills</a></Magnetic></li>
          <li><Magnetic><a href="#projects" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors inline-block px-2 py-1">Projects</a></Magnetic></li>
          <li><Magnetic><a href="#learning" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors inline-block px-2 py-1">Learning</a></Magnetic></li>
          <li><Magnetic><a href="#contact" className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors inline-block px-2 py-1">Contact</a></Magnetic></li>
        </ul>
        <Magnetic>
          <button onClick={toggleTheme} className="w-12 h-12 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] hover:scale-110 transition-transform text-[var(--text)] backdrop-blur-md">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </Magnetic>
      </nav>

      {/* ---------- MASSIVE HERO REDESIGN ---------- */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-[6vw] relative z-20 pt-20">
        <div className="max-w-[1200px] flex flex-col items-center">
          <div className="hero-anim font-[family-name:var(--font-jetbrains-mono)] text-sm text-[var(--accent-cyan)] tracking-[0.3em] uppercase flex items-center gap-3 mb-8 bg-[var(--surface)] border border-[var(--border)] px-6 py-2 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)] animate-pulse"></span>
            CREATIVE PORTFOLIO
          </div>
          
          <h1 className="font-[family-name:var(--font-syne)] text-5xl md:text-7xl lg:text-[7rem] font-black leading-tight tracking-tighter mb-6 drop-shadow-2xl text-center w-full">
            <SplitText text="SUDARSHAN GHODKE" delay={0.2} animateOnLoad={true} spanClassName="grad-text" />
          </h1>
          
          <p className="hero-anim font-[family-name:var(--font-jetbrains-mono)] text-[var(--text)] text-lg md:text-xl font-light mb-12 max-w-2xl bg-[var(--surface)] border border-[var(--border)] px-8 py-4 rounded-3xl backdrop-blur-md text-center">
            Python Developer <span className="text-[var(--accent-purple)] mx-3">/</span> Creative Coding
          </p>
          
          <div className="hero-anim flex flex-wrap justify-center gap-6">
            <Magnetic>
              <Button asChild size="lg" className="rounded-full px-10 py-8 text-lg font-bold font-[family-name:var(--font-syne)] hover:scale-105 transition-transform bg-[var(--text)] text-[var(--bg)] cursor-pointer">
                <a href="#projects" className="flex items-center gap-2 justify-center">
                  View Projects <ArrowRight size={20} />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 py-8 text-lg font-bold font-[family-name:var(--font-syne)] border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-cyan)] backdrop-blur-md hover:bg-cyan-500/10 text-[var(--text)] cursor-pointer">
                <a href="#contact" className="flex items-center justify-center">
                  Contact Me
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <div className="overflow-hidden whitespace-nowrap bg-[var(--accent-cyan)] text-[var(--bg)] py-4 font-[family-name:var(--font-syne)] text-4xl font-black uppercase tracking-widest relative z-20" ref={marqueeRef}>
        <div className="marquee-inner inline-block">
          <span className="mx-8">PYTHON DEVELOPER</span> • <span className="mx-8">CREATIVE CODING</span> • <span className="mx-8">PYTHON DEVELOPER</span> • <span className="mx-8">CREATIVE CODING</span> • <span className="mx-8">PYTHON DEVELOPER</span> • <span className="mx-8">CREATIVE CODING</span> • 
        </div>
      </div>

      {/* ---------- ABOUT BENTO ---------- */}
      <section id="about" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)]">
        <div className="reveal flex items-center justify-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-sm tracking-widest uppercase text-[var(--accent-cyan)] mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--accent-cyan)] to-transparent"></div>
          01 — About
          <div className="w-12 h-[1px] bg-gradient-to-l from-[var(--accent-cyan)] to-transparent"></div>
        </div>
        <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl lg:text-6xl mb-16 text-center tracking-tighter drop-shadow-lg">
          <SplitText text="Who Am I?" />
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="glass parallax-card lg:col-span-2 rounded-[2.5rem] border-[var(--border)] shadow-2xl relative overflow-hidden group bg-transparent">
            <CardContent className="p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-blue)] opacity-20 blur-[100px] rounded-full group-hover:bg-[var(--accent-purple)] transition-colors duration-700"></div>
              <h3 className="font-[family-name:var(--font-syne)] text-5xl font-bold mb-2 text-[var(--text)] tracking-tight">S.E.S. Polytechnic</h3>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--accent-cyan)] text-sm tracking-widest uppercase mb-8">Diploma in Computer Technology</p>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg lg:text-xl font-light">
                Hello! I'm Sudarshan Ghodke. For me, programming is more than writing code — it's about transforming ideas into reality. I enjoy experimenting with modern technologies, exploring artificial intelligence, and developing software solutions. Instead of simply following tutorials, I believe in learning by building projects that challenge me to think differently.
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass parallax-card rounded-[2.5rem] bg-gradient-to-br from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-cyan)] text-white border-0 shadow-2xl hover:scale-[1.02] transition-transform duration-500">
            <CardContent className="p-10 flex flex-col items-center justify-center text-center h-full">
              <Code size={64} className="mb-6 drop-shadow-lg" />
              <p className="font-[family-name:var(--font-syne)] text-4xl font-black leading-none drop-shadow-md">Building<br/>innovative<br/>solutions.</p>
            </CardContent>
          </Card>
          
          <Card className="glass parallax-card lg:col-span-3 rounded-[2.5rem] text-center border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl">
            <CardContent className="p-12">
              <p className="font-[family-name:var(--font-syne)] text-3xl md:text-5xl font-light text-[var(--text)] tracking-tight">
                "I don't build projects to prove what I know — I build them to discover what I'm capable of becoming."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---------- SKILLS BENTO ---------- */}
      <section id="skills" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)]">
        <div className="reveal flex items-center justify-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-sm tracking-widest uppercase text-[var(--accent-cyan)] mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--accent-cyan)] to-transparent"></div>
          02 — Toolkit
          <div className="w-12 h-[1px] bg-gradient-to-l from-[var(--accent-cyan)] to-transparent"></div>
        </div>
        <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl lg:text-6xl mb-16 text-center tracking-tighter drop-shadow-lg">
          <SplitText text="Skills & Technologies" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass parallax-card rounded-[3rem] border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl">
            <CardContent className="p-12">
              <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--text)] text-sm uppercase tracking-[0.3em] mb-12 text-center">Core Languages</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                <Magnetic><SkillTooltip icon="devicon-python-plain" name="Python" delay="0s" /></Magnetic>
                <Magnetic><SkillTooltip icon="devicon-java-plain" name="Java" delay="0.2s" /></Magnetic>
                <Magnetic><SkillTooltip icon="devicon-cplusplus-plain" name="C++" delay="0.4s" /></Magnetic>
                <Magnetic><SkillTooltip icon="devicon-sqldeveloper-plain" name="SQL" delay="0.6s" /></Magnetic>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass parallax-card rounded-[3rem] border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl">
            <CardContent className="p-12">
              <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--text)] text-sm uppercase tracking-[0.3em] mb-12 text-center">Tools & Cloud</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                <Magnetic><SkillTooltip icon="devicon-git-plain" name="Git" delay="0.1s" /></Magnetic>
                <Magnetic><SkillTooltip icon="devicon-github-original" name="GitHub" delay="0.3s" /></Magnetic>
                <Magnetic><SkillTooltip icon="devicon-figma-plain" name="Figma" delay="0.5s" /></Magnetic>
                <Magnetic><SkillTooltip icon="devicon-supabase-plain" name="Supabase" delay="0.7s" /></Magnetic>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---------- PROJECTS BENTO ---------- */}
      <section id="projects" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="reveal flex items-center justify-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-sm tracking-widest uppercase text-[var(--accent-cyan)] mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--accent-cyan)] to-transparent"></div>
          03 — Showcase
          <div className="w-12 h-[1px] bg-gradient-to-l from-[var(--accent-cyan)] to-transparent"></div>
        </div>
        <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl lg:text-6xl mb-16 text-center tracking-tighter">
          <SplitText text="Featured Projects" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Aadyin Pharma */}
          <Card className="glass parallax-card p-0 overflow-hidden rounded-[2.5rem] border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl group cursor-pointer">
            <div className="h-[300px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent z-10"></div>
              <img 
                src="https://image.thum.io/get/width/1200/crop/800/https://aadyin-pharma.vercel.app/" 
                alt="AADYIN-PHARMA Screenshot" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <CardContent className="p-10 relative z-20">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-[var(--text)] tracking-tight">AADYIN-PHARMA</h3>
                <div className="flex gap-3 text-[var(--text-muted)]">
                  <Magnetic>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="https://github.com/sudarshanghodke25-coder/AADYIN-PHARMA" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-cyan)] transition-colors"><i className="devicon-github-original text-2xl"></i></a>
                      </TooltipTrigger>
                      <TooltipContent>View Code</TooltipContent>
                    </Tooltip>
                  </Magnetic>
                  <Magnetic>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="https://aadyin-pharma.vercel.app" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-cyan)] transition-colors"><ExternalLink size={24} /></a>
                      </TooltipTrigger>
                      <TooltipContent>View Live Site</TooltipContent>
                    </Tooltip>
                  </Magnetic>
                </div>
              </div>
              <p className="text-[var(--text-muted)] text-lg mb-6">"FUEL YOUR STRENGTH. POWER YOUR LIFE." A complete web interface designed and built for a pharmaceutical and fitness brand.</p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-4 py-1.5 rounded-full border border-[var(--border)] text-xs font-[family-name:var(--font-jetbrains-mono)]">HTML</span>
                <span className="px-4 py-1.5 rounded-full border border-[var(--border)] text-xs font-[family-name:var(--font-jetbrains-mono)]">CSS</span>
                <span className="px-4 py-1.5 rounded-full border border-[var(--border)] text-xs font-[family-name:var(--font-jetbrains-mono)]">JavaScript</span>
              </div>
            </CardContent>
          </Card>

          {/* Intelligent Work Space */}
          <Card className="glass parallax-card p-0 overflow-hidden rounded-[2.5rem] border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl group cursor-pointer">
            <div className="h-[300px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
                alt="Intelligent Workspace Placeholder" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <CardContent className="p-10 relative z-20">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-[family-name:var(--font-syne)] text-4xl font-bold leading-tight text-[var(--text)] tracking-tight">Intelligent Workspace</h3>
                <div className="flex gap-3 text-[var(--text-muted)]">
                  <Magnetic>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="https://github.com/sudarshanghodke25-coder/Intelligent-Work-Space-for-Smart-Productivity" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-cyan)] transition-colors"><i className="devicon-github-original text-2xl"></i></a>
                      </TooltipTrigger>
                      <TooltipContent>View Code</TooltipContent>
                    </Tooltip>
                  </Magnetic>
                </div>
              </div>
              <p className="text-[var(--text-muted)] text-lg mb-6">Aurex - An intelligent workspace designed for smart productivity and efficiency tracking, built entirely with Python.</p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-4 py-1.5 rounded-full border border-[var(--border)] text-xs font-[family-name:var(--font-jetbrains-mono)] text-[var(--accent-cyan)] border-[var(--accent-cyan)]">Python</span>
                <span className="px-4 py-1.5 rounded-full border border-[var(--border)] text-xs font-[family-name:var(--font-jetbrains-mono)]">Productivity</span>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* ---------- LEARNING ---------- */}
      <section id="learning" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)] border-t border-[var(--border)] border-b">
        <div className="reveal flex items-center justify-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-sm tracking-widest uppercase text-[var(--accent-cyan)] mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--accent-cyan)] to-transparent"></div>
          04 — In Progress
          <div className="w-12 h-[1px] bg-gradient-to-l from-[var(--accent-cyan)] to-transparent"></div>
        </div>
        <h2 className="font-[family-name:var(--font-syne)] font-black text-4xl md:text-5xl lg:text-6xl mb-16 text-center tracking-tighter">
          <SplitText text="Currently Exploring" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass parallax-card rounded-[3rem] border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl hover:-translate-y-4 transition-transform duration-500 cursor-default">
            <CardContent className="p-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-purple)] to-purple-900 flex items-center justify-center mb-8 shadow-lg">
                <BrainCircuit className="text-white" size={32} />
              </div>
              <h4 className="font-[family-name:var(--font-syne)] text-4xl font-bold mb-4 text-[var(--text)] tracking-tight">Artificial Intelligence</h4>
              <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed">Understanding how machines learn, reason, and make decisions.</p>
            </CardContent>
          </Card>
          
          <Card className="glass parallax-card rounded-[3rem] border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl hover:-translate-y-4 transition-transform duration-500 cursor-default">
            <CardContent className="p-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)] to-blue-900 flex items-center justify-center mb-8 shadow-lg">
                <Layout className="text-white" size={32} />
              </div>
              <h4 className="font-[family-name:var(--font-syne)] text-4xl font-bold mb-4 text-[var(--text)] tracking-tight">Modern Web Dev</h4>
              <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed">Building fast, responsive, and thoughtfully engineered interfaces.</p>
            </CardContent>
          </Card>
          
          <Card className="glass parallax-card rounded-[3rem] border-[var(--border)] shadow-2xl bg-[var(--surface)] backdrop-blur-xl hover:-translate-y-4 transition-transform duration-500 cursor-default">
            <CardContent className="p-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-blue-900 flex items-center justify-center mb-8 shadow-lg">
                <Layers className="text-white" size={32} />
              </div>
              <h4 className="font-[family-name:var(--font-syne)] text-4xl font-bold mb-4 text-[var(--text)] tracking-tight">UI/UX Design</h4>
              <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed">Designing experiences that feel intuitive, human, and considered.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="section relative z-20 px-[6vw] py-32 max-w-[1400px] mx-auto bg-[var(--bg)]">
        <h2 className="font-[family-name:var(--font-syne)] font-black text-5xl md:text-6xl lg:text-7xl text-center tracking-tighter mb-16 drop-shadow-lg">
          <SplitText text="Let's Connect" spanClassName="grad-text" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Magnetic>
            <Button asChild variant="outline" className="reveal glass h-auto p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.05)] transition-all floating shadow-2xl text-center bg-transparent border-0 border-transparent shadow-none" style={{ animationDelay: "0s" }}>
              <a href="mailto:sudarshanghodke25@gmail.com">
                <div className="text-5xl text-[#ea4335]"><i className="fa-solid fa-envelope"></i></div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mt-4">Email</div>
              </a>
            </Button>
          </Magnetic>

          <Magnetic>
            <Button asChild variant="outline" className="reveal glass h-auto p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.05)] transition-all floating shadow-2xl text-center bg-transparent border-0 border-transparent shadow-none" style={{ animationDelay: "0.2s" }}>
              <a href="https://github.com/sudarshanghodke25-coder" target="_blank" rel="noopener noreferrer">
                <div className="text-5xl theme-icon-text"><i className="fa-brands fa-github"></i></div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mt-4">GitHub</div>
              </a>
            </Button>
          </Magnetic>

          <Magnetic>
            <Button asChild variant="outline" className="reveal glass h-auto p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.05)] transition-all floating shadow-2xl text-center bg-transparent border-0 border-transparent shadow-none" style={{ animationDelay: "0.4s" }}>
              <a href="https://www.linkedin.com/in/sudarshan-ghodke-a211a2378/" target="_blank" rel="noopener noreferrer">
                <div className="text-5xl text-[#0A66C2]"><i className="fa-brands fa-linkedin"></i></div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mt-4">LinkedIn</div>
              </a>
            </Button>
          </Magnetic>

          <Magnetic>
            <Button asChild variant="outline" className="reveal glass h-auto p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[var(--accent-cyan)] hover:bg-[rgba(34,211,238,0.05)] transition-all floating shadow-2xl text-center bg-transparent border-0 border-transparent shadow-none" style={{ animationDelay: "0.6s" }}>
              <a href="https://www.instagram.com/darshan_ghodke_?igsh=dWZhaWlpcmp6eGp5" target="_blank" rel="noopener noreferrer">
                <div className="text-5xl"><i className="fa-brands fa-instagram" style={{ background: "-webkit-linear-gradient(#f9ce34, #ee2a7b, #6228d7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}></i></div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mt-4">Instagram</div>
              </a>
            </Button>
          </Magnetic>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="relative z-20 text-center py-16 px-[6vw] border-t border-[var(--border)] bg-[var(--bg)]">
        <p className="font-[family-name:var(--font-syne)] font-bold text-2xl mb-3 tracking-tight">Designed &amp; Developed by Sudarshan Ghodke</p>
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--accent-purple)] text-sm tracking-widest uppercase">"Always learning. Always building. Always moving forward."</p>
      </footer>
    </main>
  );
}
