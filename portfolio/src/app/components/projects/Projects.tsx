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
  Zap,
  Palette,
  Shield,
  Users,
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

interface ProjectCategory {
  name: string;
  icon: LucideIcon;
  count: number;
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
      className={`inline-block px-2 py-1 text-xs rounded-full border transition-all duration-300 ${
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
  const contentRef = useRef<HTMLDivElement>(null);

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
      case 'web': return <Globe size={14} />;
      case 'mobile': return <Smartphone size={14} />;
      case 'fullstack': return <Database size={14} />;
      case 'cloud': return <Cloud size={14} />;
      default: return <Code2 size={14} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl shadow-xl border overflow-hidden transition-all duration-500 hover:shadow-2xl transform-gpu ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-blue-600' 
          : 'bg-white border-gray-200 hover:border-blue-300'
      } ${project.featured ? 'ring-2 ring-yellow-400' : ''}`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            <Star size={12} fill="currentColor" />
            Featured
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`flex items-center gap-1 ${getStatusColor(project.status)} text-white px-2 py-1 rounded-full text-xs`}>
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          {getStatusText(project.status)}
        </div>
      </div>

      {/* Project Image */}
      <div 
        ref={imageRef}
        className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600"
      >
        <div className={`absolute inset-0 flex items-center justify-center ${
          darkMode ? 'bg-gray-900' : 'bg-gray-100'
        } bg-opacity-50`}>
          <div className="text-center">
            {getCategoryIcon(project.category)}
            <h3 className={`text-lg font-bold mt-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {project.title}
            </h3>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="p-2 bg-white text-gray-900 rounded-full shadow-lg hover:scale-110 transform transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className="p-2 bg-gray-900 text-white rounded-full shadow-lg hover:scale-110 transform transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div 
        ref={contentRef}
        className="p-6"
      >
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          {getCategoryIcon(project.category)}
          <span className={`text-xs font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 transition-colors group-hover:text-blue-600 ${
          darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-sm mb-4 leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <TechnologyBadge
              key={tech}
              technology={tech}
              index={techIndex}
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium group/btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={14} />
              Live Demo
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={14} />
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
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
      longDescription: "A comprehensive e-commerce platform built with modern technologies featuring user authentication, product management, shopping cart, and secure payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      category: "FullStack",
      image: "/api/placeholder/400/200",
      liveUrl: "https://demo-ecommerce.example.com",
      githubUrl: "https://github.com/username/ecommerce-platform",
      featured: true,
      status: "completed"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      longDescription: "A Kanban-style task management tool that enables teams to collaborate effectively with drag-and-drop functionality and real-time notifications.",
      technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL", "Tailwind"],
      category: "Web",
      image: "/api/placeholder/400/200",
      liveUrl: "https://tasks.example.com",
      githubUrl: "https://github.com/username/task-manager",
      featured: false,
      status: "completed"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather forecasting application with interactive maps and location-based services.",
      longDescription: "A responsive weather dashboard that provides accurate forecasts, severe weather alerts, and beautiful data visualizations.",
      technologies: ["Vue.js", "D3.js", "Weather API", "PWA", "Chart.js"],
      category: "Web",
      image: "/api/placeholder/400/200",
      liveUrl: "https://weather-dash.example.com",
      githubUrl: "https://github.com/username/weather-dashboard",
      featured: false,
      status: "completed"
    },
    {
      id: 4,
      title: "Fitness Tracker Mobile App",
      description: "Cross-platform mobile application for tracking workouts, nutrition, and fitness goals.",
      longDescription: "A React Native fitness app that helps users track their workouts, set goals, and monitor progress with beautiful charts and analytics.",
      technologies: ["React Native", "Firebase", "Chart.js", "Health APIs"],
      category: "Mobile",
      image: "/api/placeholder/400/200",
      liveUrl: "https://fitness-app.example.com",
      githubUrl: "https://github.com/username/fitness-tracker",
      featured: true,
      status: "in-progress"
    },
    {
      id: 5,
      title: "Cloud File Storage",
      description: "Secure cloud storage solution with file sharing, collaboration, and advanced security features.",
      longDescription: "A secure cloud storage platform with end-to-end encryption, file versioning, and seamless collaboration tools for teams.",
      technologies: ["AWS", "React", "Node.js", "Encryption", "WebRTC"],
      category: "Cloud",
      image: "/api/placeholder/400/200",
      githubUrl: "https://github.com/username/cloud-storage",
      featured: false,
      status: "in-progress"
    },
    {
      id: 6,
      title: "AI Content Generator",
      description: "AI-powered content creation tool with natural language processing and multiple content formats.",
      longDescription: "An intelligent content generation platform that uses machine learning to create high-quality written content for various use cases.",
      technologies: ["Python", "FastAPI", "React", "OpenAI API", "Docker"],
      category: "Web",
      image: "/api/placeholder/400/200",
      featured: false,
      status: "planned"
    }
  ];

  const categories: ProjectCategory[] = [
    { name: "All", icon: Globe, count: projects.length },
    { name: "Web", icon: Globe, count: projects.filter(p => p.category === "Web").length },
    { name: "Mobile", icon: Smartphone, count: projects.filter(p => p.category === "Mobile").length },
    { name: "FullStack", icon: Database, count: projects.filter(p => p.category === "FullStack").length },
    { name: "Cloud", icon: Cloud, count: projects.filter(p => p.category === "Cloud").length }
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
      className={`min-h-screen transition-colors duration-500 py-16 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-purple-900' 
          : 'bg-gradient-to-br from-gray-50 to-purple-50'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-xl ${
              darkMode ? 'bg-purple-900 text-purple-400' : 'bg-purple-100 text-purple-600'
            }`}>
              <Rocket size={20} />
            </div>
            <span className={`text-sm font-semibold ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              PORTFOLIO
            </span>
          </div>

          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            My Projects
          </h1>
          
          <p 
            ref={subtitleRef}
            className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            A collection of my recent work showcasing full-stack development, 
            modern UI/UX design, and innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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