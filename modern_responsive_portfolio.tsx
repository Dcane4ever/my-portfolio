import React, { useState, useEffect, useRef, useMemo } from 'react';

const Icons = {
  java: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.1-7.843-.218" />
    </svg>
  ),
  laravel: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
  terminal: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  arrowDown: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  settings: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  close: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  chevronLeft: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  ),
  chevronRight: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  volumeUp: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
  ),
  volumeOff: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72z" />
    </svg>
  ),
  cpu: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M9 16.5v1.5M15 3v1.5M15.75 16.5v1.5M3 8.25h1.5M3 15H4.5M16.5 8.25H18M16.5 15H18M6 6h12v12H6V6z" />
    </svg>
  ),
  database: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  chat: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 18l-.958.479a.75.75 0 01-1.006-.875l.315-1.579A5.969 5.969 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  phone: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.506-5.194-3.874-6.7-6.7l1.293-.97c.362-.271.528-.732.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
};

const PRESET_THEMES = {
  crimsonCyber: {
    id: "crimsonCyber",
    name: "Crimson Abyss",
    bg: "bg-neutral-950",
    text: "text-stone-100",
    accent: "from-red-600 via-rose-500 to-red-800",
    accentRaw: "#ef4444",
    accentSecondary: "text-red-500",
    border: "border-red-950/40",
    cardBg: "bg-red-950/5",
    tagBg: "bg-red-950/20 text-red-400 border border-red-500/10",
    glowColor: "rgba(239, 68, 68, 0.15)",
    glowColorRaw: "239, 68, 68"
  },
  sapphireAbyss: {
    id: "sapphireAbyss",
    name: "Deep Sapphire",
    bg: "bg-slate-950",
    text: "text-slate-100",
    accent: "from-blue-600 via-indigo-500 to-cyan-400",
    accentRaw: "#3b82f6",
    accentSecondary: "text-blue-400",
    border: "border-blue-950/40",
    cardBg: "bg-blue-950/5",
    tagBg: "bg-blue-950/20 text-blue-400 border border-blue-500/10",
    glowColor: "rgba(59, 130, 246, 0.15)",
    glowColorRaw: "59, 130, 246"
  }
};

const playSynthSound = (type, volumeOn) => {
  if (!volumeOn) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.12);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'api') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(500, ctx.currentTime + 0.04);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.18);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.15); // G5
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (error) {
    console.warn("Audio Context blocked.", error);
  }
};

function GlitchText({ text, active = true, speed = 45 }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%-+*/";

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, active, speed]);

  return <span className="font-mono">{displayText}</span>;
}

