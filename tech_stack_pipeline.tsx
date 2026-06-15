import React, { useState, useEffect, useRef } from 'react';

// Premium high-fidelity SVGs replicating the actual official brand logos with clean viewports and proper contrast layers
const OfficialLogos = {
  java: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-red-500/30 group-hover/card:shadow-[0_0_20px_rgba(227,46,50,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-12 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Steam */}
        <path d="M14.5 1.5c.5.8-.2 1.8-.8 2.5-.5.6-.7 1-.3 1.5.3.4.8.2.9-.2.2-.8-.4-1.6-.9-2.3s-.1-1.1.6-1.5z" fill="#f43f5e" />
        <path d="M12.5 2.5c.3.6-.1 1.4-.6 1.9-.4.5-.6.8-.3 1.2.3.3.7.1.8-.2.2-.6-.3-1.2-.7-1.7s-.1-.8.8-1.2z" fill="#f43f5e" />
        {/* Coffee Cup */}
        <path d="M5.5 8c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v5.5c0 2.5-2 4.5-4.5 4.5h-3C7.5 18 5.5 16 5.5 13.5V8z" fill="#E32E32" />
        {/* Handle */}
        <path d="M17.5 10h1.5c1.1 0 2 .9 2 2s-.9 2-2 2h-1.5v-4z" stroke="#E32E32" strokeWidth="1.5" strokeLinecap="round" />
        {/* Cup Accent */}
        <path d="M8.5 11h7" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        {/* Base plate */}
        <path d="M4 20h14" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  ),
  springboot: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-emerald-500/30 group-hover/card:shadow-[0_0_20px_rgba(109,179,63,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10.5" fill="#6DB33F" />
        {/* Real Spring Leaf Shape */}
        <path d="M12 4.5c0 0-4.5 3-4.5 7.5S12 19.5 12 19.5s4.5-3 4.5-7.5S12 4.5 12 4.5zm0 15c0 0-3-4.5-3-7.5h6c0 3-3 7.5-3 7.5z" fill="#FFFFFF" />
        <path d="M12 4.5v15" stroke="#6DB33F" strokeWidth="1" />
      </svg>
    </div>
  ),
  laravel: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-red-500/30 group-hover/card:shadow-[0_0_20px_rgba(255,45,32,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Beautiful Official Isometric Laravel Logo */}
        <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" stroke="#FF2D20" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 2v9.8m0 0L3.5 6.9m8.5 4.9l8.5-4.9" stroke="#FF2D20" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 11.8v9.8M3.5 16.7l8.5-4.9m8.5 4.9l-8.5-4.9" stroke="#FF2D20" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  ),
  php: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-indigo-500/30 group-hover/card:shadow-[0_0_20px_rgba(119,123,179,0.15)] transition-all duration-500">
      <svg viewBox="0 0 32 32" className="w-14 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="16" rx="15" ry="9" fill="#777BB3" />
        {/* Crisp official looking bold italic stylized letters */}
        <text x="6" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">p</text>
        <text x="13.5" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">h</text>
        <text x="21" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">p</text>
      </svg>
    </div>
  ),
  sql: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-cyan-500/30 group-hover/card:shadow-[0_0_20px_rgba(0,117,143,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-12 h-12 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Leaping Dolphin + Database Stack */}
        <path d="M3 6c0-1.66 4-3 9-3s9 1.34 9 3-4 3-9 3-9-1.34-9-3z" fill="#00758F" opacity="0.8" />
        <path d="M21 6v4c0 1.66-4 3-9 3s-9-1.34-9-3V6" stroke="#00758F" strokeWidth="1.5" />
        <path d="M21 11v4c0 1.66-4 3-9 3s-9-1.34-9-3v-4" stroke="#00758F" strokeWidth="1.5" />
        <path d="M21 16v3c0 1.66-4 2.5-9 2.5s-9-.84-9-2.5v-3" stroke="#00758F" strokeWidth="1.5" />
        {/* Stylized Dolphin Accents */}
        <path d="M11 2a4 4 0 014 4c0 1.5-1.5 2.5-3 3.5" stroke="#F29111" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  ),
  python: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-blue-500/30 group-hover/card:shadow-[0_0_20px_rgba(55,118,171,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c-2.4 0-3.8 1.1-3.8 3.1v1.9h3.8V7.5h-5.5C4.7 7.5 3 9 3 11.2v2.4c0 1.9 1.5 3 3.4 3h1.7V14.5c0-2.2 1.8-3.9 4-3.9h4.6V7.1C16.7 3.6 15 2 12 2z" fill="#3776AB" />
        <path d="M12 22c2.4 0 3.8-1.1 3.8-3.1v-1.9h-3.8V16.5h5.5c1.8 0 3.5-1.5 3.5-3.7v-2.4c0-1.9-1.5-3-3.4-3h-1.7V10c0 2.2-1.8 3.9-4 3.9H7.2V16.9C7.3 20.4 9 22 12 22z" fill="#FFD343" />
        <circle cx="8.5" cy="5.5" r="0.75" fill="#FFFFFF" />
        <circle cx="15.5" cy="18.5" r="0.75" fill="#111" />
      </svg>
    </div>
  ),
  tailwind: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-cyan-400/30 group-hover/card:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.4 1.4 2.8 2.8 5.7 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 14.9 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.4 1.4 2.8 2.8 5.7 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C11.5 13.4 10.1 12 7.2 12z" fill="#06B6D4" />
      </svg>
    </div>
  ),
  blade: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-red-500/30 group-hover/card:shadow-[0_0_20px_rgba(255,45,32,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#111" />
        <path d="M6 17V7l5 5-5 5zm7 0V7l5 5-5 5z" stroke="#FF2D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ),
  html5: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-orange-500/30 group-hover/card:shadow-[0_0_20px_rgba(227,79,38,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.1 2h15.8l-1.4 16-6.5 2-6.5-2L4.1 2z" fill="#E34F26" />
        <path d="M12 3.6v14.5l4.8-1.3 1-11.8H12z" fill="#F06529" />
        <path d="M12 8.7H8.7l-.2-2.6H12V3.6H6.3l.7 8.2H12V10.1z" fill="#ECECEC" />
        <path d="M12 11.8H9.3l-.2-1.7H12V8.7h5.2l-.5 5.5-4.7 1.3V11.8z" fill="#FFFFFF" />
      </svg>
    </div>
  ),
  css3: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-blue-500/30 group-hover/card:shadow-[0_0_20px_rgba(21,114,182,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.1 2h15.8l-1.4 16-6.5 2-6.5-2L4.1 2z" fill="#1572B6" />
        <path d="M12 3.6v14.5l4.8-1.3 1-11.8H12z" fill="#33A9DC" />
        <path d="M12 8.7H8.7l-.2-2.6H12V3.6H6.3l.7 8.2H12V10.1z" fill="#ECECEC" />
        <path d="M12 11.8H9.3l-.2-1.7H12V8.7h5.2l-.5 5.5-4.7 1.3V11.8z" fill="#FFFFFF" />
      </svg>
    </div>
  ),
  js: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-yellow-500/30 group-hover/card:shadow-[0_0_20px_rgba(247,223,30,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#F7DF1E" rx="3" />
        <path d="M12.14 17.15c.16.29.39.54.67.72.28.18.63.27 1.03.27.42 0 .74-.11.97-.33s.35-.55.35-1v-4.14h1.36v4.1c0 .82-.24 1.45-.72 1.88s-1.18.65-2.08.65c-.75 0-1.35-.16-1.8-.49s-.76-.8-1-1.43l1.22-.73zm5.43.12c.2.33.48.59.83.77.35.18.77.27 1.25.27.57 0 1-.13 1.3-.39s.45-.63.45-1.1c0-.44-.14-.78-.42-1s-.77-.4-1.48-.56c-.75-.17-1.28-.38-1.58-.62s-.45-.6-.45-1.07c0-.52.22-.93.65-1.22s1-.43 1.7-.43c.64 0 1.15.11 1.54.34s.66.58.82 1.05l-1.18.7c-.12-.27-.29-.47-.53-.59s-.53-.18-.87-.18c-.37 0-.66.08-.87.24s-.32.39-.32.68c0 .24.11.43.33.57s.63.26 1.22.4c.83.19 1.41.44 1.73.74s.48.74.48 1.3c0 .66-.25 1.2-.74 1.59s-1.19.59-2.1.59c-.83 0-1.5-.18-2-.53s-.84-.87-1-1.55l1.22-.71z" fill="#000000" />
      </svg>
    </div>
  )
};

const Icons = {
  arrowLeft: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  ),
  arrowRight: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  fastForward: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  rewind: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
    </svg>
  )
};

export default function TechStackCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const trackRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  const techStack = [
    {
      id: "java",
      name: "Java SE & EE",
      category: "Ecosystem Core",
      desc: "Robust object-oriented programming foundations used to build secure multithreaded systems, socket interfaces, and background schedulers.",
      badge: "LTS Standard",
      iconType: "java"
    },
    {
      id: "springboot",
      name: "Spring Boot",
      category: "Java Framework",
      desc: "Enterprise framework for rapid MVC API routing, WebSocket student channels, JPA integration, and high-performance server loops.",
      badge: "Enterprise Standard",
      iconType: "springboot"
    },
    {
      id: "laravel",
      name: "Laravel Engine",
      category: "PHP Framework",
      desc: "Decoupled server controller structures managing relational models, middleware gates, Redis queue workers, and clean routing.",
      badge: "Elegant MVC",
      iconType: "laravel"
    },
    {
      id: "php",
      name: "PHP 11",
      category: "Backend Language",
      desc: "Object-oriented scripting logic driving rapid web platforms, custom request handling, form authentications, and direct databases.",
      badge: "Server Native",
      iconType: "php"
    },
    {
      id: "sql",
      name: "MySQL & SQLite",
      category: "Data Persistency",
      desc: "Relational schema layouts, table configurations, transaction logging, and foreign index keys mapped safely to local data storage.",
      badge: "Persist Layer",
      iconType: "sql"
    },
    {
      id: "python",
      name: "Python Automation",
      category: "Scripting Core",
      desc: "Scripting logic, algorithmic workflows, task schedulers, helper scripts, and fast file parsing automation protocols.",
      badge: "Automation Active",
      iconType: "python"
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "UI Architecture",
      desc: "Rapid responsive layouts using flexbox, viewport limits, custom animations, and clean design tokens mapped right into markup slots.",
      badge: "Responsive Grid",
      iconType: "tailwind"
    },
    {
      id: "blade",
      name: "Blade Engine",
      category: "PHP Template Engine",
      desc: "Lightweight, secure front-end template rendering compiled on-the-fly, allowing reusable layout slots and modular UI components.",
      badge: "Component Flow",
      iconType: "blade"
    },
    {
      id: "html5",
      name: "HTML5 Layouts",
      category: "Web Standards",
      desc: "Strict DOM markup structure emphasizing accessibility, clean content boxes, layout containers, and smooth user flow.",
      badge: "Semantic Web",
      iconType: "html5"
    },
    {
      id: "css3",
      name: "CSS3 Transitions",
      category: "UI Presentation",
      desc: "Visual depth, custom keyframe animations, responsive grid styling, typography, and premium glassmorphism layouts.",
      badge: "Style Matrix",
      iconType: "css3"
    },
    {
      id: "js",
      name: "JavaScript",
      category: "Client Scripting",
      desc: "DOM interactions, asynchronous requests, fetch integrations, live timers, and event triggers linking front-ends to back-end endpoints.",
      badge: "Dynamic Client",
      iconType: "js"
    }
  ];

  // Triplicating lists to guarantee completely seamless looping on large screens
  const repeatedTechStack = [...techStack, ...techStack, ...techStack];

  // Continuous slide movement running frame-by-frame via requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId;
    const scrollSpeed = 0.85; // Continuous speed offset

    const processScroll = () => {
      // ONLY scroll if the user is neither hovering nor actively interacting with controls
      if (!isPaused && !isInteracting) {
        track.scrollLeft += scrollSpeed;

        // Wrap back to origin seamlessly when reaching scroll threshold limits
        const maxScrollLimit = track.scrollWidth / 3;
        if (track.scrollLeft >= maxScrollLimit * 2) {
          track.scrollLeft -= maxScrollLimit;
        }
      }
      frameId = requestAnimationFrame(processScroll);
    };

    frameId = requestAnimationFrame(processScroll);
    return () => {
      cancelAnimationFrame(frameId);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [isPaused, isInteracting]);

  // Handle manual scrolling triggers safely
  const shiftTrack = (multiplier) => {
    const track = trackRef.current;
    if (!track) return;

    // 1. Instantly halt standard drift engine
    setIsInteracting(true);

    // 2. Clear any lingering scroll lock-out timers
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    // 3. Perform manual smooth layout shift
    const cardStepSize = 314; // Card width + gap offset
    track.scrollBy({
      left: cardStepSize * multiplier,
      border: 'smooth'
    });

    // 4. Release interaction locks 1.2s after user finishes clicking to allow a smooth transition
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#070708] py-20 px-4 flex flex-col items-center justify-center relative select-none">
      
      {/* Dynamic Scrollbar hiding fallbacks */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none !important;
        }
        .scrollbar-hide {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {/* Background glow overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-600/[0.04] blur-[140px] rounded-full" />
      </div>

      <div className="max-w-6xl w-full z-10 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-red-950/20 border border-red-900/30 px-3 py-1 rounded-full text-[10px] font-mono text-red-500 uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span>Interactive Framework Map</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-sans">
            Technical Stack Pipeline
          </h2>
          <p className="text-xs text-neutral-400 font-light max-w-md">
            Continuous streaming overview of my developer ecosystem. Hover your cursor anywhere on the track to freeze and inspect official tech modules.
          </p>
        </div>

        {/* Continuous Viewing Portal */}
        <div className="relative group/track">
          {/* Edge gradient masks for seamless integration into page design */}
          <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#070708] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#070708] to-transparent z-20 pointer-events-none" />

          {/* Viewport Mask */}
          <div 
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="overflow-x-auto py-4 px-1 flex gap-6 scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none', 
            }}
          >
            {repeatedTechStack.map((tech, idx) => {
              const RenderIcon = OfficialLogos[tech.iconType];
              return (
                <div 
                  key={idx}
                  className="w-[290px] flex-shrink-0 rounded-2xl border border-neutral-900 bg-neutral-950/50 backdrop-blur-md overflow-hidden flex flex-col justify-between min-h-[350px] hover:border-red-500/25 transition-all duration-300 group/card"
                >
                  
                  {/* High-Fidelity SVG Brand Logo Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-neutral-900/60 p-4 bg-[#09090b] flex items-center justify-center">
                    {RenderIcon && <RenderIcon />}
                    <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Tech item details */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-red-500 tracking-wider">
                          {tech.category}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 uppercase">
                          {tech.badge}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-neutral-100 font-sans group-hover/card:text-red-400 transition-colors">
                        {tech.name}
                      </h3>

                      <p className="text-[11px] text-neutral-400 leading-relaxed font-light line-clamp-4">
                        {tech.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-900/80 text-[9px] text-neutral-500 font-mono flex justify-between items-center">
                      <span>VERIFIED STABLE</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Mini-Label Status */}
          <div className="absolute -top-6 right-2 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
            {isPaused || isInteracting ? "Focused / Paused" : "Endless Stream"}
          </div>
        </div>

        {/* Navigation & Control Hub */}
        <div className="flex items-center justify-end w-full pt-2">
          
          {/* Crimson Navigation Control Cluster */}
          <div className="flex items-center space-x-1.5 bg-neutral-950/80 p-1.5 rounded-xl border border-neutral-900/60 shadow-lg">
            
            {/* Rewind (Skip -2) */}
            <button 
              onClick={() => shiftTrack(-2)}
              className="p-2 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90"
              title="Skip back 2"
            >
              <Icons.rewind className="w-4 h-4" />
            </button>

            {/* Step Left */}
            <button 
              onClick={() => shiftTrack(-1)}
              className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90"
              title="Prev Technical Card"
            >
              <Icons.arrowLeft className="w-4 h-4" />
            </button>

            <span className="h-4 w-[1px] bg-neutral-900" />

            {/* Step Right */}
            <button 
              onClick={() => shiftTrack(1)}
              className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90"
              title="Next Technical Card"
            >
              <Icons.arrowRight className="w-4 h-4" />
            </button>

            {/* Fast Forward (Skip +2) */}
            <button 
              onClick={() => shiftTrack(2)}
              className="p-2 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90"
              title="Skip forward 2"
            >
              <Icons.fastForward className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}