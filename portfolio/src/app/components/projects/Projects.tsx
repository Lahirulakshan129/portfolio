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
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, darkMode = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
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
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Image hover animation
    if (imageRef.current) {
      const hoverAnimation = gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.3,
        paused: true,
        ease: "power2.out"
      });

      imageRef.current.addEventListener('mouseenter', () => hoverAnimation.play());
      imageRef.current.addEventListener('mouseleave', () => hoverAnimation.reverse());
    }
  }, { scope: cardRef });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'planned': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Coming Soon';
      default: return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web': return <Globe size={10} />;
      case 'mobile': return <Smartphone size={10} />;
      case 'fullstack': return <Database size={10} />;
      case 'cloud': return <Cloud size={10} />;
      default: return <Globe size={10} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-lg shadow-md border overflow-hidden transition-all duration-500 hover:shadow-lg transform-gpu ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-blue-600' 
          : 'bg-white border-gray-200 hover:border-blue-300'
      } ${project.featured ? 'ring-1 ring-yellow-400' : ''}`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-2 left-2 z-10">
          <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full text-xs font-bold">
            <Star size={8} fill="currentColor" />
            Featured
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-2 right-2 z-10">
        <div className={`flex items-center gap-1 ${getStatusColor(project.status)} text-white px-1.5 py-0.5 rounded-full text-xs`}>
          <div className="w-1 h-1 rounded-full bg-white"></div>
          {getStatusText(project.status)}
        </div>
      </div>

      {/* Project Image */}
      <div 
        ref={imageRef}
        className="relative h-32 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600"
      >
        <div className={`absolute inset-0 flex items-center justify-center ${
          darkMode ? 'bg-gray-900' : 'bg-gray-100'
        } bg-opacity-50`}>
          <div className="text-center">
            {getCategoryIcon(project.category)}
            <h3 className={`text-sm font-bold mt-1 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {project.title}
            </h3>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex gap-1.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="p-1 bg-white text-gray-900 rounded-full shadow-md hover:scale-110 transform transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={12} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className="p-1 bg-gray-900 text-white rounded-full shadow-md hover:scale-110 transform transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={12} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-3">
        {/* Category */}
        <div className="flex items-center gap-1 mb-1.5">
          {getCategoryIcon(project.category)}
          <span className={`text-xs font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-base font-bold mb-1.5 transition-colors group-hover:text-blue-600 ${
          darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-xs mb-2.5 leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <TechnologyBadge
              key={tech}
              technology={tech}
              index={techIndex}
              darkMode={darkMode}
            />
          ))}
          {project.technologies.length > 3 && (
            <span className={`text-xs px-1.5 py-0.5 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5 pt-2 border-t border-gray-200 dark:border-gray-700">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 text-xs font-medium group/btn flex-1 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={10} />
              Live
              <ArrowRight size={8} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-all duration-300 text-xs font-medium ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              } flex-1 justify-center`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={10} />
              Code
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
      image: "/wildtrails.jpg",
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
      image: "/api/placeholder/400/200",
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
      image: "/api/placeholder/400/200",
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
      image: "/api/placeholder/400/200",
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
      image: "/api/placeholder/400/200",
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
      image: "/api/placeholder/400/200",
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
      className={`min-h-screen transition-colors duration-500 py-12 md:py-20 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-purple-900' 
          : 'bg-gradient-to-br from-gray-50 to-purple-50'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl lg:max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
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
            className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            A collection of my recent work showcasing full-stack development and modern solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
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