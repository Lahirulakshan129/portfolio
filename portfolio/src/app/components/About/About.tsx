"use client";
import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  Briefcase,
  Trophy,
  MapPin,
  ExternalLink,
  User,
  Award,
  Calendar,
  Mail,
  Github,
  Linkedin,
  LucideIcon,
  Code2, Layers, Cpu, Database, GitBranch
} from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// TypeScript Interfaces
interface Link {
  label: string;
  url: string;
}

interface Skill {
  name: string;
  icon: LucideIcon;
}

interface Experience {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  icon: LucideIcon;
  links?: Link[];
}

interface BadgeProps {
  children: React.ReactNode;
  icon: LucideIcon;
  delay?: number;
  darkMode?: boolean;
}

interface CardProps {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  icon: LucideIcon;
  links?: Link[];
  delay?: number;
  darkMode?: boolean;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  color: string;
}

interface AboutProps {
  darkMode?: boolean;
}

// Badge Component
const Badge: React.FC<BadgeProps> = ({
  children,
  icon: Icon,
  delay = 0,
  darkMode = false,
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: delay,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: badgeRef }
  );

  return (
    <div
      ref={badgeRef}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:to-purple-700 cursor-pointer transform-gpu"
    >
      {Icon && <Icon size={12} />}
      <span className="text-xs font-medium">{children}</span>
    </div>
  );
};

