const { useEffect, useMemo, useRef, useState } = React;

const Icons = {
  java: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.1-7.843-.218" />
    </svg>
  ),
  code: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
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
  arrowUpRight: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
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
};

const PRESET_THEMES = {
  rubyAbyss: {
    id: "rubyAbyss",
    name: "Crimson Ruby",
    bg: "bg-stone-950",
    text: "text-stone-100",
    accent: "from-red-600 to-rose-500",
    accentRaw: "#dc2626",
    cardBg: "bg-red-950/5",
    tagBg: "bg-red-950/20 text-red-400 border border-red-500/10",
  },
  obsidianMint: {
    id: "obsidianMint",
    name: "Obsidian Mint",
    bg: "bg-neutral-950",
    text: "text-neutral-100",
    accent: "from-emerald-400 to-teal-300",
    accentRaw: "#34d399",
    cardBg: "bg-neutral-900/30",
    tagBg: "bg-emerald-950/25 text-emerald-400 border border-emerald-500/15",
  },
  slateIndigo: {
    id: "slateIndigo",
    name: "Slate Indigo",
    bg: "bg-slate-950",
    text: "text-slate-100",
    accent: "from-indigo-400 to-violet-300",
    accentRaw: "#818cf8",
    cardBg: "bg-slate-900/30",
    tagBg: "bg-indigo-950/25 text-indigo-400 border border-indigo-500/15",
  },
  amberWarmth: {
    id: "amberWarmth",
    name: "Stone Amber",
    bg: "bg-stone-950",
    text: "text-stone-100",
    accent: "from-amber-400 to-orange-300",
    accentRaw: "#fbbf24",
    cardBg: "bg-stone-900/30",
    tagBg: "bg-amber-950/25 text-amber-400 border border-amber-500/15",
  },
};

