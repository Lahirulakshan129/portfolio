"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";

interface Props {
  darkMode: boolean;
  toggleDarkMode: () => void;
  scrollTo: (id: string) => void;
  activeSection: string;
}

const sections = ["home", "about", "projects", "skills", "contact"] as const;

export const Navbar = ({
  darkMode,
  toggleDarkMode,
  scrollTo,
  activeSection,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic classes based on dark mode
  const getNavBackground = () => {
    if (!scrolled) return "bg-transparent";
    return darkMode 
      ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10"
      : "bg-white/80 backdrop-blur-xl border-b border-gray-200";
  };

  const textColor = darkMode ? "text-gray-300" : "text-gray-700";
  const hoverTextColor = darkMode ? "hover:text-white" : "hover:text-gray-900";
  const mobileMenuBg = darkMode ? "bg-gray-900" : "bg-white";
  const mobileBorder = darkMode ? "border-white/10" : "border-gray-200";
  const mobileButtonBg = darkMode ? "bg-white/5" : "bg-gray-500/5";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavBackground()} ${
        scrolled ? "py-4 shadow-2xl" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="group relative"
          >
            <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
              AD
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300">
              AD
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`relative px-6 py-3 font-semibold transition-all duration-300 group ${
                  activeSection === section
                    ? "text-cyan-400"
                    : `${textColor} ${hoverTextColor}`
                }`}
              >
                <span className="relative z-10">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
                
                {/* Active indicator */}
                {activeSection === section && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                )}

                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 ${
                  darkMode 
                    ? "bg-cyan-500/10" 
                    : "bg-cyan-500/5"
                }`} />
                
                {/* Bottom border animation */}
                <div
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full ${
                    activeSection === section ? "w-full" : ""
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-300 group ${
                darkMode
                  ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                  : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              )}
            </Button>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-3 rounded-xl transition-all duration-300 ${
                open
                  ? "bg-cyan-500/20 text-cyan-400"
                  : `${mobileButtonBg} ${textColor} hover:bg-opacity-10`
              }`}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${mobileMenuBg} rounded-xl mt-4 border ${mobileBorder} ${
            open
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div className="py-6 space-y-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  scrollTo(section);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-4 rounded-xl font-semibold transition-all duration-300 group mx-2 ${
                  activeSection === section
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                    : `${textColor} ${hoverTextColor} border border-transparent`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                  {activeSection === section && (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  )}
                </div>
                
                {/* Mobile hover effect */}
                <div
                  className={`h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 mt-2 ${
                    activeSection === section
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Background blur overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
};