function useHoverTilt() {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const rotX = -(y / (box.height / 2)) * 6; // degrees max rotation
    const rotY = (x / (box.width / 2)) * 6;

    setStyle({
      transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  const onMouseLeave = () => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  return { ref, style, onMouseMove, onMouseLeave };
}

function TiltCard({ children, className = "" }) {
  const { ref, style, onMouseMove, onMouseLeave } = useHoverTilt();
  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transform-gpu ${className}`}
    >
      {children}
    </div>
  );
}

function HyperSpaceBackground({ theme, density = 45 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(100, density * 1.4);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.8,
      origR: Math.random() * 1.8 + 0.8
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (let i = 0; i < 15; i++) {
        sparksRef.current.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5 - 1.5,
          alpha: 1,
          size: Math.random() * 2 + 1,
          color: theme.accentRaw
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleCanvasClick);

    let gridOffset = 0;

    const render = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      // 1. Perspective Grid Floor in bottom 35% of page space
      ctx.strokeStyle = `${theme.accentRaw}10`;
      ctx.lineWidth = 1;
      gridOffset = (gridOffset + 0.5) % 40;
      const floorY = height * 0.65;
      
      for (let y = floorY; y < height; y += 18) {
        const scale = (y - floorY) / (height - floorY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(${theme.glowColorRaw}, ${0.02 + scale * 0.12})`;
        ctx.stroke();
      }

      const vanishingX = width / 2;
      const colSpacing = 60;
      for (let x = -colSpacing * 15; x < width + colSpacing * 15; x += colSpacing) {
        ctx.beginPath();
        ctx.moveTo(vanishingX, floorY);
        ctx.lineTo(x + gridOffset * 2.5, height);
        ctx.strokeStyle = `rgba(${theme.glowColorRaw}, 0.03)`;
        ctx.stroke();
      }

      // 2. Render particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x -= dx * force * 0.01;
            p.y -= dy * force * 0.01;
          }
        }

        ctx.fillStyle = `rgba(${theme.glowColorRaw}, 0.2)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Link nearby particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dist = Math.hypot(pi.x - pj.x, pi.y - pj.y);
          if (dist < 80) {
            const alpha = (80 - dist) / 80 * 0.1;
            ctx.strokeStyle = `rgba(${theme.glowColorRaw}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // 3. Click spark system
      sparksRef.current.forEach((s, idx) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06;
        s.alpha -= 0.02;

        if (s.alpha <= 0) {
          sparksRef.current.splice(idx, 1);
          return;
        }

        ctx.fillStyle = `rgba(${theme.glowColorRaw}, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Glow Locator
      if (mouse.active) {
        ctx.strokeStyle = `rgba(${theme.glowColorRaw}, 0.12)`;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleCanvasClick);
    };
  }, [theme, density]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function useIntersectionObserver() {
  const [elements, setElements] = useState([]);
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const currentObserver = observer.current;
    if (currentObserver) {
      currentObserver.disconnect();
      elements.forEach(el => {
        if (el) currentObserver.observe(el);
      });
    }
  }, [elements]);

  return [setElements, entries];
}

export default function App() {
  const [activeTheme, setActiveTheme] = useState(PRESET_THEMES.crimsonCyber);
  const [particleDensity, setParticleDensity] = useState(45);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("all");
  const [volumeOn, setVolumeOn] = useState(true);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Vincent's Custom Live Simulation Variables
  const [chatQueue, setChatQueue] = useState([
    { id: 1, sender: "Student_104", msg: "Enquiry about EAC Manila BSIT curriculum changes", state: "Routed" },
    { id: 2, sender: "Staff_Member", msg: "Update room assignment for OJT briefing logs", state: "Processing" }
  ]);
  const [chatLog, setChatLog] = useState([
    "INFO: Student gateway established via Spring Security WSS",
    "DEBUG: Auto-assigned incoming websocket thread -> Pool-A",
  ]);
  const [dtrRecords, setDtrRecords] = useState([
    { employee: "Supervisor (V. Pimentel)", stamp: "08:00 AM", status: "Checked In" },
    { employee: "Technical Support Staff A", stamp: "08:14 AM", status: "Checked In" },
    { employee: "Intern (EAC OJT Team)", stamp: "05:00 PM", status: "Checked Out" }
  ]);

  const [activeArchNode, setActiveArchNode] = useState(null);
  const [simMetrics, setSimMetrics] = useState({ ping: "8ms", fps: 60 });
  const [apiCommand, setApiCommand] = useState("GET /api/v1/system/status");
  const [apiTerminalOutput, setApiTerminalOutput] = useState({
    status: 200,
    elapsed: "2.1ms",
    payload: {
      owner: "Vincent Gabrielle Pimentel",
      institution: "Emilio Aguinaldo College Manila",
      graduating: "July 2026",
      ready: true,
      message: "Ready to audit. Click any flow schematic or playground widget."
    }
  });

  const [devConfig, setDevConfig] = useState({
    name: "Vincent Gabrielle Pimentel",
    headline: "Engineering clean, user-first full-stack enterprise code.",
    role: "Full-Stack Java & Web Developer",
    bio: "BSIT graduate (July 2026) with deep practical experience architecture mapping Spring Boot web gateways, real-time chat socket routing, and supervisor daily workflows. Synthesizing support-focused customer perspectives into resilient backend designs.",
    email: "vincentgabriellepimentel@gmail.com",
    phone: "09273537500",
    location: "Manila, Philippines",
    githubPortfolio: "dcane4ever.github.io/my-portfolio"
  });

  const [setObservedElements, entries] = useIntersectionObserver();
  const observerElementsRef = useRef({});
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const elementsToObserve = Object.values(observerElementsRef.current);
    setObservedElements(elementsToObserve);
  }, [setObservedElements]);

  useEffect(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setVisibleSections(prev => ({
          ...prev,
          [entry.target.id]: true
        }));
      }
    });
  }, [entries]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimMetrics({
        ping: `${Math.floor(Math.random() * 4 + 6)}ms`,
        fps: Math.floor(Math.random() * 3 + 58)
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    playSynthSound('click', volumeOn);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Vincent's Real Projects from Resume
  const projects = [
    {
      id: 1,
      title: "Real-Time Student Support Routing Engine",
      category: "java",
      desc: "Robust customer service messaging application for academic campuses, integrating interactive dual text/voice channels with Spring WebSockets.",
      tech: ["Spring Boot", "Java 17", "WebSockets", "HTML/CSS/JS"],
      stats: "WebSocket Handshake < 12ms",
      filePath: "src/main/java/com/eac/support/chat/ChatWebSocketHandler.java",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "DTR Supervisor & Workflow System",
      category: "java",
      desc: "Comprehensive Daily Time Record workspace tracker engineered to automate clock compliance auditing and real-time supervisor logging pipelines.",
      tech: ["Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
      stats: "0 Database Write Latency",
      filePath: "src/main/java/com/dtr/manager/controller/DTRController.java",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Streamlined Service Scheduler & Tracking Hub",
      category: "java",
      desc: "Automated business scheduling application managing day-to-day work tasks, technician allocations, and dynamic appointment updates.",
      tech: ["Java SE", "Spring Framework", "SQLite", "Tailwind CSS"],
      stats: "99% Job Completion Accuracy",
      filePath: "src/main/java/com/carwash/scheduler/SchedulerService.java",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Pearl Manila Hotel Booking UX Mockup",
      category: "design",
      desc: "Comprehensive interactive booking prototype highlighting high-fidelity room reservation funnels built during OJT immersion.",
      tech: ["HTML5", "CSS3 Animation", "JS Engine", "Bootstrap UX"],
      stats: "Optimized conversion paths",
      filePath: "pearl-manila/OJT/booking-system/index.html",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return projects;
    return projects.filter(p => p.category === projectFilter);
  }, [projectFilter, projects]);

  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    setCarouselIndex(0);
  }, [projectFilter]);

  const handlePrevSlide = () => {
    playSynthSound('click', volumeOn);
    setCarouselIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    playSynthSound('click', volumeOn);
    setCarouselIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  // Live Sandbox interactions
  const triggerNewChat = () => {
    playSynthSound('api', volumeOn);
    const newId = Date.now().toString().slice(-3);
    const studentId = `Student_${newId}`;
    setChatQueue(prev => [
      ...prev,
      { id: Date.now(), sender: studentId, msg: "Triggered chat query via portfolio", state: "Routed" }
    ]);
    setChatLog(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] RECEIVED handshake connection from ${studentId}`,
      `[${new Date().toLocaleTimeString()}] SYSTEM success auto-balanced socket thread to Pool-B`
    ]);
    playSynthSound('success', volumeOn);
  };

  const registerDTRPunch = (status) => {
    playSynthSound('api', volumeOn);
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const record = {
      employee: "Guest Audit Session",
      stamp: timeNow,
      status: status
    };
    setDtrRecords(prev => [record, ...prev.slice(0, 2)]);
    
    setApiCommand(`POST /api/v1/dtr/register?type=${status}`);
    setApiTerminalOutput({
      status: 201,
      elapsed: "3.5ms",
      payload: {
        recordId: Math.floor(Math.random() * 90000 + 10000),
        status: "RECORD_CREATED",
        payload: {
          timestamp: timeNow,
          event: status,
          verifiedIP: "127.0.0.1",
          mappedDatabase: "MySQL 8.0 Persistence Instance"
        }
      }
    });
    playSynthSound('success', volumeOn);
  };

  const simulateArchRouting = (node) => {
    playSynthSound('click', volumeOn);
    setActiveArchNode(node);
    
    if (node === 'frontend') {
      setApiCommand("GET /api/v1/client/assets");
      setApiTerminalOutput({
        status: 200,
        elapsed: "1.2ms",
        payload: {
          view: "Thymeleaf, HTML5 & Modern JS Bundle",
          cssArchitecture: "Bootstrap 5 Responsive Grid",
          rendering: "Optimized Client Viewport Resolution"
        }
      });
    } else if (node === 'springboot') {
      setApiCommand("GET /api/v1/actuator/health");
      setApiTerminalOutput({
        status: 200,
        elapsed: "4.1ms",
        payload: {
          javaVersion: "Java 17 (LTS Framework Standard)",
          springBootVersion: "3.2.x Enterprise",
          garbageCollection: "Shenandoah GC Active Threading",
          webfluxGateway: "Non-blocking WebSockets Channel Active"
        }
      });
    } else if (node === 'laravel') {
      setApiCommand("GET /api/v1/laravel/routes/system");
      setApiTerminalOutput({
        status: 200,
        elapsed: "3.2ms",
        payload: {
          framework: "Laravel 11 Decoupled Framework",
          eloquentModel: "Active Sync with Schema tables",
          redisQueues: "Active (Laravel Horizon Process Queue Balancer)"
        }
      });
    } else if (node === 'db') {
      setApiCommand("SHOW TABLES;");
      setApiTerminalOutput({
        status: 200,
        elapsed: "5.5ms",
        payload: {
          primaryDatabase: "MySQL 8.0 Production Standard",
          localBackup: "SQLite Inline Sync",
          tables: ["users", "daily_time_records", "chat_conversations", "bookings_audit_trail"]
        }
      });
    }
  };

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} font-sans antialiased transition-colors duration-1000 relative overflow-x-hidden selection:bg-red-600 selection:text-white`}>
      
      <style>{`
        .smooth-slide {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-1 { animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal-2 { animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .reveal-3 { animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          height: 3px;
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.4);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${activeTheme.accentRaw}33;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${activeTheme.accentRaw};
        }
      `}</style>

      {/* Cybernetic Dynamic Background Overlay */}
      <div className="absolute inset-0 w-full h-[100vh] overflow-hidden pointer-events-none z-0">
        <HyperSpaceBackground theme={activeTheme} density={particleDensity} />
        <div 
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, ${activeTheme.glowColor} 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Persistent Animated Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-neutral-950/40 backdrop-blur-md border-b border-neutral-900/40 px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${activeTheme.accent} p-[1px] transition-transform duration-500 hover:rotate-180`}>
              <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center font-black text-[10px] text-white">
                V
              </div>
            </div>
            <span className="text-[10px] font-mono tracking-tight text-neutral-300">
              <GlitchText text="vpimentel.dev" speed={50} />
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 text-[9px] font-mono text-neutral-500 border-l border-neutral-900 pl-6">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>BSIT ENGINEER</span>
            </div>
            <div>
              <span>PING: </span>
              <span className="text-neutral-300">{simMetrics.ping}</span>
            </div>
            <div>
              <span>FPS: </span>
              <span className="text-neutral-300">{simMetrics.fps}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setVolumeOn(!volumeOn)}
              className="p-1.5 rounded-full hover:bg-neutral-900/40 text-neutral-400 hover:text-white transition-colors"
              title={volumeOn ? "Mute Synthetic Audio" : "Unmute Synthetic Audio"}
            >
              {volumeOn ? <Icons.volumeUp className="w-4 h-4 text-red-500" /> : <Icons.volumeOff className="w-4 h-4 text-neutral-600" />}
            </button>

            <button 
              onClick={() => {
                playSynthSound('click', volumeOn);
                setIsPanelOpen(true);
              }}
              onMouseEnter={() => playSynthSound('hover', volumeOn)}
              className="flex items-center space-x-1 bg-neutral-900/30 border border-neutral-800 hover:border-red-500/25 px-3 py-1.5 rounded-full text-[9px] font-mono text-neutral-300 cursor-pointer transition-all duration-300"
            >
              <Icons.settings className="w-3 h-3 text-neutral-400 animate-[spin_12s_linear_infinite]" />
              <span>Edit Variables</span>
            </button>
          </div>
        </div>
      </header>

      {/* Section 1: Hero Frame */}
      <section 
        id="home" 
        className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto relative z-10 pt-20"
      >
        <div className="max-w-4xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-950/20 border border-red-900/30 rounded-full text-[9px] font-mono text-red-400 reveal-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <GlitchText text="EAC MANILA GRADUATE | BSIT JULY 2026" active={true} speed={50} />
          </div>

          <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white leading-none reveal-2">
            {devConfig.headline} <br/>
            <span className={`bg-gradient-to-r ${activeTheme.accent} bg-clip-text text-transparent`}>
              {devConfig.role}
            </span>
          </h1>

          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-2xl reveal-3">
            {devConfig.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 reveal-3">
            <button 
              onClick={() => scrollToSection("playground")} 
              onMouseEnter={() => playSynthSound('hover', volumeOn)}
              className={`px-5 py-3 bg-gradient-to-r ${activeTheme.accent} text-white text-[10px] font-mono rounded-full cursor-pointer hover:shadow-[0_4px_20px_rgba(239,68,68,0.25)] transition-all duration-300 active:scale-95`}
            >
              Access System Playground →
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              onMouseEnter={() => playSynthSound('hover', volumeOn)}
              className="px-5 py-3 bg-neutral-900/40 border border-neutral-800 hover:border-red-950 text-neutral-200 text-[10px] font-mono rounded-full transition-all duration-300 cursor-pointer hover:text-white"
            >
              Verify Code Projects
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-30 hover:opacity-100 transition-opacity" onClick={() => scrollToSection("architecture")}>
          <span className="text-[8px] font-mono text-neutral-500 mb-1 tracking-widest">MAP SCHEMATIC</span>
          <Icons.arrowDown className="w-3.5 h-3.5 text-neutral-500 animate-bounce" />
        </div>
      </section>

      {/* Section 2: Architecture Visualizer (Clean, no AI Twin) */}
      <section 
        id="architecture"
        ref={el => observerElementsRef.current['architecture'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-800 ease-out transform ${visibleSections['architecture'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">SYSTEM ARCHITECTURE</span>
            <h2 className="text-2xl font-black text-white">Full-Stack Route Map</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              This interactive blueprint models the typical client-to-server lifecycle used in my core applications, including Java-managed thread balancing, Laravel services, and database persistence.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              <strong>Click any schematic hub node</strong> on the right to simulate route verification protocols and watch live telemetry trace payloads update in real-time.
            </p>
          </div>

          <div className="lg:col-span-8 bg-neutral-950/50 border border-neutral-900 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-3 left-4 text-[9px] font-mono text-neutral-600">system_architecture_schema.json</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-8 relative">
              <div className="absolute inset-0 pointer-events-none hidden sm:block">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 90,60 L 220,60 M 320,60 L 480,60" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 230,120 L 400,120" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Node 1: Client Front-end Layout */}
              <TiltCard>
                <div 
                  onClick={() => simulateArchRouting('frontend')}
                  className={`p-4 rounded-xl border h-full transition-all duration-300 cursor-pointer ${activeArchNode === 'frontend' ? 'bg-indigo-950/20 border-indigo-500/60 shadow-[0_0_12px_rgba(99,102,241,0.15)]' : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'}`}
                >
                  <div className="text-[9px] font-mono text-indigo-400 mb-1">FRONT-END VIEWS</div>
                  <h4 className="text-xs font-bold text-white">HTML5 / Bootstrap</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">Responsive DOM presentation frameworks, Thymeleaf templates, state triggers.</p>
                </div>
              </TiltCard>

              {/* Node 2: Java Spring Boot Ecosystem */}
              <TiltCard>
                <div 
                  onClick={() => simulateArchRouting('springboot')}
                  className={`p-4 rounded-xl border h-full transition-all duration-300 cursor-pointer ${activeArchNode === 'springboot' ? 'bg-red-950/20 border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.15)]' : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'}`}
                >
                  <div className="text-[9px] font-mono text-red-400 mb-1">ENTERPRISE ROOT</div>
                  <h4 className="text-xs font-bold text-white">Spring Boot Core</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">Java controllers, socket listeners, workflow business services.</p>
                </div>
              </TiltCard>

              {/* Node 3: Laravel Platform Core */}
              <TiltCard>
                <div 
                  onClick={() => simulateArchRouting('laravel')}
                  className={`p-4 rounded-xl border h-full transition-all duration-300 cursor-pointer ${activeArchNode === 'laravel' ? 'bg-emerald-950/20 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.15)]' : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'}`}
                >
                  <div className="text-[9px] font-mono text-emerald-400 mb-1">ELEGANT SERVICES</div>
                  <h4 className="text-xs font-bold text-white">Laravel Engine</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">Asynchronous dispatch systems, clean MVC blade models, secure routing.</p>
                </div>
              </TiltCard>

              {/* Node 4: Database Storage Engine */}
              <TiltCard>
                <div 
                  onClick={() => simulateArchRouting('db')}
                  className={`p-4 rounded-xl border h-full transition-all duration-300 cursor-pointer ${activeArchNode === 'db' ? 'bg-amber-950/20 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]' : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'}`}
                >
                  <div className="text-[9px] font-mono text-amber-400 mb-1">DATA LAYER</div>
                  <h4 className="text-xs font-bold text-white">MySQL & SQLite</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">Audit logs, schema migrations, table indexes, high performance read/write queries.</p>
                </div>
              </TiltCard>
            </div>

            {/* Interactive Live API Response Terminal Output */}
            <div className="bg-stone-950 rounded-xl border border-neutral-900 p-4 font-mono text-[10px] mt-2 shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-900 mb-3 text-neutral-500">
                <span>API TELEMETRY TRACER</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-red-950/20 text-red-400 font-bold">SYSTEM ACTIVE</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300 mb-2">
                <span className="text-red-500 font-extrabold">$</span>
                <span className="text-emerald-400">{apiCommand}</span>
              </div>
              <div className="space-y-1.5 text-neutral-400">
                <div><span className="text-neutral-500">HTTP Status:</span> <span className="text-emerald-400">{apiTerminalOutput.status} ACCEPTED</span></div>
                <div><span className="text-neutral-500">Response Speed:</span> <span className="text-amber-500">{apiTerminalOutput.elapsed}</span></div>
                <div>
                  <span className="text-neutral-500 block mb-1">Response JSON Payload:</span>
                  <pre className="bg-neutral-900/40 p-2.5 rounded text-indigo-300 overflow-x-auto whitespace-pre custom-scrollbar text-[9px]">
                    {JSON.stringify(apiTerminalOutput.payload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Specialized Playable Sandboxes based on Real Resume Projects */}
      <section 
        id="playground"
        ref={el => observerElementsRef.current['playground'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-800 ease-out transform ${visibleSections['playground'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 bg-neutral-950/50 border border-neutral-900 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-3 left-4 text-[9px] font-mono text-neutral-600">projects_sandbox_runtime.log</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              
              {/* Playable School Support Chat Sandbox */}
              <TiltCard className="h-full">
                <div className="bg-stone-950 rounded-xl border border-neutral-900 p-4 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-900">
                      <div className="flex items-center space-x-2">
                        <Icons.chat className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-white">WebSocket Routing Hub</span>
                      </div>
                      <span className="text-[8px] font-mono text-emerald-400">ONLINE</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[8px] font-mono text-neutral-500 block">CONNECTED AGENTS QUEUE</span>
                      <div className="max-h-[80px] overflow-y-auto space-y-1.5 custom-scrollbar">
                        {chatQueue.map((c) => (
                          <div key={c.id} className="flex justify-between items-center text-[9px] font-mono bg-neutral-900/50 p-1.5 rounded border border-neutral-900">
                            <span className="text-neutral-300 font-bold">{c.sender}</span>
                            <span className="text-neutral-500 truncate max-w-[120px]">{c.msg}</span>
                            <span className="text-[7px] text-red-400 bg-red-950/30 px-1 rounded">{c.state}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button 
                      onClick={triggerNewChat}
                      className="w-full text-[9px] font-mono bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 py-2 rounded transition-all cursor-pointer font-bold"
                    >
                      + Fire Student WebSocket Handshake
                    </button>
                  </div>
                </div>
              </TiltCard>

              {/* Playable DTR Management System Sandbox */}
              <TiltCard className="h-full">
                <div className="bg-stone-950 rounded-xl border border-neutral-900 p-4 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-900">
                      <div className="flex items-center space-x-2">
                        <Icons.cpu className="w-4 h-4 text-red-500" />
                        <span className="text-[10px] font-mono text-white">DTR Logging System</span>
                      </div>
                      <span className="text-[8px] font-mono text-red-400">MySQL Linked</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[8px] font-mono text-neutral-500 block">LATEST CLOCK METRICS</span>
                      <div className="max-h-[85px] overflow-y-auto space-y-1.5 custom-scrollbar">
                        {dtrRecords.map((r, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[9px] font-mono bg-neutral-900/50 p-1.5 rounded border border-neutral-900">
                            <span className="text-neutral-300 font-bold">{r.employee}</span>
                            <span className="text-neutral-500">{r.stamp}</span>
                            <span className="text-[7px] text-emerald-400 bg-emerald-950/30 px-1 rounded font-bold">{r.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => registerDTRPunch("CLOCK_IN")}
                      className="flex-1 text-[9px] font-mono bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 hover:text-red-300 py-2 rounded transition-all cursor-pointer font-bold"
                    >
                      Clock In
                    </button>
                    <button 
                      onClick={() => registerDTRPunch("CLOCK_OUT")}
                      className="flex-1 text-[9px] font-mono bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 py-2 rounded transition-all cursor-pointer"
                    >
                      Clock Out
                    </button>
                  </div>
                </div>
              </TiltCard>

            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">INTERACTIVE PLATFORMS</span>
            <h2 className="text-2xl font-black text-white">Live Project Sandboxes</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              This sandbox isolates core elements from my actual developer resume portfolio:
            </p>
            <ul className="space-y-2 text-xs text-neutral-400 font-light list-disc pl-4">
              <li>
                <strong>CAMPUS SYSTEM WEB-SOCKET ROUTER:</strong> Instantly dispatch simulated live help requests, balancing incoming chat workloads.
              </li>
              <li>
                <strong>SUPERVISOR DAILY WORKFLOW AUDITOR:</strong> Toggle check-in compliance logs and stream formatted payloads back directly to the local relational repository.
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Section 4: Work Experience & Customer Resolution Hybrid Matrix */}
      <section 
        id="experience"
        ref={el => observerElementsRef.current['experience'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-800 ease-out transform ${visibleSections['experience'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">ENGINEERING TIMELINE</span>
            <h2 className="text-2xl font-black text-white">Professional Experience</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Bridging robust full-stack software development skills with a strong professional customer resolution and tech support background. 
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              This support-centric background ensures a user-first mindset, translating complex functional user requests directly into clean, self-documenting code.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            
            {/* Experience Card 1: Qualfon */}
            <div className="bg-neutral-900/20 border border-neutral-900 rounded-xl p-5 relative overflow-hidden">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                <div>
                  <span className="text-[9px] font-mono text-red-400 bg-red-950/20 px-2 py-0.5 rounded">QUALFON</span>
                  <h4 className="text-sm font-bold text-white mt-1">Customer Resolution Representative</h4>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">June 2023 - August 2024</span>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Resolved complex user escalations, coordinate with departments to optimize workflow systems, and designed efficient software troubleshooting strategies.
              </p>
            </div>

            {/* Experience Card 2: Alorica */}
            <div className="bg-neutral-900/20 border border-neutral-900 rounded-xl p-5 relative overflow-hidden">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                <div>
                  <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/20 px-2 py-0.5 rounded">ALORICA</span>
                  <h4 className="text-sm font-bold text-white mt-1">Technical Support Agent</h4>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Oct 2020 - Feb 2021</span>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Applied systematic diagnostics to resolve technical software and hardware bottlenecks, reducing recurring support issues.
              </p>
            </div>

            {/* Experience Card 3: Concentrix */}
            <div className="bg-neutral-900/20 border border-neutral-900 rounded-xl p-5 relative overflow-hidden">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                <div>
                  <span className="text-[9px] font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded">CONCENTRIX</span>
                  <h4 className="text-sm font-bold text-white mt-1">Customer Service Representative</h4>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Oct 2019 - June 2020</span>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Managed high-volume service queues with a strong customer-success focus, laying the foundations for user-first UX/UI architecture.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Section 5: Projects Carousel with Images */}
      <section 
        id="projects"
        ref={el => observerElementsRef.current['projects'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-800 ease-out transform ${visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block mb-1 font-extrabold">PORTFOLIO DEPLOYMENTS</span>
            <h2 className="text-2xl font-black text-white">Engineered Systems Portfolio</h2>
          </div>

          <div className="flex space-x-1.5 mt-4 md:mt-0 bg-neutral-950 p-1 rounded-full border border-neutral-900 w-fit">
            {["all", "java", "design"].map((filter) => (
              <button
                key={filter}
                onClick={() => { 
                  playSynthSound('click', volumeOn); 
                  setProjectFilter(filter); 
                }}
                className={`px-4 py-1 text-[9px] font-mono rounded-full transition-all duration-300 capitalize cursor-pointer ${projectFilter === filter ? 'bg-red-950/40 text-red-400 font-semibold border border-red-500/20' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                {filter === "all" ? "Show All" : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Project Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex smooth-slide"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {filteredProjects.map((p) => (
                <div key={p.id} className="w-full flex-shrink-0 px-1 md:px-2">
                  <div className="rounded-2xl border border-neutral-900 bg-neutral-950 overflow-hidden shadow-2xl">
                    
                    {/* Mock IDE Header UI */}
                    <div className="bg-neutral-950/90 border-b border-neutral-900 px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="text-[9px] font-mono text-neutral-500 pl-4">{p.filePath}</span>
                      </div>
                      <div className="flex items-center space-x-1 font-mono text-[8px] text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        <span>Integration Active</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      
                      {/* Left Side Details */}
                      <div className="lg:col-span-7 p-6 md:p-8 space-y-5 flex flex-col justify-between border-r border-neutral-900 bg-stone-950/30">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-mono uppercase bg-red-950/20 text-red-400 px-2.5 py-0.5 rounded-full border border-red-500/10">
                              {p.category}
                            </span>
                            <span className="text-[9px] font-mono text-red-400">{p.stats}</span>
                          </div>

                          <h3 className="text-md md:text-lg font-black text-white hover:text-red-400 transition-colors duration-300">
                            {p.title}
                          </h3>
                          <p className="text-[11px] md:text-xs text-neutral-400 font-light leading-relaxed">
                            {p.desc}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {p.tech.map((t, idx) => (
                              <span key={idx} className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full ${activeTheme.tagBg}`}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-neutral-900/60 flex items-center justify-between">
                          <button 
                            onClick={() => {
                              playSynthSound('api', volumeOn);
                              setApiCommand(`GET /api/v1/projects/${p.id}`);
                              setApiTerminalOutput({
                                status: 200,
                                elapsed: "2.1ms",
                                payload: {
                                  projectId: p.id,
                                  title: p.title,
                                  verifiedController: p.filePath,
                                  category: p.category,
                                  environment: "EAC_PROD_READY"
                                }
                              });
                              scrollToSection("architecture");
                            }}
                            className="text-[9px] font-mono text-red-400 bg-red-950/20 border border-red-900/30 px-3 py-1 rounded hover:bg-red-950/50 transition-colors cursor-pointer"
                          >
                            Trace Code Handshake
                          </button>
                          <span className="text-[9px] font-mono text-neutral-500">Verified Stable</span>
                        </div>
                      </div>

                      {/* Right Side Mockup Image Frame with zoom hover effect */}
                      <div className="lg:col-span-5 relative group/img aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-950/80 min-h-[200px] lg:min-h-0">
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-40" />
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-1">
            <div className="flex space-x-1.5 font-mono text-[9px] text-neutral-500">
              <span className="text-white font-semibold">{(carouselIndex + 1).toString().padStart(2, '0')}</span>
              <span>/</span>
              <span>{filteredProjects.length.toString().padStart(2, '0')}</span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handlePrevSlide}
                className="w-8 h-8 rounded-full border border-neutral-900 bg-neutral-950 hover:border-red-900/30 text-neutral-400 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md"
                aria-label="Previous Project"
              >
                <Icons.chevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-8 h-8 rounded-full border border-neutral-900 bg-neutral-950 hover:border-red-900/30 text-neutral-400 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md"
                aria-label="Next Project"
              >
                <Icons.chevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-1">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { playSynthSound('click', volumeOn); setCarouselIndex(idx); }}
                className={`h-1 rounded-full transition-all duration-300 ${idx === carouselIndex ? `w-6 bg-gradient-to-r ${activeTheme.accent}` : 'w-1 bg-neutral-800'}`}
                aria-label={`Show project page ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Section 6: Contact Gateway */}
      <section 
        id="contact"
        ref={el => observerElementsRef.current['contact'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-800 ease-out transform ${visibleSections['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">SECURE HANDSHAKE GATE</span>
            <h2 className="text-2xl font-black text-white">Initiate Project Collaboration</h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Equipped with deep database-driven web development foundations, WebSocket routing models, and practical responsive systems designs.
            </p>
            <div className="text-[10px] font-mono text-neutral-400 pt-2 space-y-2">
              <div>
                <span className="block text-neutral-500">DIRECT EMAIL:</span>
                <span className="text-red-400 hover:underline cursor-pointer font-bold">{devConfig.email}</span>
              </div>
              <div>
                <span className="block text-neutral-500">CONTACT REGISTRY:</span>
                <span className="text-red-400 font-bold">{devConfig.phone}</span>
              </div>
              <div>
                <span className="block text-neutral-500">CURRENT HOST:</span>
                <span className="text-neutral-300 font-bold">{devConfig.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-neutral-900/10 border border-neutral-900 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5 animate-bounce">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-white font-mono">CONNECTION ESTABLISHED (201)</h3>
                  <p className="text-xs text-neutral-400">Data packet transmitted. Responding timeline active.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); playSynthSound('api', volumeOn); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] uppercase font-extrabold text-neutral-500 tracking-wider mb-1.5 font-mono">Your Name / Agency</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Lead Engineer / Recruiter"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-stone-950 border border-neutral-900 focus:border-red-900 focus:outline-none rounded-xl p-3.5 text-xs text-white transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] uppercase font-extrabold text-neutral-500 tracking-wider mb-1.5 font-mono">Transmission Mail</label>
                      <input 
                        type="email" 
                        required
                        placeholder="colleague@agency.org"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-stone-950 border border-neutral-900 focus:border-red-900 focus:outline-none rounded-xl p-3.5 text-xs text-white transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase font-extrabold text-neutral-500 tracking-wider mb-1.5 font-mono">Message Blueprint Scope</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Outline target pipeline integrations, database requirements, or open roles..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-stone-950 border border-neutral-900 focus:border-red-900 focus:outline-none rounded-xl p-3.5 text-xs text-white transition-all duration-300"
                    />
                  </div>
                  <button 
                    type="submit"
                    className={`w-full bg-gradient-to-r ${activeTheme.accent} text-white font-bold py-3 px-4 rounded-xl text-[9px] font-mono tracking-wider uppercase transition-all duration-300 hover:shadow-[0_4px_20px_rgba(239,68,68,0.25)] cursor-pointer`}
                  >
                    Transmit Message Payload
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Slide Drawer: Real-time Config Panel */}
      {isPanelOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-stone-950 h-full border-l border-neutral-900 p-6 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-neutral-900">
                <div>
                  <h3 className="text-xs font-bold text-white font-mono">Ecosystem Variables</h3>
                  <span className="text-[9px] text-neutral-500">Edit and live reload current signature attributes</span>
                </div>
                <button 
                  onClick={() => setIsPanelOpen(false)}
                  className="p-1 rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Icons.close className="w-4 h-4" />
                </button>
              </div>

              {/* Theme Selector */}
              <div className="space-y-2">
                <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Accent Schemes</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.values(PRESET_THEMES).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => { playSynthSound('click', volumeOn); setActiveTheme(theme); }}
                      className={`px-2 py-1.5 text-center rounded-xl text-[9px] border cursor-pointer font-medium transition-all ${activeTheme.id === theme.id ? 'bg-neutral-900 border-red-500 text-white shadow-md' : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-neutral-200'}`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wave Density */}
              <div className="space-y-2">
                <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">3D Particle Coords</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="range" 
                    min={15} 
                    max={90} 
                    value={particleDensity}
                    onChange={(e) => setParticleDensity(Number(e.target.value))}
                    className="w-full accent-red-600"
                  />
                  <span className="text-xs font-mono text-white w-8">{particleDensity}</span>
                </div>
              </div>

              {/* Dynamic content updates */}
              <div className="space-y-3">
                <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Variable Registry</label>
                <div className="space-y-2.5">
                  <div>
                    <span className="text-[8px] font-mono text-neutral-600 block mb-1">Developer Signature</span>
                    <input 
                      type="text" 
                      value={devConfig.name}
                      onChange={(e) => setDevConfig({ ...devConfig, name: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-red-950"
                    />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-neutral-600 block mb-1">Headline String</span>
                    <input 
                      type="text" 
                      value={devConfig.headline}
                      onChange={(e) => setDevConfig({ ...devConfig, headline: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-red-950"
                    />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-neutral-600 block mb-1">Overview Block</span>
                    <textarea 
                      rows={3}
                      value={devConfig.bio}
                      onChange={(e) => setDevConfig({ ...devConfig, bio: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-red-950"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-900 space-y-1.5">
              <button 
                onClick={() => {
                  const blob = new Blob([JSON.stringify({ devConfig, activeTheme: activeTheme.id, particleDensity }, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `vpimentel-custom-engine.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full bg-white text-black font-semibold font-mono py-2.5 rounded-xl text-[10px] tracking-wider uppercase transition-all hover:bg-neutral-200 cursor-pointer text-center block"
              >
                Download Config JSON
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Minimalistic styled Footer */}
      <footer className="border-t border-neutral-900 bg-stone-950 py-8 px-6 text-[10px] text-neutral-500 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <p>© {new Date().getFullYear()} {devConfig.name}. Expected Graduation EAC Manila: July 2026.</p>
          </div>
          <div className="flex space-x-3 font-mono text-[9px]">
            <button onClick={() => scrollToSection("home")} className="hover:text-neutral-300 transition-colors cursor-pointer">Origin Root</button>
            <span className="text-neutral-800">|</span>
            <span className="text-neutral-600">Active Handshake Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  );
}