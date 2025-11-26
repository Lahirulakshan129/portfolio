"use client";
import { Button } from "./ui/button";
import { useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";

interface HeroProps {
  scrollTo: (id: string) => void;
  darkMode: boolean;
}

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href = "/path-to-your-cv.pdf";
  link.download = "Your-Name-CV.pdf";
  link.click();
};

export const Hero = ({ scrollTo, darkMode }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  const socials = [
    {
      platform: "github",
      icon: <Github className="w-4 h-4" />,
      url: "https://github.com/lahirulakshan129",
    },
    {
      platform: "linkedin",
      icon: <Linkedin className="w-4 h-4" />,
      url: "https://linkedin.com/in/lahiru-lakshan-b1b607201",
    },
    {
      platform: "email",
      icon: <Mail className="w-4 h-4" />,
      url: "mailto:lahirulakshan129@gmail.com",
    },
  ];

  // Dynamic styles based on dark mode
  const getBackgroundGradient = () => {
    return darkMode
      ? "bg-gradient-to-br from-black via-slate-900 to-blue-950"
      : "bg-gradient-to-br from-slate-100 via-blue-50 to-white";
  };

  const getTextColor = () => {
    return darkMode ? "text-gray-300" : "text-gray-700";
  };

  const getSecondaryTextColor = () => {
    return darkMode ? "text-gray-400" : "text-gray-600";
  };

  const getParticleColor = () => {
    return darkMode ? "bg-cyan-400" : "bg-purple-500";
  };

  const getSocialIconBg = () => {
    return darkMode
      ? "bg-white/5 backdrop-blur-lg border border-white/10"
      : "bg-black/5 backdrop-blur-lg border border-gray-300";
  };

  const getSocialIconHover = () => {
    return darkMode
      ? "hover:bg-cyan-500/20 hover:border-cyan-400/30 hover:shadow-cyan-500/25"
      : "hover:bg-purple-500/20 hover:border-purple-400/30 hover:shadow-purple-500/25";
  };

  const getSocialIconText = () => {
    return darkMode
      ? "text-gray-300 group-hover:text-cyan-400"
      : "text-gray-600 group-hover:text-purple-600";
  };

  const getScrollIndicatorBorder = () => {
    return darkMode
      ? "border-gray-400/50 hover:border-cyan-400/70"
      : "border-gray-600/50 hover:border-purple-400/70";
  };

  const getScrollIndicatorColor = () => {
    return darkMode
      ? "bg-cyan-400 group-hover:bg-cyan-300"
      : "bg-purple-500 group-hover:bg-purple-400";
  };

  const getScrollIndicatorGlow = () => {
    return darkMode
      ? "bg-cyan-400/20 group-hover:bg-cyan-400/30"
      : "bg-purple-500/20 group-hover:bg-purple-500/30";
  };

  useGSAP(
    () => {
      // Set initial state
      gsap.set(".hero-element", {
        opacity: 0,
        y: 60,
      });

      // Main timeline
      const tl = gsap.timeline();

      // Background elements animation
      tl.fromTo(
        ".floating-element",
        { scale: 0, rotation: -45 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }
      );

      // Text typing with enhanced cursor
      tl.to(
        ".typing",
        {
          text: "Lahiru Lakshan",
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: function () {
            if (Math.random() > 0.7) {
              gsap.to(".cursor", {
                opacity: 0,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
              });
            }
          },
        },
        "-=1"
      );

      // Staggered content entrance
      tl.to(
        ".hero-element",
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Social icons special entrance
      tl.fromTo(
        ".social-icon",
        {
          scale: 0,
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );

      // Continuous animations
      gsap.to(".floating-element", {
        y: "+=30",
        rotation: "+=5",
        duration: 4,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut",
      });

      gsap.to(".cursor", {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      // Particle background animation
      gsap.to(".particle", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        rotation: "random(-5, 5)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: "sine.inOut",
      });
    },
    { scope: heroRef }
  );

  // Mouse move parallax effect - EXCLUDE buttons from parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } =
      heroRef.current.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    // Only apply parallax to non-button elements
    gsap.to(".parallax-element:not(button)", {
      x: x * 30,
      y: y * 20,
      rotationX: y * 10,
      rotationY: x * 10,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".floating-element", {
      x: x * 10,
      y: y * 10,
      duration: 2,
      ease: "power2.out",
    });
  };

  const handleScrollToProjects = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: "#projects", offsetY: 50 },
      ease: "power2.inOut",
    });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${getBackgroundGradient()}`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"
            : "bg-gradient-to-br from-blue-200/20 via-transparent to-purple-200/20"
        } animate-pulse`}
      />

      {/* Floating background elements */}
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 overflow-hidden"
      >
        <div
          className={`floating-element absolute top-1/4 left-1/4 w-32 h-32 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full blur-3xl transition-colors duration-500 ${
            darkMode
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
              : "bg-gradient-to-r from-cyan-400/15 to-blue-400/15"
          }`}
        />
        <div
          className={`floating-element absolute top-1/3 right-1/4 w-40 h-40 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full blur-3xl transition-colors duration-500 ${
            darkMode
              ? "bg-gradient-to-r from-purple-500/15 to-pink-500/15"
              : "bg-gradient-to-r from-purple-400/10 to-pink-400/10"
          }`}
        />
        <div
          className={`floating-element absolute bottom-1/4 left-1/3 w-32 h-32 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full blur-3xl transition-colors duration-500 ${
            darkMode
              ? "bg-gradient-to-r from-orange-500/10 to-red-500/10"
              : "bg-gradient-to-r from-orange-400/5 to-red-400/5"
          }`}
        />
      </div>

      {/* Particle background */}
      <div ref={particlesRef} className="absolute inset-0 opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`particle absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full blur-sm transition-colors duration-500 ${getParticleColor()}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content - Centered properly */}
      <div className="hero-content text-center z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 sm:mb-0">
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 opacity-0 hero-element parallax-element"
        >
          <span
            className={`block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-2 sm:mb-3 md:mb-4 transition-colors duration-500 ${getTextColor()}`}
          >
            Hi, I&apos;m
          </span>
          <div className="flex items-center justify-center">
            <span className="typing text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent inline-block">
              {/* Name will be typed by GSAP */}
            </span>
            <span
              className={`cursor w-0.5 h-6 sm:h-8 md:h-10 lg:h-12 ml-1 sm:ml-2 inline-block align-middle animate-pulse transition-colors duration-500 ${
                darkMode ? "bg-cyan-400" : "bg-purple-500"
              }`}
            />
          </div>
        </h1>

        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 opacity-0 hero-element font-light tracking-wide transition-colors duration-500 ${getTextColor()} px-2`}
        >
          Crafting digital experiences through{" "}
          <span
            className={`font-semibold ${
              darkMode ? "text-cyan-400" : "text-cyan-600"
            }`}
          >
            code
          </span>{" "}
          and{" "}
          <span
            className={`font-semibold ${
              darkMode ? "text-purple-400" : "text-purple-600"
            }`}
          >
            creativity
          </span>
        </p>

        {/* Buttons container - centered and without parallax */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center opacity-0 hero-element px-4">
          {/* Explore My Work Button */}
          <Button
            onClick={handleScrollToProjects}
            className={`px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden ${
              darkMode
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/25"
                : "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 hover:shadow-purple-500/25"
            }`}
          >
            <span className="relative z-10 flex items-center">
              Explore My Work
              <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </span>

            {/* Animated overlay but non-interactive */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                darkMode
                  ? "bg-gradient-to-r from-purple-500 to-pink-600"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600"
              }`}
            />
          </Button>

          {/* Download CV Button */}
          <Button
            onClick={handleDownloadCV}
            className={`px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden border ${
              darkMode
                ? "border-gray-600 bg-transparent text-white hover:bg-gray-800 hover:shadow-gray-500/25"
                : "border-gray-300 bg-transparent text-gray-800 hover:bg-gray-50 hover:shadow-gray-500/25"
            }`}
          >
            <span className="relative z-10 flex items-center">
              Download CV
              <Download className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </span>

            {/* Animated overlay but non-interactive */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                darkMode
                  ? "bg-gradient-to-r from-gray-700 to-gray-800"
                  : "bg-gradient-to-r from-gray-100 to-gray-200"
              }`}
            />
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-6 mt-8 sm:mt-12 md:mt-14 opacity-0 hero-element px-4">
          {socials.map(({ platform, icon, url }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon group w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-[360deg] ${getSocialIconBg()} ${getSocialIconHover()}`}
              aria-label={platform}
            >
              <div
                className={`transition-colors duration-300 ${getSocialIconText()}`}
              >
                {icon}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 hero-element">
        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
          <div
            className={`text-xs font-light tracking-wider uppercase transition-colors duration-500 ${getSecondaryTextColor()}`}
          >
            Scroll to explore
          </div>
          <div
            className={`w-5 h-8 sm:w-6 sm:h-10 border-2 rounded-full flex justify-center relative group transition-colors duration-500 ${getScrollIndicatorBorder()}`}
          >
            <div
              className={`w-1 h-2 rounded-full mt-1.5 animate-bounce transition-colors duration-500 ${getScrollIndicatorColor()}`}
            />
            <div
              className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${getScrollIndicatorGlow()}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};