function InteractiveBackground({ theme, density = 42 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let particles = [];
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
      const maxParticles = Math.min(density, Math.max(18, Math.floor(width / 35)));
      particles = Array.from({ length: maxParticles }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: Math.random() * 1.2 + 0.8,
      }));
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${theme.accentRaw}33`;
        ctx.fill();

        const drawLink = (target, maxDistance, alpha) => {
          const dx = particle.x - target.x;
          const dy = particle.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > maxDistance) return;

          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `${theme.accentRaw}${Math.floor((1 - distance / maxDistance) * alpha).toString(16).padStart(2, "0")}`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        };

        drawLink(mouse, 180, 30);
        for (let i = index + 1; i < particles.length; i += 1) {
          drawLink(particles[i], 145, 12);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme, density]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />;
}

function useSectionReveal() {
  const [visibleSections, setVisibleSections] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisibleSections((previous) => ({ ...previous, [entry.target.id]: true }));
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    Object.values(refs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return { refs, visibleSections };
}

function App() {
  const activeTheme = PRESET_THEMES.rubyAbyss;
  const [particleDensity, setParticleDensity] = useState(42);
  const [projectFilter, setProjectFilter] = useState("all");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { refs, visibleSections } = useSectionReveal();

  const [devConfig, setDevConfig] = useState({
    name: "Vincent Gabrielle Pimentel",
    headline: "Practical systems. Clean interfaces.",
    role: "Full-stack developer specializing in Java Spring Boot & modern web apps",
    bio: "BSIT graduate building useful software with Java, Spring Boot, HTML/CSS/JS, PHP, Laravel, MySQL, SQLite, Python, and FastAPI. I like turning messy workflows into software people can actually use.",
    email: "vincentgabriellepimentel@gmail.com",
  });

  const projects = [
    {
      id: 1,
      title: "School Support System",
      category: "java",
      desc: "Customer-service web app for school support with real-time text and voice chat for students and staff.",
      tech: ["Spring Boot", "Java", "Chat", "Voice", "HTML/CSS/JS"],
      link: "https://github.com/Dcane4ever",
      image: "css/images/EAC3.png",
      imageAlt: "School Support System preview",
    },
    {
      id: 2,
      title: "DTR Management System",
      category: "java",
      desc: "Spring Boot DTR tracker designed to make supervisor workflows and time records easier to manage.",
      tech: ["Spring Boot", "Java", "DTR", "MySQL"],
      link: "https://github.com/Dcane4ever",
      image: "css/images/DTR3.png",
      imageAlt: "DTR Management System preview",
    },
    {
      id: 3,
      title: "Car Wash Management",
      category: "java",
      desc: "Scheduling and service tracking app for a local car wash, replacing a manual spreadsheet process.",
      tech: ["Spring Boot", "Java", "Scheduling", "Operations"],
      link: "https://github.com/Dcane4ever",
      image: "css/images/CAR3.png",
      imageAlt: "Car Wash Management preview",
    },
    {
      id: 4,
      title: "Hotel Booking System",
      category: "ui",
      desc: "Booking flow prototype for The Pearl Manila with room selection, availability, and reservation handling.",
      tech: ["Prototype", "Booking", "UI", "OJT"],
      link: "https://github.com/Dcane4ever",
      image: "css/images/PRL1.png",
      imageAlt: "Hotel Booking System preview",
    },
  ];

  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return projects;
    return projects.filter((project) => project.category === projectFilter);
  }, [projectFilter]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExportConfig = () => {
    const blob = new Blob(
      [JSON.stringify({ developer: devConfig, theme: activeTheme.id, density: particleDensity }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vincent-portfolio-config.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nProject scope:\n${formState.message}`
    );
    window.location.href = `mailto:${devConfig.email}?subject=${subject}&body=${body}`;
  };

  const sectionClass = (id) =>
    `py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/50 transition-all duration-1000 ease-out transform ${
      visibleSections[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} font-sans antialiased transition-colors duration-1000 relative overflow-x-hidden`}>
      <div className="absolute inset-0 h-screen w-full overflow-hidden pointer-events-none z-0 opacity-50">
        <InteractiveBackground theme={activeTheme} density={particleDensity} />
      </div>

      <header className="fixed top-0 left-0 w-full z-50 bg-neutral-950/35 backdrop-blur-md border-b border-white/[0.03] px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <span className={`w-7 h-7 rounded bg-gradient-to-tr ${activeTheme.accent} p-[1px]`}>
              <span className="w-full h-full bg-black rounded-[3px] flex items-center justify-center font-bold text-xs text-white">
                VG
              </span>
            </span>
            <span className="text-xs font-mono font-medium tracking-tight text-neutral-300">vincent.dev</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-mono text-neutral-400">
            <button onClick={() => scrollToSection("specialty")} className="hover:text-white transition-colors">/specialties</button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors">/work</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">/connect</button>
          </nav>

        </div>
      </header>

      <section id="home" className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto relative z-10 pt-16">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-neutral-900/45 border border-neutral-800/60 rounded-full text-[10px] font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Open to opportunities · Metro Manila, PH</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {devConfig.headline}
            <br />
            <span className={`bg-gradient-to-r ${activeTheme.accent} bg-clip-text text-transparent`}>
              {devConfig.role}
            </span>
          </h1>

          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-2xl">
            {devConfig.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => scrollToSection("projects")}
              className={`px-5 py-2.5 bg-gradient-to-r ${activeTheme.accent} text-black text-xs font-semibold rounded cursor-pointer hover:opacity-90 transition-all shadow-md`}
            >
              View my work
            </button>
            <button
              onClick={() => scrollToSection("specialty")}
              className="px-5 py-2.5 bg-neutral-900/45 border border-neutral-800/70 hover:border-neutral-700 text-neutral-200 text-xs font-medium rounded transition-all cursor-pointer"
            >
              Analyze stack
            </button>
          </div>
        </div>

        <button
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
          onClick={() => scrollToSection("specialty")}
        >
          <span className="text-[10px] font-mono text-neutral-400 mb-2">SCROLL DOWN</span>
          <Icons.arrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </section>

      <section id="specialty" ref={(el) => (refs.current.specialty = el)} className={sectionClass("specialty")}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">SPECIALTY ENGINE</span>
            <h2 className="text-2xl font-bold text-white">Focused Backend Architecture</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Building reliable service flows, database-backed tools, and interfaces that keep real work moving.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Icons.java,
                title: "Java Spring Boot",
                label: "Primary backend",
                points: ["Controller-service-repository structure", "MySQL and SQLite workflows", "Admin dashboards and record management"],
              },
              {
                icon: Icons.code,
                title: "Laravel & Web UI",
                label: "Practical web systems",
                points: ["CRUD systems and booking flows", "Clean validation and forms", "HTML/CSS/JS interfaces"],
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={`p-6 rounded-lg ${activeTheme.cardBg} border border-neutral-900 hover:border-neutral-800 transition-all group`}>
                  <div className="flex items-center space-x-2.5 mb-4">
                    <div className="w-8 h-8 rounded bg-neutral-950 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <span className="text-[9px] font-mono text-neutral-500">{item.label}</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" ref={(el) => (refs.current.projects = el)} className={sectionClass("projects")}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">SELECTED REPOSITORIES</span>
            <h2 className="text-2xl font-bold text-white">Active Deployments</h2>
          </div>

          <div className="flex space-x-1.5 mt-4 md:mt-0 bg-neutral-950 p-1 rounded border border-neutral-900/60 w-fit">
            {["all", "java", "ui"].map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`px-3 py-1 text-[10px] font-mono rounded transition-all capitalize cursor-pointer ${
                  projectFilter === filter ? "bg-neutral-900 text-white font-medium" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {filter === "all" ? "All Stack" : filter === "ui" ? "UI / Prototype" : "Java"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={`p-6 rounded-lg ${activeTheme.cardBg} border border-neutral-900 hover:border-neutral-800/80 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between`}
            >
              <div className="relative mb-5 overflow-hidden rounded-xl border border-neutral-900/70 bg-neutral-950 aspect-[16/10] group/image">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-3 right-3 text-[9px] font-mono bg-red-950/80 text-red-400 px-2.5 py-1 rounded border border-red-500/20 backdrop-blur-sm">
                  Local image
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono uppercase bg-neutral-950 px-2 py-0.5 rounded tracking-wider border border-neutral-900/60 text-neutral-400">
                    {project.category}
                  </span>
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                    <Icons.arrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{project.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">{project.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className={`text-[9px] font-mono px-2 py-0.5 rounded ${activeTheme.tagBg}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" ref={(el) => (refs.current.contact = el)} className={sectionClass("contact")}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">COORDINATE</span>
            <h2 className="text-2xl font-bold text-white">Let's discuss what you are building.</h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Send a project signal and your mail app will open with the details ready.
            </p>
            <div className="text-xs font-mono text-neutral-400 pt-3">
              <span className="block">
                Direct: <span className="text-neutral-200">{devConfig.email}</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-neutral-900/20 border border-neutral-900 rounded-lg p-6 relative overflow-hidden">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Message prepared</h3>
                  <p className="text-xs text-neutral-400">Your mail app should open with the details filled in.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label>
                      <span className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-1.5 font-mono">Your name</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Project lead"
                        value={formState.name}
                        onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-900 focus:border-neutral-700 focus:outline-none rounded p-2.5 text-xs text-white"
                      />
                    </label>
                    <label>
                      <span className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-1.5 font-mono">Your email</span>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formState.email}
                        onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-900 focus:border-neutral-700 focus:outline-none rounded p-2.5 text-xs text-white"
                      />
                    </label>
                  </div>
                  <label>
                    <span className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-1.5 font-mono">Project scope</span>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me what you are building..."
                      value={formState.message}
                      onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-900 focus:border-neutral-700 focus:outline-none rounded p-2.5 text-xs text-white resize-y"
                    />
                  </label>
                  <button type="submit" className={`w-full bg-gradient-to-r ${activeTheme.accent} text-black font-semibold py-2.5 px-4 rounded text-[11px] font-mono tracking-wider uppercase transition-all`}>
                    Prepare email
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-900 bg-neutral-950 py-8 px-6 text-xs text-neutral-500 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} {devConfig.name}. Template ready for iteration.</p>
          <div className="flex space-x-4 font-mono text-[10px]">
            <button onClick={() => scrollToSection("home")} className="hover:text-neutral-300 transition-colors">Go to top</button>
            <span className="text-neutral-800">|</span>
            <span className="text-neutral-600">Minimalist Deck Layout</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
