"use client";

import { useEffect, useRef } from "react";

export const useScrollEffects = (darkMode: boolean) => {
  const scrollLoadedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadGSAP = async () => {
      if (scrollLoadedRef.current) return;

      try {
        const gsapModule = await import("gsap");
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");

        gsapModule.gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);

        // expose for legacy code (confetti, etc.)
        (window as any).gsap = gsapModule.gsap;
        (window as any).ScrollTrigger = ScrollTriggerModule.ScrollTrigger;

        scrollLoadedRef.current = true;
        console.log("GSAP loaded successfully!");
      } catch (err) {
        console.error("Failed to load GSAP:", err);
      }
    };

    loadGSAP();
  }, []);

  useEffect(() => {
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!ScrollTrigger) return;

    const trigger = ScrollTrigger.getById("navbar");
    trigger?.kill();

    // Your scroll effects here
  }, [darkMode]);
};