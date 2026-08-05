const { useState, useEffect, useRef, useMemo } = React;

const Icons = {
  java: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.1-7.843-.218" />
    </svg>
  ),
  arrowDown: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  arrowUpRight: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
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
  menu: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
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
  chat: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 18l-.958.479a.75.75 0 01-1.006-.875l.315-1.579A5.969 5.969 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  phone: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.506-5.194-3.874-6.7-6.7l1.293-.97c.362-.271.528-.732.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  mapPin: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  briefcase: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.653v-1.6a2.25 2.25 0 00-1.5-2.122V6.75A2.25 2.25 0 0015.75 4.5H8.25A2.25 2.25 0 006 6.75v2.025a2.25 2.25 0 00-1.5 2.122v1.6c0 .618.28 1.203.75 1.653m16.5 0a2.235 2.235 0 01-1.5.653H5.25a2.235 2.235 0 01-1.5-.653m16.5 0V9.75A2.25 2.25 0 0014.25 7.5h-4.5A2.25 2.25 0 007.5 9.75v4.4M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  graduationCap: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  github: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  mail: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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
  rewind: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
    </svg>
  ),
  fastForward: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  check: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
};

const OfficialLogos = {
  java: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-red-500/30 group-hover/card:shadow-[0_0_20px_rgba(227,46,50,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 1.5c.5.8-.2 1.8-.8 2.5-.5.6-.7 1-.3 1.5.3.4.8.2.9-.2.2-.8-.4-1.6-.9-2.3s-.1-1.1.6-1.5z" fill="#f43f5e" />
        <path d="M12.5 2.5c.3.6-.1 1.4-.6 1.9-.4.5-.6.8-.3 1.2.3.3.7.1.8-.2.2-.6-.3-1.2-.7-1.7s-.1-.8.8-1.2z" fill="#f43f5e" />
        <path d="M5.5 8c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v5.5c0 2.5-2 4.5-4.5 4.5h-3C7.5 18 5.5 16 5.5 13.5V8z" fill="#E32E32" />
        <path d="M17.5 10h1.5c1.1 0 2 .9 2 2s-.9 2-2 2h-1.5v-4z" stroke="#E32E32" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.5 11h7" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M4 20h14" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  ),
  springboot: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-emerald-500/30 group-hover/card:shadow-[0_0_20px_rgba(109,179,63,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10.5" fill="#6DB33F" />
        <path d="M12 4.5c0 0-4.5 3-4.5 7.5S12 19.5 12 19.5s4.5-3 4.5-7.5S12 4.5 12 4.5zm0 15c0 0-3-4.5-3-7.5h6c0 3-3 7.5-3 7.5z" fill="#FFFFFF" />
        <path d="M12 4.5v15" stroke="#6DB33F" strokeWidth="1" />
      </svg>
    </div>
  ),
  laravel: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-red-500/30 group-hover/card:shadow-[0_0_20px_rgba(255,45,32,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" stroke="#FF2D20" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 2v9.8m0 0L3.5 6.9m8.5 4.9l8.5-4.9" stroke="#FF2D20" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 11.8v9.8M3.5 16.7l8.5-4.9m8.5 4.9l-8.5-4.9" stroke="#FF2D20" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  ),
  php: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-indigo-500/30 group-hover/card:shadow-[0_0_20px_rgba(119,123,179,0.15)] transition-all duration-500">
      <svg viewBox="0 0 32 32" className="w-11 h-7 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="16" rx="15" ry="9" fill="#777BB3" />
        <text x="6" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">p</text>
        <text x="13.5" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">h</text>
        <text x="21" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">p</text>
      </svg>
    </div>
  ),
  sql: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-cyan-500/30 group-hover/card:shadow-[0_0_20px_rgba(0,117,143,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6c0-1.66 4-3 9-3s9 1.34 9 3-4 3-9 3-9-1.34-9-3z" fill="#00758F" opacity="0.8" />
        <path d="M21 6v4c0 1.66-4 3-9 3s-9-1.34-9-3V6" stroke="#00758F" strokeWidth="1.5" />
        <path d="M21 11v4c0 1.66-4 3-9 3s-9-1.34-9-3v-4" stroke="#00758F" strokeWidth="1.5" />
        <path d="M21 16v3c0 1.66-4 2.5-9 2.5s-9-.84-9-2.5v-3" stroke="#00758F" strokeWidth="1.5" />
        <path d="M11 2a4 4 0 014 4c0 1.5-1.5 2.5-3 3.5" stroke="#F29111" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  ),
  python: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-blue-500/30 group-hover/card:shadow-[0_0_20px_rgba(55,118,171,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c-2.4 0-3.8 1.1-3.8 3.1v1.9h3.8V7.5h-5.5C4.7 7.5 3 9 3 11.2v2.4c0 1.9 1.5 3 3.4 3h1.7V14.5c0-2.2 1.8-3.9 4-3.9h4.6V7.1C16.7 3.6 15 2 12 2z" fill="#3776AB" />
        <path d="M12 22c2.4 0 3.8-1.1 3.8-3.1v-1.9h-3.8V16.5h5.5c1.8 0 3.5-1.5 3.5-3.7v-2.4c0-1.9-1.5-3-3.4-3h-1.7V10c0 2.2-1.8 3.9-4 3.9H7.2V16.9C7.3 20.4 9 22 12 22z" fill="#FFD343" />
        <circle cx="8.5" cy="5.5" r="0.75" fill="#FFFFFF" />
        <circle cx="15.5" cy="18.5" r="0.75" fill="#111" />
      </svg>
    </div>
  ),
  tailwind: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-cyan-400/30 group-hover/card:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.4 1.4 2.8 2.8 5.7 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 14.9 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.4 1.4 2.8 2.8 5.7 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C11.5 13.4 10.1 12 7.2 12z" fill="#06B6D4" />
      </svg>
    </div>
  ),
  blade: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-red-500/30 group-hover/card:shadow-[0_0_20px_rgba(255,45,32,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#111" />
        <path d="M6 17V7l5 5-5 5zm7 0V7l5 5-5 5z" stroke="#FF2D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ),
  html5: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-orange-500/30 group-hover/card:shadow-[0_0_20px_rgba(227,79,38,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.1 2h15.8l-1.4 16-6.5 2-6.5-2L4.1 2z" fill="#E34F26" />
        <path d="M12 3.6v14.5l4.8-1.3 1-11.8H12z" fill="#F06529" />
        <path d="M12 8.7H8.7l-.2-2.6H12V3.6H6.3l.7 8.2H12V10.1z" fill="#ECECEC" />
        <path d="M12 11.8H9.3l-.2-1.7H12V8.7h5.2l-.5 5.5-4.7 1.3V11.8z" fill="#FFFFFF" />
      </svg>
    </div>
  ),
  css3: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-blue-500/30 group-hover/card:shadow-[0_0_20px_rgba(21,114,182,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.1 2h15.8l-1.4 16-6.5 2-6.5-2L4.1 2z" fill="#1572B6" />
        <path d="M12 3.6v14.5l4.8-1.3 1-11.8H12z" fill="#33A9DC" />
        <path d="M12 8.7H8.7l-.2-2.6H12V3.6H6.3l.7 8.2H12V10.1z" fill="#ECECEC" />
        <path d="M12 11.8H9.3l-.2-1.7H12V8.7h5.2l-.5 5.5-4.7 1.3V11.8z" fill="#FFFFFF" />
      </svg>
    </div>
  ),
  js: () => (
    <div className="w-16 h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-yellow-500/30 group-hover/card:shadow-[0_0_20px_rgba(247,223,30,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-9 h-9 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#F7DF1E" rx="3" />
        <path d="M12.14 17.15c.16.29.39.54.67.72.28.18.63.27 1.03.27.42 0 .74-.11.97-.33s.35-.55.35-1v-4.14h1.36v4.1c0 .82-.24 1.45-.72 1.88s-1.18.65-2.08.65c-.75 0-1.35-.16-1.8-.49s-.76-.8-1-1.43l1.22-.73zm5.43.12c.2.33.48.59.83.77.35.18.77.27 1.25.27.57 0 1-.13 1.3-.39s.45-.63.45-1.1c0-.44-.14-.78-.42-1s-.77-.4-1.48-.56c-.75-.17-1.28-.38-1.58-.62s-.45-.6-.45-1.07c0-.52.22-.93.65-1.22s1-.43 1.7-.43c.64 0 1.15.11 1.54.34s.66.58.82 1.05l-1.18.7c-.12-.27-.29-.47-.53-.59s-.53-.18-.87-.18c-.37 0-.66.08-.87.24s-.32.39-.32.68c0 .24.11.43.33.57s.63.26 1.22.4c.83.19 1.41.44 1.73.74s.48.74.48 1.3c0 .66-.25 1.2-.74 1.59s-1.19.59-2.1.59c-.83 0-1.5-.18-2-.53s-.84-.87-1-1.55l1.22-.71z" fill="#000000" />
      </svg>
    </div>
  )
};

const PRESET_THEMES = {
  crimsonCyber: {
    id: "crimsonCyber",
    name: "Crimson Abyss",
    accent: "from-red-600 via-rose-500 to-red-800",
    accentRaw: "#ef4444",
    glowColorRaw: "239, 68, 68"
  },
  sapphireAbyss: {
    id: "sapphireAbyss",
    name: "Deep Sapphire",
    accent: "from-blue-600 via-indigo-500 to-cyan-400",
    accentRaw: "#3b82f6",
    glowColorRaw: "59, 130, 246"
  }
};

const PROJECTS = [
  {
    id: 0,
    title: "AEGIS — Admission, Enrollment & Registrar System",
    category: "java",
    desc: "A unified platform merging admissions, enrollment, and registrar operations for Emilio Aguinaldo College Manila into a single system — currently in active development, leading a 3-person team as Team Lead Programmer.",
    tech: ["Spring Boot", "Java 17", "MySQL", "Team of 3"],
    stats: "In active development",
    filePath: "Unified admission, enrollment, and registrar workflow",
    image: "css/images/EAC1.png",
    current: true
  },
  {
    id: 1,
    title: "School Support System",
    category: "java",
    desc: "A support platform for schools where students and staff can send inquiries, get routed to the right team, and keep conversations organized.",
    tech: ["Spring Boot", "Java 17", "WebSockets", "HTML/CSS/JS"],
    stats: "Faster inquiry handling",
    filePath: "School support and inquiry management",
    image: "css/images/EAC3.png"
  },
  {
    id: 2,
    title: "DTR Supervisor & Workflow System",
    category: "java",
    desc: "A daily time record system that helps supervisors manage attendance, review logs, and keep employee records easier to track.",
    tech: ["Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
    stats: "Cleaner staff records",
    filePath: "Employee attendance and supervisor workflow",
    image: "css/images/DTR3.png"
  },
  {
    id: 3,
    title: "Car Wash Management System",
    category: "java",
    desc: "A scheduling and service tracking tool for managing appointments, customer requests, and daily car wash operations.",
    tech: ["Java SE", "Spring Framework", "SQLite", "Tailwind CSS"],
    stats: "Organized daily workflow",
    filePath: "Service scheduling and daily operations",
    image: "css/images/CAR3.png"
  },
  {
    id: 4,
    title: "Pearl Manila Hotel Booking UX Mockup",
    category: "design",
    desc: "A booking prototype for hotel reservations, room selection, availability checks, and a smoother customer booking flow.",
    tech: ["HTML5", "CSS3 Animation", "JS Engine", "Bootstrap UX"],
    stats: "Clearer booking flow",
    filePath: "Hotel booking and reservation prototype",
    image: "css/images/PRL1.png"
  }
];

const TECH_STACK = [
  {
    id: "java",
    name: "Java SE & EE",
    category: "Ecosystem Core",
    desc: "Object-oriented foundations for secure multithreaded systems, socket interfaces, and background schedulers across my Spring Boot projects.",
    badge: "LTS Standard",
    iconType: "java"
  },
  {
    id: "springboot",
    name: "Spring Boot",
    category: "Java Framework",
    desc: "Enterprise MVC APIs, WebSocket student channels, JPA integration, and high-performance server loops used in school support and DTR systems.",
    badge: "Enterprise",
    iconType: "springboot"
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "PHP Framework",
    desc: "Decoupled controller structures with relational models, middleware gates, Redis queue workers, and clean routing for async operations.",
    badge: "Elegant MVC",
    iconType: "laravel"
  },
  {
    id: "php",
    name: "PHP",
    category: "Backend Language",
    desc: "Server-side scripting for rapid web platforms, custom request handling, form authentication, and direct database integration.",
    badge: "Server Native",
    iconType: "php"
  },
  {
    id: "sql",
    name: "MySQL & SQLite",
    category: "Data Layer",
    desc: "Relational schemas, transaction logging, and foreign key mapping for attendance records, chat history, and booking audit trails.",
    badge: "Persist Layer",
    iconType: "sql"
  },
  {
    id: "python",
    name: "Python",
    category: "Scripting",
    desc: "Task schedulers, helper scripts, and file parsing automation for workflow support and algorithmic prototyping.",
    badge: "Automation",
    iconType: "python"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "UI Architecture",
    desc: "Responsive layouts, flexbox grids, custom animations, and design tokens mapped directly into this portfolio and client mockups.",
    badge: "Responsive",
    iconType: "tailwind"
  },
  {
    id: "blade",
    name: "Blade Templates",
    category: "PHP Views",
    desc: "Secure front-end template rendering with reusable layout slots and modular UI components in Laravel projects.",
    badge: "Components",
    iconType: "blade"
  },
  {
    id: "html5",
    name: "HTML5",
    category: "Web Standards",
    desc: "Semantic DOM structure emphasizing accessibility, clean content boxes, and smooth user flow across booking and support UIs.",
    badge: "Semantic",
    iconType: "html5"
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Presentation",
    desc: "Visual depth, keyframe animations, responsive grids, typography, and glassmorphism layouts for polished interfaces.",
    badge: "Style Layer",
    iconType: "css3"
  },
  {
    id: "js",
    name: "JavaScript",
    category: "Client Scripting",
    desc: "DOM interactions, async fetch calls, live timers, and event triggers connecting front-ends to Spring Boot and Laravel APIs.",
    badge: "Dynamic Client",
    iconType: "js"
  }
];

const EXPERIENCE = [
  {
    org: "EAC MANILA",
    role: "Team Lead Programmer",
    period: "July 13, 2026 — Present",
    current: true,
    desc: "Leading a 3-person team (myself plus 2 developers) building AEGIS, a unified Admission, Enrollment, and Registrar system for Emilio Aguinaldo College Manila — owning architecture, workflow design, and delivery, backed by 5+ years of self-taught and freelance development experience before stepping into this role."
  },
  {
    org: "QUALFON",
    role: "Customer Resolution Representative",
    period: "June 2023 — August 2024",
    steppingStone: true,
    desc: "Resolved complex user escalations, coordinated with departments to optimize workflow systems, and designed efficient software troubleshooting strategies — while self-teaching Spring Boot and Laravel and freelancing on small web projects in my off hours."
  },
  {
    org: "ALORICA",
    role: "Technical Support Agent",
    period: "Oct 2020 — Feb 2021",
    steppingStone: true,
    desc: "Applied systematic diagnostics to resolve technical software and hardware bottlenecks, reducing recurring support issues — continuing to build programming fundamentals and take on small freelance work alongside the role."
  },
  {
    org: "CONCENTRIX",
    role: "Customer Service Representative",
    period: "Oct 2019 — June 2020",
    steppingStone: true,
    desc: "Managed high-volume service queues with a strong customer-success focus. This is where I started teaching myself to code after hours, laying the groundwork for the developer path I'd commit to full-time."
  }
];

const STATS = [
  { num: "5+", label: "Years Coding" },
  { num: "3", label: "Team Size" },
  { num: "10+", label: "Tech Tools" },
  { num: "2026", label: "BSIT Graduate" }
];

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
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.15);

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

/* Typewriter effect with a blinking caret — cycles through a list of
   roles/lines, typing each one out then deleting it before moving on. */
function TypewriterText({ lines, typeSpeed = 55, deleteSpeed = 30, holdMs = 1800, className = "", caretClassName = "" }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting

  useEffect(() => {
    const currentLine = lines[lineIndex % lines.length];
    let timeout;

    if (phase === "typing") {
      if (displayText.length < currentLine.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentLine.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), holdMs);
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentLine.slice(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        setLineIndex((i) => (i + 1) % lines.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, lineIndex, lines, typeSpeed, deleteSpeed, holdMs]);

  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-[2px] ml-1 align-middle animate-pulse ${caretClassName}`} style={{ height: "0.9em" }} />
    </span>
  );
}

/* Faint diagonal streak lines drifting behind hero content — a code-driven
   nod to subtle motion-graphics backgrounds, not a video/GIF asset. */
function DiagonalStreaks({ colorRaw = "255, 255, 255", count = 14 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
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

    const streaks = Array.from({ length: count }, () => ({
      x: Math.random() * width * 1.4 - width * 0.2,
      y: Math.random() * height * 1.4 - height * 0.2,
      len: Math.random() * 70 + 40,
      speed: Math.random() * 0.15 + 0.05,
      alpha: Math.random() * 0.08 + 0.03
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      streaks.forEach((s) => {
        s.x -= s.speed;
        s.y += s.speed;
        if (s.x < -100 || s.y > height + 100) {
          s.x = width + Math.random() * 200;
          s.y = -Math.random() * 200;
        }

        ctx.strokeStyle = `rgba(${colorRaw}, ${s.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len * 0.4, s.y - s.len);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [colorRaw, count]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* Slowly-rotating glossy ring outline, purely CSS — a faint code-recreation
   of a rotating-torus hero visual, sitting behind the headline as ambient
   motion. Thin and low-opacity so it accents the text instead of competing
   with it. */
function GlossyRing({ accentA = "#ef4444", accentB = "#f43f5e", size = 300, thickness = 22 }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none select-none opacity-40"
      style={{
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        zIndex: 0
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full rounded-full animate-ring-spin"
        style={{
          background: `conic-gradient(from 0deg, ${accentA}, transparent 30%, transparent 70%, ${accentB})`,
          WebkitMask: `radial-gradient(circle, transparent calc(50% - ${thickness}px), #000 calc(50% - ${thickness}px + 1px), #000 50%, transparent calc(50% + 1px))`,
          mask: `radial-gradient(circle, transparent calc(50% - ${thickness}px), #000 calc(50% - ${thickness}px + 1px), #000 50%, transparent calc(50% + 1px))`
        }}
      />
    </div>
  );
}

function useHoverTilt() {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const rotX = -(y / (box.height / 2)) * 6;
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

function StarField({ theme, density = 45 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
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

    const particleCount = Math.min(140, density * 2);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.5,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2
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

      for (let i = 0; i < 12; i++) {
        sparksRef.current.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 1,
          alpha: 1,
          size: Math.random() * 2 + 1
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleCanvasClick);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.fillStyle = "rgba(5, 5, 5, 0.22)";
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

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
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x -= dx * force * 0.012;
            p.y -= dy * force * 0.012;
          }
        }

        const twinkle = 0.35 + Math.sin(frame * p.twinkleSpeed + p.twinklePhase) * 0.25;
        ctx.fillStyle = `rgba(${theme.glowColorRaw}, ${Math.max(0.08, twinkle)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      sparksRef.current.forEach((s, idx) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05;
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
    if (!window.IntersectionObserver) {
      setEntries(elements.map((element) => ({ target: element, isIntersecting: true })));
      return undefined;
    }

    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [elements]);

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

function mapProjectToRepo(project) {
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    name: slug,
    title: project.title,
    desc: project.desc,
    primaryLanguage: project.category === "java" ? "Java" : "JavaScript",
    langColor: project.category === "java" ? "bg-[#b07219]" : "bg-[#f1e05a]",
    stars: 6 + project.id * 2,
    forks: project.id,
    framework: project.tech[0],
    branch: project.current ? "in-progress" : (project.category === "design" ? "prototype" : "main"),
    image: project.image,
    category: project.category,
    stats: project.stats,
    current: project.current
  };
}

function GitHubCarousel({ projects, onDiscuss, volumeOn }) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const repositories = useMemo(() => projects.map(mapProjectToRepo), [projects]);
  const repeatedRepositories = useMemo(
    () => [...repositories, ...repositories, ...repositories],
    [repositories]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || repositories.length === 0) return;

    let frameId;
    const scrollSpeed = 0.7;

    /* Coverflow: on every frame, find each card's distance from the
       track's horizontal center and lift/scale the nearest one forward
       while receding cards scale down and dim — recreates a focused-card
       carousel effect without any video/GIF asset. */
    const applyCoverflow = () => {
      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        const proximity = Math.max(0, 1 - dist / (trackRect.width / 2));
        const scale = 0.9 + proximity * 0.1;
        const lift = proximity * 14;
        const opacity = 0.55 + proximity * 0.45;

        card.style.transform = `translateY(${-lift}px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = Math.round(proximity * 10);
      });
    };

    const processScroll = () => {
      if (!isPaused) {
        track.scrollLeft += scrollSpeed;
        const maxScrollLimit = track.scrollWidth / 3;
        if (track.scrollLeft >= maxScrollLimit * 2) {
          track.scrollLeft -= maxScrollLimit;
        }
      }
      applyCoverflow();
      frameId = requestAnimationFrame(processScroll);
    };

    frameId = requestAnimationFrame(processScroll);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, repositories.length]);

  const shiftTrack = (multiplier) => {
    playSynthSound("click", volumeOn);
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: 374 * multiplier, behavior: "smooth" });
  };

  if (repositories.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-900 bg-neutral-950/50 p-10 text-center">
        <p className="text-xs font-mono text-neutral-500">No deployments match this filter.</p>
      </div>
    );
  }

  return (
    <div className="relative select-none">
      <div className="relative group/track">
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />

        <div
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="overflow-x-auto py-4 px-1 flex gap-6 scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {repeatedRepositories.map((repo, idx) => (
            <div
              key={`${repo.name}-${idx}`}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="w-[290px] sm:w-[340px] flex-shrink-0 rounded-2xl border border-neutral-900 bg-neutral-950/60 backdrop-blur-md overflow-hidden flex flex-col justify-between min-h-[330px] hover:border-red-500/25 transition-[border-color,box-shadow] duration-300 group/card"
              style={{ transition: "transform 0.25s ease-out, opacity 0.25s ease-out", willChange: "transform, opacity" }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border-b border-neutral-900/60">
                <img
                  src={repo.image}
                  alt={repo.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                <span className="absolute top-3 left-3 text-[8px] font-mono uppercase bg-red-950/80 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">
                  {repo.current ? "In Progress" : (repo.category === "java" ? "System" : "Prototype")}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0">
                      <Icons.github className="w-3.5 h-3.5 text-neutral-500 transition-colors group-hover/card:text-red-500 flex-shrink-0" />
                      <span className="text-[11px] font-mono font-bold text-neutral-200 group-hover/card:text-red-400 truncate">
                        {repo.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 uppercase flex-shrink-0">
                      {repo.branch}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white group-hover/card:text-red-400 transition-colors leading-snug">
                    {repo.title}
                  </h3>

                  <p className="text-[11px] text-neutral-400 leading-relaxed font-light line-clamp-3">
                    {repo.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-red-950/20 text-red-400 border border-red-500/10">
                      {repo.framework}
                    </span>
                  </div>
                </div>

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

                <button
                  onClick={onDiscuss}
                  className="w-full text-[9px] font-mono text-red-400 bg-red-950/20 border border-red-900/30 px-3 py-1.5 rounded-lg hover:bg-red-950/50 transition-colors cursor-pointer"
                >
                  Discuss Similar System
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end w-full pt-4">
        <div className="flex items-center space-x-1.5 bg-neutral-950/80 p-1.5 rounded-xl border border-neutral-900/60 shadow-lg">
          <button onClick={() => shiftTrack(-2)} className="p-2 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90" title="Skip back 2">
            <Icons.rewind className="w-4 h-4" />
          </button>
          <button onClick={() => shiftTrack(-1)} className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90" title="Previous">
            <Icons.chevronLeft className="w-4 h-4" />
          </button>
          <span className="h-4 w-[1px] bg-neutral-900" />
          <button onClick={() => shiftTrack(1)} className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90" title="Next">
            <Icons.chevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => shiftTrack(2)} className="p-2 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90" title="Skip forward 2">
            <Icons.fastForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TechStackCarousel({ volumeOn }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const trackRef = useRef(null);
  const interactionTimeoutRef = useRef(null);
  const repeatedTechStack = useMemo(() => [...TECH_STACK, ...TECH_STACK, ...TECH_STACK], []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId;
    const scrollSpeed = 0.7;

    const processScroll = () => {
      if (!isPaused && !isInteracting) {
        track.scrollLeft += scrollSpeed;
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
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, [isPaused, isInteracting]);

  const shiftTrack = (multiplier) => {
    playSynthSound("click", volumeOn);
    const track = trackRef.current;
    if (!track) return;

    setIsInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);

    track.scrollBy({ left: 314 * multiplier, behavior: "smooth" });

    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 1200);
  };

  return (
    <div className="relative select-none">
      <div className="relative group/track">
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />

        <div
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="overflow-x-auto py-4 px-1 flex gap-5 scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {repeatedTechStack.map((tech, idx) => {
            const RenderIcon = OfficialLogos[tech.iconType];
            return (
              <div
                key={`${tech.id}-${idx}`}
                className="w-[250px] flex-shrink-0 rounded-2xl border border-neutral-900 bg-neutral-950/60 backdrop-blur-md overflow-hidden flex flex-col hover:border-red-500/25 transition-all duration-300 group/card"
              >
                <div className="p-5 flex items-center gap-4 border-b border-neutral-900/60">
                  {RenderIcon && <RenderIcon />}
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono uppercase text-red-500 tracking-wider block">
                      {tech.category}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-100 font-sans group-hover/card:text-red-400 transition-colors truncate">
                      {tech.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-light line-clamp-4">
                    {tech.desc}
                  </p>

                  <div className="pt-3 border-t border-neutral-900/80 text-[9px] text-neutral-500 font-mono flex justify-between items-center">
                    <span>{tech.badge}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end w-full pt-4">
        <div className="flex items-center space-x-1.5 bg-neutral-950/80 p-1.5 rounded-xl border border-neutral-900/60 shadow-lg">
          <button onClick={() => shiftTrack(-2)} className="p-2 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90" title="Skip back 2">
            <Icons.rewind className="w-4 h-4" />
          </button>
          <button onClick={() => shiftTrack(-1)} className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90" title="Previous">
            <Icons.chevronLeft className="w-4 h-4" />
          </button>
          <span className="h-4 w-[1px] bg-neutral-900" />
          <button onClick={() => shiftTrack(1)} className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90" title="Next">
            <Icons.chevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => shiftTrack(2)} className="p-2 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-950/20 transition-all cursor-pointer active:scale-90" title="Skip forward 2">
            <Icons.fastForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* Orbiting skill pills that flank the hero on desktop, inspired by
   floating-tag hero patterns. Two independent columns, alternating sides. */
const HERO_TAGS_LEFT = ["Java", "Spring Boot", "MySQL"];
const HERO_TAGS_RIGHT = ["Laravel", "Team Lead", "Tailwind"];

function HeroTagColumn({ tags, align }) {
  return (
    <div className={`hidden lg:flex flex-col gap-5 absolute top-1/2 -translate-y-1/2 ${align === "left" ? "left-0" : "right-0"}`}>
      {tags.map((tag, i) => (
        <span
          key={tag}
          className="px-4 py-2 rounded-full border border-neutral-800 bg-neutral-950/70 backdrop-blur-sm text-[11px] font-mono text-neutral-300 shadow-lg animate-float"
          style={{ animationDelay: `${i * 0.4}s`, alignSelf: align === "left" ? "flex-start" : "flex-end" }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function App() {
  const [activeTheme, setActiveTheme] = useState(PRESET_THEMES.crimsonCyber);
  const [particleDensity] = useState(50);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("all");
  const [volumeOn, setVolumeOn] = useState(true);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const devConfig = {
    name: "Vincent Gabrielle Pimentel",
    headline: "Full-Stack Java Developer building booking systems, management platforms, and business automation solutions.",
    role: "Team Lead Programmer, EAC Manila",
    bio: "BSIT graduate of Emilio Aguinaldo College Manila (June 2026), now working as Team Lead Programmer at EAC Manila since July 13, 2026, leading a 3-person team (myself plus 2 developers) building AEGIS, a unified Admission, Enrollment, and Registrar system for the college. Five-plus years of hands-on experience building Spring Boot, Laravel, and PHP web applications — self-taught and freelanced alongside full-time work before this role — focused on business process automation and workflow systems.",
    email: "vincentgabriellepimentel@gmail.com",
    phone: "09273537500",
    location: "Manila, Philippines",
    githubPortfolio: "dcane4ever.github.io/my-portfolio"
  };

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

  const scrollToSection = (id) => {
    playSynthSound('click', volumeOn);
    setIsMobileNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    playSynthSound('success', volumeOn);

    const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nProject scope:\n${formState.message}`
    );

    window.location.href = `mailto:${devConfig.email}?subject=${subject}&body=${body}`;
  };

  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return PROJECTS;
    return PROJECTS.filter(p => p.category === projectFilter);
  }, [projectFilter]);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "stack", label: "Stack" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className={`min-h-screen bg-neutral-950 text-stone-100 font-sans antialiased relative overflow-x-hidden selection:bg-red-600 selection:text-white`}>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4.5s ease-in-out infinite; }

        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-ring-spin { animation: ringSpin 18s linear infinite; }

        .reveal-1 { animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal-2 { animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .reveal-3 { animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .custom-scrollbar::-webkit-scrollbar { height: 3px; width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.4); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${activeTheme.accentRaw}33; border-radius: 99px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${activeTheme.accentRaw}; }

        .scrollbar-hide::-webkit-scrollbar { display: none !important; }
        .scrollbar-hide { -ms-overflow-style: none !important; scrollbar-width: none !important; }

        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* Ambient starfield background across the hero */}
      <div className="absolute inset-0 w-full h-[100vh] overflow-hidden pointer-events-none z-0">
        <StarField theme={activeTheme} density={particleDensity} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 25%, rgba(${activeTheme.glowColorRaw}, 0.14) 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-white/[0.06] px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 cursor-pointer group"
            aria-label="Go to home"
          >
            <span className="w-9 h-9 rounded-full border border-red-500 flex items-center justify-center text-red-500 font-black text-[11px] font-mono group-hover:bg-red-500 group-hover:text-white transition-colors">
              VP
            </span>
            <span className="text-[11px] font-mono font-black tracking-tight text-white hidden sm:inline">
              vpimentel.dev
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-neutral-500">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="hover:text-white transition-colors cursor-pointer">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { playSynthSound('click', volumeOn); setVolumeOn(v => !v); }}
              className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline-flex"
              title={volumeOn ? "Mute interface sounds" : "Unmute interface sounds"}
            >
              {volumeOn ? <Icons.volumeUp className="w-4 h-4" /> : <Icons.volumeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { playSynthSound('click', volumeOn); setIsPanelOpen(true); }}
              className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline-flex"
              title="Accent theme"
            >
              <Icons.settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] hover:border-red-500/40 px-4 sm:px-5 py-2.5 text-[10px] font-mono font-black tracking-wide text-white transition-all cursor-pointer hidden sm:inline-flex"
            >
              Hire Me
            </button>
            <button
              onClick={() => setIsMobileNavOpen(v => !v)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer md:hidden"
            >
              {isMobileNavOpen ? <Icons.close className="w-5 h-5" /> : <Icons.menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileNavOpen && (
          <div className="md:hidden mt-3 pb-2 flex flex-col gap-1 border-t border-white/[0.06] pt-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left px-2 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Section 1: Hero */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center px-6 relative z-10 pt-24 pb-16 overflow-hidden"
      >
        <DiagonalStreaks colorRaw="255, 255, 255" count={16} />

        <div className="relative max-w-3xl w-full text-center space-y-6">
          <HeroTagColumn tags={HERO_TAGS_LEFT} align="left" />
          <HeroTagColumn tags={HERO_TAGS_RIGHT} align="right" />

          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-950/20 border border-red-900/30 rounded-full text-[9px] font-mono text-red-400 reveal-1 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <GlitchText text="EAC MANILA GRADUATE, BSIT JUNE 2026 | TEAM LEAD PROGRAMMER" active={true} speed={50} />
          </div>

          <div className="relative flex items-center justify-center">
            <GlossyRing accentA={activeTheme.accentRaw} accentB={activeTheme.id === "sapphireAbyss" ? "#22d3ee" : "#f43f5e"} size={240} thickness={14} />
            <h1 className="relative text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.05] reveal-2">
              Hi, I'm{" "}
              <span className={`bg-gradient-to-r ${activeTheme.accent} bg-clip-text text-transparent`}>
                Vincent
              </span>
            </h1>
          </div>

          <h2 className="text-xl md:text-2xl font-bold reveal-2 min-h-[2.5em] md:min-h-[1.5em]">
            <TypewriterText
              lines={["Team Lead Programmer", "Full-Stack Java Developer", "BSIT Graduate, EAC Manila"]}
              className="text-neutral-200"
              caretClassName="bg-red-500"
            />
          </h2>

          <p className="text-base md:text-lg text-neutral-300 font-semibold reveal-3 max-w-xl mx-auto">
            {devConfig.headline}
          </p>

          <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto reveal-3">
            {devConfig.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 reveal-3 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              onMouseEnter={() => playSynthSound('hover', volumeOn)}
              className={`px-6 py-3 bg-gradient-to-r ${activeTheme.accent} text-white text-[11px] font-mono font-bold rounded-full cursor-pointer hover:shadow-[0_4px_20px_rgba(239,68,68,0.3)] transition-all duration-300 active:scale-95`}
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              onMouseEnter={() => playSynthSound('hover', volumeOn)}
              className="px-6 py-3 bg-neutral-900/60 border border-neutral-800 hover:border-red-950 text-neutral-200 text-[11px] font-mono font-bold rounded-full transition-all duration-300 cursor-pointer hover:text-white"
            >
              Let's Connect
            </button>
          </div>
        </div>

        <button onClick={() => scrollToSection("about")} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[8px] font-mono text-neutral-500 mb-1 tracking-widest">SCROLL</span>
          <Icons.arrowDown className="w-3.5 h-3.5 text-neutral-500 animate-bounce" />
        </button>
      </section>

      {/* Section 2: About + Stats */}
      <section
        id="about"
        ref={el => observerElementsRef.current['about'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 relative z-10 transition-all duration-1000 ease-out transform ${visibleSections['about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-7 bg-neutral-950/60 border border-neutral-900 rounded-2xl p-8 space-y-5">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">ABOUT ME</span>
            <h2 className="text-2xl font-black text-white">Crafting Practical <span className={`bg-gradient-to-r ${activeTheme.accent} bg-clip-text text-transparent`}>Digital Systems</span></h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              {devConfig.bio}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-4 flex items-start gap-3">
                <Icons.graduationCap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-white">BSIT Graduate</span>
                  <span className="block text-[11px] text-neutral-500">Emilio Aguinaldo College Manila, June 2026</span>
                </div>
              </div>
              <div className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-4 flex items-start gap-3">
                <Icons.briefcase className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-white">Team Lead Programmer</span>
                  <span className="block text-[11px] text-neutral-500">EAC Manila, since July 13, 2026 — leading a team of 3</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => scrollToSection("contact")} className={`px-5 py-2.5 bg-gradient-to-r ${activeTheme.accent} text-white text-[10px] font-mono font-bold rounded-full cursor-pointer transition-all duration-300 active:scale-95`}>
                Contact Me
              </button>
              <button onClick={() => scrollToSection("projects")} className="px-5 py-2.5 bg-transparent border border-neutral-800 hover:border-red-950 text-neutral-300 text-[10px] font-mono font-bold rounded-full transition-all duration-300 cursor-pointer hover:text-white">
                See Projects
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-6 flex flex-col justify-center items-center text-center gap-1 hover:border-red-500/25 transition-colors">
                <span className={`text-3xl font-black bg-gradient-to-r ${activeTheme.accent} bg-clip-text text-transparent`}>{stat.num}</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 3: Current Focus (AEGIS spotlight) */}
      <section
        id="focus"
        ref={el => observerElementsRef.current['focus'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 relative z-10 transition-all duration-1000 ease-out transform ${visibleSections['focus'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="rounded-2xl border border-red-900/30 bg-gradient-to-br from-red-950/15 via-neutral-950/60 to-neutral-950/60 p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-[9px] font-mono text-red-400 uppercase tracking-widest font-extrabold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Currently Building
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">AEGIS — Admission, Enrollment & Registrar System</h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-light max-w-2xl">
              As Team Lead Programmer at Emilio Aguinaldo College Manila, I'm directing a 3-person team building AEGIS — a single unified platform that merges admissions, enrollment, and registrar operations into one system, replacing disconnected manual processes with one clean workflow for staff and students.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Spring Boot", "Java 17", "MySQL", "Team of 3"].map((t) => (
                <span key={t} className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-red-950/20 text-red-400 border border-red-500/10">{t}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 w-full max-w-[240px] aspect-[4/5] bg-neutral-900">
              <img
                src="css/images/EAC1.png"
                alt="AEGIS project preview"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Experience */}
      <section
        id="experience"
        ref={el => observerElementsRef.current['experience'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 relative z-10 transition-all duration-1000 ease-out transform ${visibleSections['experience'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4 space-y-4">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">TIMELINE</span>
            <h2 className="text-2xl font-black text-white">Professional Experience</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              From 2019 to 2024 I worked full-time in customer support and tech support roles — and taught myself to code and freelanced on small web projects in parallel, after hours. Those years weren't a detour; they were the stepping stones that led to my BSIT degree and my current role as Team Lead Programmer at EAC Manila.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4 relative">
            <div className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-red-500/40 via-neutral-800 to-neutral-800 hidden sm:block" />

            {EXPERIENCE.map((exp) => (
              <div key={exp.org + exp.period} className="relative sm:pl-12">
                <span className={`hidden sm:flex absolute left-0 top-5 w-[11px] h-[11px] rounded-full border-2 items-center justify-center ${exp.current ? "bg-red-500 border-red-500" : "bg-neutral-950 border-neutral-700"}`} />

                <div className={`rounded-xl p-5 relative overflow-hidden border ${exp.current ? "bg-red-950/10 border-red-900/30" : "bg-neutral-900/20 border-neutral-900"}`}>
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${exp.current ? "text-red-400 bg-red-950/20" : "text-neutral-400 bg-neutral-950"}`}>
                          {exp.org}
                        </span>
                        {exp.steppingStone && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-500 border border-neutral-800 italic">
                            stepping stone
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{exp.role}</h4>
                    </div>
                    <span className={`text-[10px] font-mono flex items-center gap-1.5 ${exp.current ? "text-red-400" : "text-neutral-500"}`}>
                      {exp.current && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 5: Tech Stack */}
      <section
        id="stack"
        ref={el => observerElementsRef.current['stack'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 relative z-10 transition-all duration-1000 ease-out transform ${visibleSections['stack'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-10 space-y-2">
          <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">DEVELOPER ECOSYSTEM</span>
          <h2 className="text-2xl font-black text-white">Technical Stack</h2>
          <p className="text-xs text-neutral-400 font-light max-w-xl leading-relaxed">
            The languages, frameworks, and tools behind AEGIS, my school support systems, DTR workflows, booking prototypes, and this portfolio.
          </p>
        </div>

        <TechStackCarousel volumeOn={volumeOn} />
      </section>

      {/* Section 6: Projects */}
      <section
        id="projects"
        ref={el => observerElementsRef.current['projects'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 relative z-10 transition-all duration-1000 ease-out transform ${visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block mb-1 font-extrabold">PORTFOLIO</span>
            <h2 className="text-2xl font-black text-white">Engineered Systems</h2>
            <p className="text-xs text-neutral-400 font-light max-w-md mt-2 leading-relaxed">
              Real projects from my BSIT work, OJT rounds, and current role. Hover the track to pause, or use the controls to step through.
            </p>
          </div>

          <div className="flex space-x-1.5 bg-neutral-950 p-1 rounded-full border border-neutral-900 w-fit">
            {["all", "java", "design"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  playSynthSound('click', volumeOn);
                  setProjectFilter(filter);
                }}
                className={`px-4 py-1 text-[9px] font-mono rounded-full transition-all duration-300 capitalize cursor-pointer ${projectFilter === filter ? 'bg-red-950/40 text-red-400 font-semibold border border-red-500/20' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                {filter === "all" ? "Show All" : filter === "java" ? "Systems" : "Prototype"}
              </button>
            ))}
          </div>
        </div>

        <GitHubCarousel
          projects={filteredProjects}
          volumeOn={volumeOn}
          onDiscuss={() => {
            playSynthSound('click', volumeOn);
            scrollToSection("contact");
          }}
        />
      </section>

      {/* Section 7: Contact */}
      <section
        id="contact"
        ref={el => observerElementsRef.current['contact'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 relative z-10 transition-all duration-1000 ease-out transform ${visibleSections['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-5 space-y-5">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">GET IN TOUCH</span>
            <h2 className="text-2xl font-black text-white">Let's Build Something Together</h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Open to conversations about full-stack development, workflow systems, and practical software for schools and small businesses.
            </p>
            <div className="space-y-3 pt-2">
              <a href={`mailto:${devConfig.email}`} className="flex items-center gap-3 text-xs text-neutral-300 hover:text-red-400 transition-colors group">
                <span className="w-9 h-9 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center justify-center group-hover:border-red-500/30 flex-shrink-0">
                  <Icons.mail className="w-4 h-4" />
                </span>
                <span className="font-mono">{devConfig.email}</span>
              </a>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <span className="w-9 h-9 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                  <Icons.phone className="w-4 h-4" />
                </span>
                <span className="font-mono">{devConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <span className="w-9 h-9 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                  <Icons.mapPin className="w-4 h-4" />
                </span>
                <span className="font-mono">{devConfig.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-neutral-900/10 border border-neutral-900 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <Icons.check className="w-5 h-5 animate-bounce" />
                  </div>
                  <h3 className="text-xs font-bold text-white font-mono">Message Ready to Send</h3>
                  <p className="text-xs text-neutral-400">Your email client should have opened with the message drafted.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] uppercase font-extrabold text-neutral-500 tracking-wider mb-1.5 font-mono">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Recruiter"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-stone-950 border border-neutral-900 focus:border-red-900 focus:outline-none rounded-xl p-3.5 text-xs text-white transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] uppercase font-extrabold text-neutral-500 tracking-wider mb-1.5 font-mono">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-stone-950 border border-neutral-900 focus:border-red-900 focus:outline-none rounded-xl p-3.5 text-xs text-white transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase font-extrabold text-neutral-500 tracking-wider mb-1.5 font-mono">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about the role, project, or system you have in mind..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-stone-950 border border-neutral-900 focus:border-red-900 focus:outline-none rounded-xl p-3.5 text-xs text-white transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${activeTheme.accent} text-white font-bold py-3 px-4 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-all duration-300 hover:shadow-[0_4px_20px_rgba(239,68,68,0.25)] cursor-pointer`}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Slide-over: Accent theme + sound settings */}
      {isPanelOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end" onClick={() => setIsPanelOpen(false)}>
          <div className="w-full max-w-sm bg-stone-950 h-full border-l border-neutral-900 p-6 overflow-y-auto space-y-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-3 border-b border-neutral-900">
              <div>
                <h3 className="text-xs font-bold text-white font-mono">Interface Settings</h3>
                <span className="text-[9px] text-neutral-500">Accent theme and interaction sounds</span>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <Icons.close className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Accent Theme</label>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.values(PRESET_THEMES).map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => { playSynthSound('click', volumeOn); setActiveTheme(theme); }}
                    className={`px-2 py-2 text-center rounded-xl text-[9px] border cursor-pointer font-medium transition-all ${activeTheme.id === theme.id ? 'bg-neutral-900 border-red-500 text-white shadow-md' : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-neutral-200'}`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Interaction Sounds</label>
              <button
                onClick={() => setVolumeOn(v => !v)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs border cursor-pointer transition-all ${volumeOn ? 'bg-neutral-900 border-red-500/40 text-white' : 'bg-neutral-950 border-neutral-900 text-neutral-400'}`}
              >
                <span className="flex items-center gap-2 font-mono">
                  {volumeOn ? <Icons.volumeUp className="w-4 h-4" /> : <Icons.volumeOff className="w-4 h-4" />}
                  {volumeOn ? "Sound On" : "Sound Off"}
                </span>
                <span className={`w-8 h-4 rounded-full relative transition-colors ${volumeOn ? "bg-red-600" : "bg-neutral-800"}`}>
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${volumeOn ? "left-4" : "left-0.5"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-stone-950 py-8 px-6 text-[10px] text-neutral-500 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <p>(c) {new Date().getFullYear()} {devConfig.name}. BSIT Graduate, EAC Manila (June 2026) — Team Lead Programmer @ EAC Manila.</p>
          </div>
          <div className="flex items-center space-x-3 font-mono text-[9px]">
            <button onClick={() => scrollToSection("home")} className="hover:text-neutral-300 transition-colors cursor-pointer">Back to Top</button>
            <span className="text-neutral-800">|</span>
            <span className="text-neutral-600">Practical Systems Portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