// Card Component
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  period,
  description,
  icon: Icon,
  links,
  delay = 0,
  darkMode = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className={`group p-4 rounded-lg shadow-lg border transition-all duration-500 hover:shadow-xl hover:scale-[1.02] transform-gpu ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-blue-600"
          : "bg-white border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              darkMode
                ? "bg-blue-900 text-blue-400"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {Icon && <Icon size={14} />}
          </div>
          <div>
            <h3
              className={`text-sm font-semibold transition-colors group-hover:text-blue-600 ${
                darkMode
                  ? "text-white group-hover:text-blue-400"
                  : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-xs px-2 py-1 rounded ${
              darkMode
                ? "text-gray-400 bg-gray-700"
                : "text-gray-500 bg-gray-100"
            }`}
          >
            {period}
          </p>
        </div>
      </div>

      <p
        className={`text-sm mb-3 leading-relaxed ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {description}
      </p>

      {links && links.length > 0 && (
        <div className="flex gap-1">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// Photo Component with animation
const ProfilePhoto: React.FC<{ darkMode?: boolean }> = ({
  darkMode = false,
}) => {
  const photoRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Photo animation
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotation: -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: photoRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Floating border animation
      if (borderRef.current) {
        gsap.to(borderRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }
    },
    { scope: photoRef }
  );

  return (
    <div className="relative">
      {/* Animated border */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75"
        style={{
          padding: "2px",
          background:
            "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      ></div>

      {/* Profile photo */}
      <div
        ref={photoRef}
        className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg"
      >
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center overflow-hidden ${
            darkMode ? "bg-gray-600" : "bg-gray-300"
          }`}
        >
          {/* Real image */}
          <img
            src="/myphoto.png" // or URL like "https://example.com/photo.jpg"
            alt="Profile Photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
        <Trophy size={10} className="sm:w-3 sm:h-3 text-white" />
      </div>
      <div className="absolute -bottom-1 -left-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-green-400 rounded-full flex items-center justify-center shadow-sm">
        <Code2 size={10} className="sm:w-3 sm:h-3 text-white" />
      </div>
    </div>
  );
};

// Social Links Component
const SocialLinks: React.FC<{ darkMode?: boolean }> = ({
  darkMode = false,
}) => {
  const socialRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (socialRef.current) {
        gsap.fromTo(
          socialRef.current.children,
          {
            opacity: 0,
            y: 20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: socialRef }
  );

  const socials: SocialLink[] = [
    {
      icon: Github,
      href: "https://github.com",
      color: "hover:text-gray-700 dark:hover:text-white",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      color: "hover:text-blue-600",
    },
    {
      icon: Mail,
      href: "mailto:hello@example.com",
      color: "hover:text-red-500",
    },
  ];

  return (
    <div ref={socialRef} className="flex gap-2 justify-center lg:justify-start">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.href}
          className={`p-1.5 sm:p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 transform-gpu ${
            darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-600"
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <social.icon size={14} className="sm:w-4 sm:h-4" />
        </a>
      ))}
    </div>
  );
};

// Main About Me Component
const About: React.FC<AboutProps> = ({ darkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const photoSectionRef = useRef<HTMLDivElement>(null);

  // Main animations with ScrollTrigger
  useGSAP(
    () => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: -30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Bio animation
      if (bioRef.current) {
        gsap.fromTo(
          bioRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Photo section animation
      if (photoSectionRef.current) {
        gsap.fromTo(
          photoSectionRef.current,
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: photoSectionRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Skills section header
      if (skillsRef.current) {
        const skillsHeader = skillsRef.current.querySelector("h2");
        if (skillsHeader) {
          gsap.fromTo(
            skillsHeader,
            {
              opacity: 0,
              x: -20,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: skillsHeader,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    },
    { scope: containerRef }
  );

  // Sample data with proper typing - Reduced number of skills to fit better

  const skills: Skill[] = [
    { name: "React", icon: Layers },
    { name: "TypeScript", icon: Code2 },
    { name: "Tailwind CSS", icon: Layers },
    { name: "Java", icon: Code2 },
    { name: "Spring Boot", icon: Cpu },
    { name: "PostgreSQL", icon: Database },
    { name: "Firebase", icon: Database },
    { name: "REST APIs", icon: Cpu },
    { name: "Git & GitHub", icon: GitBranch },
  ];

  const experiences: Experience[] = [
    {
      title: "Frontend Developer",
      subtitle: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend development for enterprise applications with React and modern patterns.",
      icon: Briefcase,
      links: [{ label: "Website", url: "https://example.com" }],
    },
    {
      title: "Full Stack Developer",
      subtitle: "Digital Solutions LLC",
      period: "2020 - 2022",
      description:
        "Developed full-stack applications using React, Node.js, and MongoDB.",
      icon: Code2,
      links: [{ label: "Projects", url: "https://example.com" }],
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-colors duration-500 flex items-center justify-center py-16 md:py-24 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-blue-900"
          : "bg-gradient-to-br from-gray-50 to-blue-50"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl lg:max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 sm:p-2 rounded-lg ${
                darkMode
                  ? "bg-blue-900 text-blue-400"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              <User size={16} className="sm:w-5 sm:h-5" />
            </div>
            <h1
              className={`text-lg sm:text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              About Me
            </h1>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-4 lg:space-y-6">
            {/* Intro Section */}
            <section className="mb-6 lg:mb-8">
              <h2
                ref={titleRef}
                className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Hello, I&apos;m Lahiru lakshan
              </h2>

              <div
                ref={bioRef}
                className={`text-sm sm:text-base leading-relaxed space-y-2 lg:space-y-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <p>
                  Full-stack developer passionate about crafting seamless
                  digital experiences that merge design and functionality.
                  . Always exploring new ways to blend
                  creativity with logic.
                </p>
                <p>
                  Dedicated to delivering clean, efficient, and impactful
                  solutions.
                </p>
                <div
                  className={`flex items-center gap-2 text-xs sm:text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <MapPin size={12} className="sm:w-4 sm:h-4" />
                  <span>Kurunegala ,LK</span>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section ref={skillsRef} className="mb-4 lg:mb-6">
              <h2
                className={`text-base sm:text-lg lg:text-xl font-bold mb-3 lg:mb-4 flex items-center gap-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <Code2
                  size={16}
                  className="sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400"
                />
                Skills & Technologies
              </h2>

              <div className="flex flex-wrap gap-1.5 lg:gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={skill.name}
                    icon={skill.icon}
                    delay={0.05 + index * 0.03}
                    darkMode={darkMode}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Social Links */}
            <div className="pt-2">
              <SocialLinks darkMode={darkMode} />
            </div>
          </div>

          {/* Right Column - Photo */}
          <div
            ref={photoSectionRef}
            className="flex justify-center lg:justify-end"
          >
            <div className="sticky top-4">
              <ProfilePhoto darkMode={darkMode} />
            </div>
          </div>
        </div>

        {/* Experience Section */}
        {/* <section ref={timelineRef} className="mt-8 lg:mt-12">
          <h2
            className={`text-base sm:text-lg lg:text-xl font-bold mb-4 lg:mb-6 flex items-center gap-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <Calendar
              size={16}
              className="sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400"
            />
            Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {experiences.map((experience, index) => (
              <Card
                key={index}
                title={experience.title}
                subtitle={experience.subtitle}
                period={experience.period}
                description={experience.description}
                icon={experience.icon}
                links={experience.links}
                delay={0.1 + index * 0.1}
                darkMode={darkMode}
              />
            ))}
          </div>
        </section> */}

        {/* Footer */}
        {/* <footer
          className={`text-center text-xs mt-8 lg:mt-12 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <p>© 2024 Alex Johnson. Built with React, GSAP & Tailwind.</p>
        </footer> */}
      </div>
    </div>
  );
};

export default About;
