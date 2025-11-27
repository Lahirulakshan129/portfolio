"use client";
import { Button } from "./ui/button";
import { useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

interface HeroProps {
  scrollTo: (id: string) => void;
  darkMode: boolean;
}

const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href = "/Lahiru-Lakshan-CV.pdf"; // works when file is in public/
  link.download = "Lahiru-Lakshan-CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const Hero = ({ scrollTo, darkMode }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const socials = [
    {
      platform: "github",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/lahirulakshan129",
    },
    {
      platform: "linkedin",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/lahiru-lakshan-b1b607201",
    },
    {
      platform: "email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:lahirulakshan129@gmail.com",
    },
  ];

  // Dynamic styles
  const getBackgroundGradient = () =>
    darkMode
      ? "bg-gradient-to-br from-black via-slate-900 to-blue-950"
      : "bg-gradient-to-br from-slate-100 via-blue-50 to-white";

  const getTextColor = () => (darkMode ? "text-gray-300" : "text-gray-700");
  const getSecondaryTextColor = () => (darkMode ? "text-gray-400" : "text-gray-600");
  const getParticleColor = () => (darkMode ? "bg-cyan-400" : "bg-purple-500");

  const getSocialIconBg = () =>
    darkMode
      ? "bg-white/5 backdrop-blur-lg border border-white/10"
      : "bg-black/5 backdrop-blur-lg border border-gray-300";

  const getSocialIconHover = () =>
    darkMode
      ? "hover:bg-cyan-500/20 hover:border-cyan-400/30 hover:shadow-cyan-500/25"
      : "hover:bg-purple-500/20 hover:border-purple-400/30 hover:shadow-purple-500/25";

  const getSocialIconText = () =>
    darkMode ? "text-gray-300 group-hover:text-cyan-400" : "text-gray-600 group-hover:text-purple-600";

  const getScrollIndicatorBorder = () =>
    darkMode ? "border-gray-400/50 hover:border-cyan-400/70" : "border-gray-600/50 hover:border-purple-400/70";

  const getScrollIndicatorColor = () =>
    darkMode ? "bg-cyan-400 group-hover:bg-cyan-300" : "bg-purple-500 group-hover:bg-purple-400";

  const getScrollIndicatorGlow = () =>
    darkMode ? "bg-cyan-400/20 group-hover:bg-cyan-400/30" : "bg-purple-500/20 group-hover:bg-purple-500/30";

  const handleScrollToProjects = () => {
    gsap.to(window, {
      duration: 1.8,
      scrollTo: { y: "#projects", offsetY: 70 },
      ease: "power3.inOut",
    });
  };

  // Mouse move parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = heroRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(".parallax-element:not(button)", {
      x: x * 30,
      y: y * 20,
      rotationX: y * 8,
      rotationY: x * 8,
      ease: "power2.out",
      duration: 1,
    });

    gsap.to(".floating-element", {
      x: x * 15,
      y: y * 15,
      ease: "power2.out",
      duration: 2,
    });
  };

  useGSAP(
    () => {
      gsap.set(".hero-element", { opacity: 0, y: 60 });

      const tl = gsap.timeline();

      tl.fromTo(
        ".floating-element",
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 1.5, stagger: 0.2, ease: "back.out(1.7)" }
      )
        .to(
          ".typing",
          {
            text: "Lahiru Lakshan",
            duration: 2,
            ease: "none",
            onUpdate: function () {
              if (Math.random() > 0.7) {
                gsap.to(".cursor", { opacity: 0, duration: 0.1, yoyo: true, repeat: 1 });
              }
            },
          },
          "-=1"
        )
        .to(
          ".hero-element",
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".social-icon",
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.5"
        );

      // Floating animation loop
      gsap.to(".floating-element", {
        y: "+=40",
        rotation: "+=10",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Cursor blink
      gsap.to(".cursor", { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "none" });

      // Particles
      gsap.to(".particle", {
        x: "random(-30, 30)",
        y: "random(-30, 30)",
        rotation: "random(-10, 10)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="home"
      className={`relative overflow-hidden ${getBackgroundGradient()} transition-colors duration-700`}
      onMouseMove={handleMouseMove}
    >
      {/* Full-screen wrapper with proper mobile spacing */}
      <div className="min-h-screen flex flex-col justify-between pt-16 pb-10 sm:pt-20 sm:pb-12 px-4">
        {/* Background Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent"
                : "bg-gradient-to-br from-purple-300/20 via-blue-200/10 to-transparent"
            } animate-pulse`}
          />

          <div ref={floatingElementsRef} className="absolute inset-0">
            <div
              className={`floating-element absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl ${
                darkMode ? "bg-cyan-500/20" : "bg-purple-400/15"
              }`}
            />
            <div
              className={`floating-element absolute top-32 right-8 w-80 h-80 rounded-full blur-3xl ${
                darkMode ? "bg-purple-500/15" : "bg-pink-400/10"
              }`}
            />
            <div
              className={`floating-element absolute bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl ${
                darkMode ? "bg-orange-500/10" : "bg-blue-400/10"
              }`}
            />
          </div>

          <div ref={particlesRef} className="absolute inset-0 opacity-40">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className={`particle absolute w-2 h-2 rounded-full blur-sm ${getParticleColor()}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content - Centered vertically in upper part */}
        <div className="flex-1 flex flex-col justify-center items-center text-center z-10 max-w-5xl mx-auto">
          <h1 ref={headingRef} className="mb-6">
            <span
              className={`block text-2xl sm:text-3xl md:text-4xl font-light mb-3 tracking-wider ${getTextColor()} hero-element`}
            >
              Hi, I&apos;m
            </span>
            <div className="flex items-center justify-center hero-element">
              <span className="typing text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {/* Typed by GSAP */}
              </span>
              <span
                className={`cursor w-1 h-12 ml-2 inline-block align-middle ${
                  darkMode ? "bg-cyan-400" : "bg-purple-500"
                }`}
              />
            </div>
          </h1>

          <p
            className={`text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-10 max-w-2xl hero-element ${getTextColor()}`}
          >
            Crafting digital experiences through{" "}
            <span className={`font-bold ${darkMode ? "text-cyan-400" : "text-purple-600"}`}>code</span> and{" "}
            <span className={`font-bold ${darkMode ? "text-purple-400" : "text-pink-600"}`}>creativity</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 hero-element">
            <Button
              onClick={handleScrollToProjects}
              className={`px-8 py-6 text-lg font-semibold rounded-xl hover:scale-105 transition-all duration-300 group overflow-hidden relative ${
                darkMode
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/30"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-purple-500/30"
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore My Work
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </Button>

            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className={`px-8 py-6 text-lg font-semibold rounded-xl border-2 hover:scale-105 transition-all duration-300 ${
                darkMode
                  ? "border-gray-600 text-white hover:bg-white/10"
                  : "border-gray-400 text-gray-800 hover:bg-black/5"
              }`}
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 hero-element">
            {socials.map(({ platform, icon, url }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-icon group p-4 rounded-2xl transition-all duration-500 hover:scale-125 hover:rotate-12 ${getSocialIconBg()} ${getSocialIconHover()}`}
              >
                <div className={getSocialIconText()}>{icon}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Always visible at bottom */}
        <div className="flex justify-center pb-8 hero-element">
          <div className="flex flex-col items-center gap-4 animate-bounce-slow">
            <p className={`text-sm tracking-widest uppercase font-light ${getSecondaryTextColor()}`}>
              Scroll to explore
            </p>
            <div
              className={`w-7 h-12 border-2 rounded-full flex justify-center relative group cursor-pointer transition-all ${getScrollIndicatorBorder()}`}
              onClick={handleScrollToProjects}
            >
              <div className={`w-1.5 h-4 rounded-full mt-2 ${getScrollIndicatorColor()} animate-bounce`} />
              <div className={`absolute inset-0 rounded-full blur-xl ${getScrollIndicatorGlow()}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};