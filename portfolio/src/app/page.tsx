"use client";
import { useState, useEffect, useRef } from "react";
import { ParticlesBackground } from "@/components/particles/ParticleBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/Hero";
import About from "@/components/About/About";
import  Projects  from "@/components/projects/Projects";
import  Skills  from "@/components/Skills/Skills";
import  Contact  from "@/components/Contact/Contact";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { useGSAP } from "@/lib/gsap";
import dynamic from "next/dynamic";

export default function Home() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("home");
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  useGSAP(
    () => {
      if (typeof window !== "undefined" && (window as any).gsap) {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        gsap.to(".navbar", {
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          padding: "1rem 2rem",
          backgroundColor: dark
            ? "rgba(15,15,30,0.9)"
            : "rgba(248,249,250,0.9)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        });

        gsap.utils.toArray(".section").forEach((el: any) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          });
        });

        gsap.utils.toArray(".skill-bar-fill").forEach((bar: any) => {
          gsap.from(bar, {
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            width: "0%",
            duration: 1.5,
            ease: "power2.out",
          });
        });
      }
    },
    { dependencies: [dark], scope: containerRef }
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"];
      const scrollY = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActive(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBackgroundGradient = () =>
    dark
      ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]" // deep blue-black gradient
      : "bg-gradient-to-br from-[#e2e8f0] via-[#f8fafc] to-[#cbd5e1]";

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${getBackgroundGradient()} ${
        dark ? "text-white" : "text-gray-900"
      }`}
    >
      {/* FIX: Make particles background transparent and behind all content */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <ParticlesBackground darkMode={dark} />
      </div>

      <Navbar
        darkMode={dark}
        toggleDarkMode={() => setDark((d) => !d)}
        scrollTo={scrollTo}
        activeSection={active}
      />

      <main>
        <section id="home" className="hero">
          <Hero scrollTo={scrollTo} darkMode={dark} />
        </section>

        <Section id="about" className="section bg-white/5 backdrop-blur-sm">
          <About darkMode={dark} />
        </Section>

        <Section id="projects" className="section bg-white/5 backdrop-blur-sm">
          <Projects darkMode={dark} />
        </Section>

        <Section id="skills" className="section bg-white/5 backdrop-blur-sm">
          <Skills darkMode={dark} />
        </Section>

        <Section id="contact" className="section bg-white/5 backdrop-blur-sm">
          <Contact darkMode={dark} />
        </Section>
      </main>

      <Footer scrollTo={scrollTo} darkMode={dark} />
    </div>
  );
}
