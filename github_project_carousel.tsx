import React, { useState, useEffect, useRef } from 'react';

// Custom icons for the GitHub interface
const Icons = {
  github: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  star: (props) => (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  fork: (props) => (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M6 5a3 3 0 11-1 3v3a1 1 0 01-1 1H3a1 1 0 000 2h1a3 3 0 003-3V8a1 1 0 011-1h4a1 1 0 011 1v3a3 3 0 003 3h1a1 1 0 100-2h-1a1 1 0 01-1-1V8a3 3 0 11-1-3V5a1 1 0 01-1-1H7a1 1 0 01-1 1v1z" clipRule="evenodd" />
    </svg>
  ),
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

export default function GitHubCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  // Vincent Gabrielle Pimentel's actual skills & resume projects
  const repositories = [
    {
      name: "school-support-system",
      desc: "Robust student-to-staff communication gateway engineered with real-time text chat, audio routing, and secure system protocols.",
      primaryLanguage: "Java",
      langColor: "bg-[#b07219]",
      stars: 12,
      forks: 4,
      framework: "Spring Boot",
      branch: "main",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "dtr-management-system",
      desc: "An automated Daily Time Record logging and compliance system assisting supervisors to track attendance and record database actions.",
      primaryLanguage: "Java",
      langColor: "bg-[#b07219]",
      stars: 8,
      forks: 2,
      framework: "Spring Boot + MySQL",
      branch: "master",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "service-scheduler-hub",
      desc: "Streamlined task scheduler organizing technician booking allocations, calendar updates, and task tracking pipelines.",
      primaryLanguage: "Java",
      langColor: "bg-[#b07219]",
      stars: 15,
      forks: 3,
      framework: "Java SE + SQLite",
      branch: "main",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "pearl-manila-booking",
      desc: "High-fidelity modern reservation client customized and developed during active OJT implementation rounds.",
      primaryLanguage: "JavaScript",
      langColor: "bg-[#f1e05a]",
      stars: 10,
      forks: 1,
      framework: "HTML5 + Bootstrap UX",
      branch: "production",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "laravel-horizon-queue",
      desc: "Dynamic background task broker queue dashboard built to dispatch massive asynchronous microservices operations.",
      primaryLanguage: "PHP",
      langColor: "bg-[#4F5D95]",
      stars: 14,
      forks: 5,
      framework: "Laravel 11",
      branch: "main",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Triplicating lists to guarantee completely seamless looping on large viewports
  const repeatedRepositories = [...repositories, ...repositories, ...repositories];

  // Hardware-Accelerated Continuous Scrolling Engine (Frame-by-frame offset increment)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId;
    const scrollSpeed = 0.85; // Pixels drifted per frame. Increase/decrease to speed up/slow down.

    const processScroll = () => {
      if (!isPaused) {
        track.scrollLeft += scrollSpeed;

        // If drifted past the first set of duplicated elements, wrap back to origin seamlessly
        const maxScrollLimit = track.scrollWidth / 3;
        if (track.scrollLeft >= maxScrollLimit * 2) {
          track.scrollLeft -= maxScrollLimit;
        }
      }
      frameId = requestAnimationFrame(processScroll);
    };

    frameId = requestAnimationFrame(processScroll);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  // Stepper Functions (Smooth scrolling behavior)
  const shiftTrack = (multiplier) => {
    const track = trackRef.current;
    if (!track) return;
    const cardStepSize = 374; // Width + gap offset
    track.scrollBy({
      left: cardStepSize * multiplier,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full bg-[#070708] py-20 px-4 flex flex-col items-center justify-center relative select-none">
      
      {/* Background glow overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-600/[0.04] blur-[140px] rounded-full" />
      </div>

      <div className="max-w-6xl w-full z-10 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-red-950/20 border border-red-900/30 px-3 py-1 rounded-full text-[10px] font-mono text-red-500 uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span>Fluid Track Ecosystem</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-sans">
            Continuous GitHub Pipeline
          </h2>
          <p className="text-xs text-neutral-400 font-light max-w-md">
            Watch projects glide past dynamically. Hover your cursor anywhere on the track to lock focus on specific modules.
          </p>
        </div>

        {/* Continuous Viewing Portal */}
        <div 
          className="relative group/track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Mask Gradients giving an infinite/seamless feel to the sliding track */}
          <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#070708] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#070708] to-transparent z-20 pointer-events-none" />

          {/* Viewport Mask */}
          <div 
            ref={trackRef}
            className="overflow-x-auto py-4 px-1 flex gap-6 scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none', // Hide standard firefox scrollbars
              msOverflowStyle: 'none', // Hide IE/Edge scrollbars
            }}
          >
            {repeatedRepositories.map((repo, idx) => {
              return (
                <div 
                  key={idx}
                  className="w-[290px] sm:w-[350px] flex-shrink-0 rounded-2xl border border-neutral-900 bg-neutral-950/50 backdrop-blur-md overflow-hidden flex flex-col justify-between min-h-[340px] hover:border-red-500/25 transition-all duration-300 group/card"
                >
                  
                  {/* Visual Project Preview Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border-b border-neutral-900/60">
                    <img 
                      src={repo.image} 
                      alt={repo.name} 
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"; }}
                    />
                    <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Repository details */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icons.github className="w-4 h-4 text-neutral-500 transition-colors group-hover/card:text-red-500" />
                          <span className="text-xs font-mono font-bold text-neutral-200 hover:text-red-400 truncate max-w-[150px]">
                            {repo.name}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 uppercase">
                          {repo.branch}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-400 leading-relaxed font-light line-clamp-3">
                        {repo.desc}
                      </p>
                    </div>

                    {/* Footer stats row */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-900/80 text-[10px] text-neutral-500 font-mono">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                        <span>{repo.primaryLanguage}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-0.5">
                          <Icons.star className="w-3.5 h-3.5 text-neutral-600" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center space-x-0.5">
                          <Icons.fork className="w-3.5 h-3.5 text-neutral-600" />
                          <span>{repo.forks}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Tiny Status Indicator */}
          <div className="absolute -top-6 right-2 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
            {isPaused ? "Paused on Hover" : "Auto-streaming"}
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
              title="Prev Project"
            >
              <Icons.arrowLeft className="w-4 h-4" />
            </button>

            <span className="h-4 w-[1px] bg-neutral-900" />

            {/* Step Right */}
            <button 
              onClick={() => shiftTrack(1)}
              className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90"
              title="Next Project"
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