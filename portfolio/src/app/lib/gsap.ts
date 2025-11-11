// app/src/lib/gsap.ts
'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin'; // ADD THIS

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollToPlugin, TextPlugin); // ADD TextPlugin
}

export { useGSAP, gsap };