"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ExternalLink,
  Github,
  Globe,
  Smartphone,
  Database,
  Cloud,
  Rocket,
  ArrowRight,
  Star
} from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
}

interface ProjectCardProps {
  project: Project;
  index: number;
  darkMode?: boolean;
}

interface TechnologyBadgeProps {
  technology: string;
  index: number;
  darkMode?: boolean;
}

// Technology Badge Component
const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({ technology, index, darkMode = false }) => {
  const badgeRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 10
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1 + (index * 0.05),
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, { scope: badgeRef });

  return (
    <span
      ref={badgeRef}
      className={`inline-block px-1.5 py-0.5 text-xs rounded-full border transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800 border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400' 
          : 'bg-gray-100 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600'
      }`}
    >
      {technology}
    </span>
  );
};

// Project Card Component
// Project Card Component (CORRECTED VERSION)
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, darkMode = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Image hover scale effect
    if (imageRef.current) {
      const hover = gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
        paused: true,
      });

      imageRef.current.addEventListener("mouseenter", () => hover.play());
      imageRef.current.addEventListener("mouseleave", () => hover.reverse());
    }
  }, { scope: cardRef });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-yellow-500";
      case "planned":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Coming Soon";
      default:
        return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web":
        return <Globe size={10} />;
      case "mobile":
      case "mobileapp":
        return <Smartphone size={10} />;
      case "fullstack":
        return <Database size={10} />;
      case "cloud":
      case "iot":
        return <Cloud size={10} />;
      default:
        return <Globe size={10} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-lg shadow-md border overflow-hidden transition-all duration-500 hover:shadow-xl transform-gpu ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-blue-600"
          : "bg-white border-gray-200 hover:border-blue-300"
      } ${project.featured ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900/50" : ""}`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20">
          <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-20">
        <div className={`flex items-center gap-1.5 ${getStatusColor(project.status)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
          {getStatusText(project.status)}
        </div>
      </div>

      {/* Project Image Container */}
      <div ref={imageRef} className="relative h-48 overflow-hidden bg-gray-200">
        {/* Actual Image */}
        <img
          src={project.image || "/api/placeholder/600/400"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Dark overlay with title & icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
          <div className="text-center text-white">
            {getCategoryIcon(project.category)}
            <h3 className="text-lg font-bold mt-2">{project.title}</h3>
          </div>
        </div>

        {/* Hover Action Buttons (Live / GitHub) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-3 scale-90 group-hover:scale-100 transition-transform duration-300">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white text-gray-900 rounded-full shadow-xl hover:scale-110 transition-all duration-200"
              >
                <ExternalLink size={18} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-900 text-white rounded-full shadow-xl hover:scale-110 transition-all duration-200 border border-white/20"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          {getCategoryIcon(project.category)}
          <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold mb-2 transition-colors ${
            darkMode ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"
          }`}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <TechnologyBadge key={tech} technology={tech} index={i} darkMode={darkMode} />
          ))}
          {project.technologies.length > 4 && (
            <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons at Bottom */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium"
            >
              <Globe size={14} />
              View Live
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-300 ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Github size={14} />
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Projects Component
interface ProjectsProps {
  darkMode?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "WildTrails - Safari Booking Platform",
      description: "Full-stack platform for booking and managing wildlife safaris.",
      longDescription: "A comprehensive safri platform built with explore realtime wildlife sightings.",
      technologies: ["React (Vite)", "Spring Boot", "PostgreSQL", "Firebase", "GSAP", "Tailwind CSS"],
      category: "FullStack",
      image: "/images/wildtrails.jpg",
      liveUrl: "",
      githubUrl: "https://github.com/lahirulakshan129/Wild-Trails",
      featured: true,
      status: "completed"
    },
    {
      id: 2,
      title: "Inventory Pro",
      description: "Web-based inventory management system .",
      longDescription: "multi-store businesses with real-time tracking, order & supplier management..",
      technologies: ["PHP", "MySQL", "Bootstrap 5", "JavaScript", "HTML5", "CSS3"],
      category: "FullStack",
      image: "/images/inventoryPro.png",
      liveUrl: "",
      githubUrl: "https://github.com/lahirulakshan129/inventory-pro",
      featured: true,
      status: "completed"
    },
    {
      id: 3,
      title: "Flix Finder 🎬",
      description: "Android app that watch the latest movies with theire trailers.",
      longDescription: " That fetches details, posters, and official trailers using the TMDB API..",
      technologies: ["Kotlin", "Android Studio", "TMDB API"],
      category: "MobileApp",
      image: "/images/flixfinder.png",
      liveUrl: "",
      githubUrl: "https://github.com/Lahirulakshan129/Flix-finder   ",
      featured: false,
      status: "completed"
    },
    {
      id: 4,
      title: "Vigenère Cipher Simulator 🔐",
      description: "JavaFX desktop app demonstrating encryption and decryption using the classical Vigenère cipher for text messages.",
      longDescription: "React Native fitness app with progress tracking.",
      technologies: ["Java", "JavaFX"],
      category: "DesktopApp",
      image: "/images/ciperApp.png",
      liveUrl: "",
      githubUrl: "https://github.com/Lahirulakshan129/Vegenere-cipher-Softwere-java",
      featured: true,
      status: "completed"
    },
    {
      id: 5,
      title: "MovieHub 🎥",
      description: "A modern movie browser with streaming and  download.modern, fast, and fully automated movie browsing platform.scrapes torrent sources in real-time, enabling users to stream movies online or download them using magnet links",
      longDescription: " ",
      technologies: ["Python", "Flask", "BeautifulSoup", "Magnet Links", "HTML5", "CSS3", "JavaScript"],
      category: "Web",
      image: "/images/moviehub.png",
      githubUrl: "https://github.com/Lahirulakshan129/MovieHub",
      featured: false,
      status: "completed"
    },
    {
      id: 6,
      title: "Anti-Theft Mat (IoT) 🛡️",
      description: "IoT anti-theft mat that detects presence and uses real-time face detection to authenticate users and alert owners.",
      longDescription: "ML platform for content generation.",
      technologies: ["OpenCV", "MQTT", "React", "ESP32"],
      category: "IoT",
      image: "/images/iotmat.png",
      featured: false,
      status: "planned"
    }
  ];

  useGSAP(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: -30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Grid stagger animation
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-colors duration-500 py-8 md:py-12 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-purple-900' 
          : 'bg-gradient-to-br from-gray-50 to-purple-50'
      }`}
    >
      <div className="w-full px-3 sm:px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10 pt-16 md:pt-20"> {/* Added pt-16 md:pt-20 for top padding */}
          <div className="inline-flex items-center gap-1.5 mb-2 md:mb-3">
            <div className={`p-1 rounded-md ${
              darkMode ? 'bg-purple-900 text-purple-400' : 'bg-purple-100 text-purple-600'
            }`}>
              <Rocket size={14} />
            </div>
            <span className={`text-xs font-semibold ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              PORTFOLIO
            </span>
          </div>

          <h1 
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            My Projects
          </h1>
          
          <p 
            ref={subtitleRef}
            className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            A collection of my recent work showcasing full-stack development and modern solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 px-1"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;