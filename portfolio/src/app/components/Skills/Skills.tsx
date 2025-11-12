"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Palette,
  Database,
  Cloud,
  Smartphone,
  Zap,
  Shield,
  Users,
  Globe,
  Cpu,
  GitBranch,
  Figma,
  Server,
  Layout,
  Sparkles
} from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Types
interface Skill {
  name: string;
  category: string;
  icon: React.ElementType;
  level: 'advanced' | 'intermediate' | 'beginner';
  color: string;
}

interface SkillCategory {
  name: string;
  icon: React.ElementType;
  description: string;
  skills: Skill[];
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  darkMode?: boolean;
}

interface CategorySectionProps {
  category: SkillCategory;
  darkMode?: boolean;
}

// Skill Card Component
const SkillCard: React.FC<SkillCardProps> = ({ skill, index, darkMode = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Icon floating animation
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, { scope: cardRef });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'advanced': return 'from-green-500 to-emerald-600';
      case 'intermediate': return 'from-blue-500 to-cyan-600';
      case 'beginner': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'advanced': return 'Advanced';
      case 'intermediate': return 'Intermediate';
      case 'beginner': return 'Beginner';
      default: return level;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group p-3 rounded-lg border transition-all duration-500 hover:scale-[1.02] hover:shadow-lg transform-gpu ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-blue-600' 
          : 'bg-white border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div 
            ref={iconRef}
            className={`p-1.5 rounded-md bg-gradient-to-r ${getLevelColor(skill.level)} text-white shadow-sm`}
          >
            <skill.icon size={16} />
          </div>
          <div>
            <h3 className={`font-semibold text-sm transition-colors group-hover:text-blue-600 ${
              darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900'
            }`}>
              {skill.name}
            </h3>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              skill.level === 'advanced' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : skill.level === 'intermediate'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            }`}>
              {getLevelText(skill.level)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Animated background effect */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${getLevelColor(skill.level)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
    </div>
  );
};

// Category Section Component
const CategorySection: React.FC<CategorySectionProps> = ({ category, darkMode = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          x: -20
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Stagger animation for skills in this category
    if (sectionRef.current) {
      const skillCards = sectionRef.current.querySelectorAll('.skill-card');
      gsap.fromTo(skillCards,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-1.5 rounded-lg ${
          darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'
        }`}>
          <category.icon size={18} />
        </div>
        <div>
          <h2 ref={titleRef} className={`text-lg font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {category.name}
          </h2>
          <p className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {category.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {category.skills.map((skill, index) => (
          <div key={skill.name} className="skill-card">
            <SkillCard
              skill={skill}
              index={index}
              darkMode={darkMode}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Main Skills Component
interface SkillsProps {
  darkMode?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ darkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Skills data organized by categories
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend Development",
      icon: Layout,
      description: "Modern frontend technologies and frameworks",
      skills: [
        { name: "React", category: "Frontend", icon: Code2, level: "advanced", color: "blue" },
        { name: "TypeScript", category: "Frontend", icon: Code2, level: "advanced", color: "blue" },
        { name: "Next.js", category: "Frontend", icon: Globe, level: "intermediate", color: "gray" },
        { name: "Tailwind CSS", category: "Frontend", icon: Palette, level: "advanced", color: "cyan" },
        { name: "Vue.js", category: "Frontend", icon: Zap, level: "beginner", color: "green" },
        { name: "GSAP", category: "Frontend", icon: Sparkles, level: "intermediate", color: "green" }
      ]
    },
    {
      name: "Backend Development",
      icon: Server,
      description: "Server-side technologies and databases",
      skills: [
        { name: "Node.js", category: "Backend", icon: Database, level: "advanced", color: "green" },
        { name: "Python", category: "Backend", icon: Cpu, level: "intermediate", color: "yellow" },
        { name: "MongoDB", category: "Backend", icon: Database, level: "intermediate", color: "green" },
        { name: "PostgreSQL", category: "Backend", icon: Database, level: "intermediate", color: "blue" },
        { name: "Redis", category: "Backend", icon: Database, level: "beginner", color: "red" },
        { name: "REST APIs", category: "Backend", icon: Cloud, level: "advanced", color: "blue" }
      ]
    },
    {
      name: "Tools & Others",
      icon: Zap,
      description: "Development tools and additional technologies",
      skills: [
        { name: "Git & GitHub", category: "Tools", icon: GitBranch, level: "advanced", color: "orange" },
        { name: "Docker", category: "Tools", icon: Cloud, level: "intermediate", color: "blue" },
        { name: "AWS", category: "Tools", icon: Cloud, level: "beginner", color: "orange" },
        { name: "Figma", category: "Tools", icon: Figma, level: "intermediate", color: "purple" },
        { name: "Jest", category: "Tools", icon: Shield, level: "intermediate", color: "red" },
        { name: "Agile/Scrum", category: "Tools", icon: Users, level: "advanced", color: "green" }
      ]
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
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-colors duration-500 py-12 md:py-20 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-blue-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl lg:max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-1.5 mb-2 md:mb-3">
            <div className={`p-1 rounded-md ${
              darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <Zap size={14} />
            </div>
            <span className={`text-xs font-semibold ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              TECHNOLOGIES
            </span>
          </div>

          <h1 
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </h1>
          
          <p 
            ref={subtitleRef}
            className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            A comprehensive overview of my technical expertise across different domains 
            and technologies I work with.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <CategorySection
              key={category.name}
              category={category}
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* Additional Info Section */}
        <div className={`text-center mt-12 p-6 rounded-xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-md border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`p-2 rounded-full inline-flex mb-3 ${
            darkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-600'
          }`}>
            <Sparkles size={18} />
          </div>
          <h3 className={`text-lg font-bold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Always Learning
          </h3>
          <p className={`text-sm max-w-md mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Continuously exploring new technologies and improving my skills 
            to stay at the forefront of web development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;