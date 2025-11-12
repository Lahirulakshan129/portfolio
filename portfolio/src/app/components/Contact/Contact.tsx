"use client";
import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageCircle,
  CheckCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Types
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  color: string;
}

interface ContactInfoItemProps {
  contact: ContactInfo;
  index: number;
  darkMode?: boolean;
}

// Contact Info Item Component
const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ contact, index, darkMode = false }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const Icon = contact.icon;

  useGSAP(() => {
    if (itemRef.current) {
      gsap.fromTo(itemRef.current,
        {
          opacity: 0,
          x: -20,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, { scope: itemRef });

  const content = (
    <div
      ref={itemRef}
      className={`group p-2 rounded-md border transition-all duration-300 hover:scale-[1.01] hover:shadow-sm transform-gpu cursor-pointer ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-blue-600' 
          : 'bg-white border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-sm bg-gradient-to-r ${contact.color} text-white group-hover:scale-105 transition-transform duration-200`}>
          <Icon size={12} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-xs mb-0.5 truncate ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {contact.label}
          </h3>
          <p className={`text-xs truncate ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {contact.value}
          </p>
        </div>
        <ExternalLink 
          size={10} 
          className={`flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} 
        />
      </div>
    </div>
  );

  if (contact.href) {
    return (
      <a 
        href={contact.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

// Main Contact Component
interface ContactProps {
  darkMode?: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Contact information
  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@alexjohnson.dev',
      href: 'mailto:hello@alexjohnson.dev',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  useGSAP(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: -20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
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
          y: 15
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        {
          opacity: 0,
          x: -20
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Info animation
    if (infoRef.current) {
      gsap.fromTo(infoRef.current,
        {
          opacity: 0,
          x: 20
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, { scope: containerRef });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for errors
      if (formRef.current) {
        gsap.to(formRef.current, {
          x: -5,
          duration: 0.08,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      console.log('Form submitted:', formData);
      
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Success animation
      if (formRef.current) {
        gsap.to(formRef.current, {
          scale: 1.01,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        });
      }

      // Reset success state after 2.5 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 2500);

    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-colors duration-300 py-8 md:py-16 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-purple-900' 
          : 'bg-gradient-to-br from-gray-50 to-purple-50'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 max-w-2xl lg:max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1 mb-1.5 md:mb-2">
            <div className={`p-1 rounded-sm ${
              darkMode ? 'bg-purple-900 text-purple-400' : 'bg-purple-100 text-purple-600'
            }`}>
              <MessageCircle size={12} />
            </div>
            <span className={`text-xs font-medium ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              CONTACT
            </span>
          </div>

          <h1 
            ref={titleRef}
            className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            Get In Touch
          </h1>
          
          <p 
            ref={subtitleRef}
            className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Ready to bring your ideas to life? Let's discuss your project.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {/* Name Field */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <User size={12} className={
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                } />
                <label htmlFor="name" className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Your Name
                </label>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 text-sm rounded-md border transition-all duration-200 focus:outline-none focus:scale-[1.01] ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-400'
                } ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs animate-pulse">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Mail size={12} className={
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                } />
                <label htmlFor="email" className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Email Address
                </label>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 text-sm rounded-md border transition-all duration-200 focus:outline-none focus:scale-[1.01] ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-400'
                } ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs animate-pulse">{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <MessageCircle size={12} className={
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                } />
                <label htmlFor="message" className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Your Message
                </label>
              </div>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-2 text-sm rounded-md border transition-all duration-200 focus:outline-none focus:scale-[1.01] resize-none ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-400'
                } ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p className="text-red-500 text-xs animate-pulse">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-3 rounded-md font-medium text-xs transition-all duration-200 transform-gpu flex items-center justify-center gap-1.5 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-[1.01] hover:shadow-sm'
              } text-white shadow-sm`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : isSent ? (
                <>
                  <CheckCircle size={12} />
                  Sent!
                </>
              ) : (
                <>
                  <Send size={12} />
                  Send Message
                </>
              )}
            </button>

            {/* Success Message */}
            {isSent && (
              <div className="text-center p-2 rounded-md bg-green-500 bg-opacity-20 border border-green-500">
                <div className="flex items-center justify-center gap-1 text-green-500 text-xs font-medium">
                  <Sparkles size={10} />
                  Message sent successfully
                </div>
              </div>
            )}
          </form>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-3">
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-sm border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`text-sm font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Let's Connect
              </h3>
              <p className={`mb-3 text-xs leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Interested in working together? Reach out and let's create something amazing.
              </p>
              
              <div className="space-y-2">
                {contactInfo.map((contact, index) => (
                  <ContactInfoItem
                    key={contact.label}
                    contact={contact}
                    index={index}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>

            {/* Response Time Info */}
            <div className={`p-2 rounded-md text-center ${
              darkMode ? 'bg-blue-900 bg-opacity-40' : 'bg-blue-50'
            }`}>
              <p className={`text-xs ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                💫 Respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;