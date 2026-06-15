const { useState, useEffect, useRef, useMemo } = React;

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
  ),
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
  rewind: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
    </svg>
  ),
  fastForward: (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
  )
};

const OfficialLogos = {
  java: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-red-500/30 group-hover/card:shadow-[0_0_20px_rgba(227,46,50,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-12 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-emerald-500/30 group-hover/card:shadow-[0_0_20px_rgba(109,179,63,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10.5" fill="#6DB33F" />
        <path d="M12 4.5c0 0-4.5 3-4.5 7.5S12 19.5 12 19.5s4.5-3 4.5-7.5S12 4.5 12 4.5zm0 15c0 0-3-4.5-3-7.5h6c0 3-3 7.5-3 7.5z" fill="#FFFFFF" />
        <path d="M12 4.5v15" stroke="#6DB33F" strokeWidth="1" />
      </svg>
    </div>
  ),
  laravel: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3.5 shadow-inner group-hover/card:border-red-500/30 group-hover/card:shadow-[0_0_20px_rgba(255,45,32,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-11 h-11 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <text x="6" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">p</text>
        <text x="13.5" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">h</text>
        <text x="21" y="21" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">p</text>
      </svg>
    </div>
  ),
  sql: () => (
    <div className="w-20 h-20 rounded-full bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-3 shadow-inner group-hover/card:border-cyan-500/30 group-hover/card:shadow-[0_0_20px_rgba(0,117,143,0.15)] transition-all duration-500">
      <svg viewBox="0 0 24 24" className="w-12 h-12 transition-transform duration-500 group-hover/card:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6c0-1.66 4-3 9-3s9 1.34 9 3-4 3-9 3-9-1.34-9-3z" fill="#00758F" opacity="0.8" />
        <path d="M21 6v4c0 1.66-4 3-9 3s-9-1.34-9-3V6" stroke="#00758F" strokeWidth="1.5" />
        <path d="M21 11v4c0 1.66-4 3-9 3s-9-1.34-9-3v-4" stroke="#00758F" strokeWidth="1.5" />
        <path d="M21 16v3c0 1.66-4 2.5-9 2.5s-9-.84-9-2.5v-3" stroke="#00758F" strokeWidth="1.5" />
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

const PROJECTS = [
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
    branch: project.category === "design" ? "prototype" : "main",
    image: project.image,
    category: project.category,
    stats: project.stats
  };
}

function GitHubCarousel({ projects, onDiscuss, volumeOn }) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const repositories = useMemo(() => projects.map(mapProjectToRepo), [projects]);
  const repeatedRepositories = useMemo(
    () => [...repositories, ...repositories, ...repositories],
    [repositories]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || repositories.length === 0) return;

    let frameId;
    const scrollSpeed = 0.85;

    const processScroll = () => {
      if (!isPaused) {
        track.scrollLeft += scrollSpeed;
        const maxScrollLimit = track.scrollWidth / 3;
        if (track.scrollLeft >= maxScrollLimit * 2) {
          track.scrollLeft -= maxScrollLimit;
        }
      }
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-600/[0.04] blur-[140px] rounded-full" />
      </div>

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
              className="w-[290px] sm:w-[350px] flex-shrink-0 rounded-2xl border border-neutral-900 bg-neutral-950/50 backdrop-blur-md overflow-hidden flex flex-col justify-between min-h-[340px] hover:border-red-500/25 transition-all duration-300 group/card"
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
                  {repo.category === "java" ? "System" : "Prototype"}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0">
                      <Icons.github className="w-4 h-4 text-neutral-500 transition-colors group-hover/card:text-red-500 flex-shrink-0" />
                      <span className="text-xs font-mono font-bold text-neutral-200 group-hover/card:text-red-400 truncate">
                        {repo.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 uppercase flex-shrink-0">
                      {repo.branch}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white group-hover/card:text-red-400 transition-colors">
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

        <div className="absolute -top-5 right-0 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
          {isPaused ? "Paused on Hover" : "Auto-streaming"}
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
    const scrollSpeed = 0.85;

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
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-600/[0.04] blur-[140px] rounded-full" />
      </div>

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
          {repeatedTechStack.map((tech, idx) => {
            const RenderIcon = OfficialLogos[tech.iconType];
            return (
              <div
                key={`${tech.id}-${idx}`}
                className="w-[290px] flex-shrink-0 rounded-2xl border border-neutral-900 bg-neutral-950/50 backdrop-blur-md overflow-hidden flex flex-col justify-between min-h-[350px] hover:border-red-500/25 transition-all duration-300 group/card"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-neutral-900/60 p-4 bg-[#09090b] flex items-center justify-center">
                  {RenderIcon && <RenderIcon />}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-40" />
                </div>

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
                    <span>Portfolio Active</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute -top-5 right-0 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
          {isPaused || isInteracting ? "Focused / Paused" : "Endless Stream"}
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

function App() {
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
    headline: "Full-Stack Java Developer building booking systems, management platforms, and business automation solutions.",
    role: "Full-Stack Java & Web Developer",
    bio: "BSIT student graduating in July 2026 with hands-on experience building Spring Boot, Laravel, and PHP web applications. Focused on business process automation, workflow systems, and user-centered software solutions.",
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

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    playSynthSound('api', volumeOn);

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
        .scrollbar-hide::-webkit-scrollbar {
          display: none !important;
        }
        .scrollbar-hide {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

      {/* Persistent Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#111111]/95 backdrop-blur-md border-b border-white/[0.06] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 cursor-pointer group"
            aria-label="Go to home"
          >
            <span className="w-9 h-9 rounded-full border border-red-500 flex items-center justify-center text-red-500 font-black text-[11px] font-mono group-hover:bg-red-500 group-hover:text-white transition-colors">
              VP
            </span>
            <span className="text-[11px] font-mono font-black tracking-tight text-white">
              vpimentel.dev
            </span>
          </button>

          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-neutral-500">
            <button onClick={() => scrollToSection("architecture")} className="hover:text-white transition-colors cursor-pointer">
              Solutions
            </button>
            <button onClick={() => scrollToSection("experience")} className="hover:text-white transition-colors cursor-pointer">
              Experience
            </button>
            <button onClick={() => scrollToSection("stack")} className="hover:text-white transition-colors cursor-pointer">
              Tech Stack
            </button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors cursor-pointer">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          <button
            onClick={() => scrollToSection("contact")}
            className="rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] hover:border-red-500/40 px-4 sm:px-6 py-3 text-[10px] font-mono font-black tracking-wide text-white transition-all cursor-pointer"
          >
            Hire Candidate
          </button>
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

          <p className="text-sm md:text-base text-white font-semibold reveal-3">
            Hi, I'm {devConfig.name}.
          </p>

          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-2xl reveal-3">
            {devConfig.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 reveal-3">
            <button 
              onClick={() => scrollToSection("architecture")} 
              onMouseEnter={() => playSynthSound('hover', volumeOn)}
              className={`px-5 py-3 bg-gradient-to-r ${activeTheme.accent} text-white text-[10px] font-mono rounded-full cursor-pointer hover:shadow-[0_4px_20px_rgba(239,68,68,0.25)] transition-all duration-300 active:scale-95`}
            >
              See Services -{">"}
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              onMouseEnter={() => playSynthSound('hover', volumeOn)}
              className="px-5 py-3 bg-neutral-900/40 border border-neutral-800 hover:border-red-950 text-neutral-200 text-[10px] font-mono rounded-full transition-all duration-300 cursor-pointer hover:text-white"
            >
              View Real Projects
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-30 hover:opacity-100 transition-opacity" onClick={() => scrollToSection("architecture")}>
          <span className="text-[8px] font-mono text-neutral-500 mb-1 tracking-widest">SERVICES</span>
          <Icons.arrowDown className="w-3.5 h-3.5 text-neutral-500 animate-bounce" />
        </div>
      </section>

      {/* Section 2: Client Process */}
      <section 
        id="architecture"
        ref={el => observerElementsRef.current['architecture'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-1000 ease-out transform ${visibleSections['architecture'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">SOLUTIONS</span>
            <h2 className="text-2xl font-black text-white">How I Build Your System</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              I turn everyday business problems into simple web systems that are easier for staff, owners, and customers to use.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              The goal is not just code. The goal is a working tool that saves time, organizes records, and makes the process clearer.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                step: "01",
                title: "Understand the Workflow",
                desc: "We review your current process, users, pain points, records, forms, and rules before building anything.",
              },
              {
                step: "02",
                title: "Design the Screens",
                desc: "I plan clean pages for bookings, staff records, dashboards, approvals, reports, and admin controls.",
              },
              {
                step: "03",
                title: "Build the System",
                desc: "I develop the database, login, user roles, forms, search, reports, and the main workflow your team needs.",
              },
              {
                step: "04",
                title: "Launch and Improve",
                desc: "We test the system, fix rough spots, and adjust it based on real usage and feedback.",
              },
            ].map((item) => (
              <article key={item.step} className="bg-neutral-950/50 border border-neutral-900 rounded-2xl p-6 min-h-[190px] hover:border-red-500/30 transition-colors">
                <span className="text-[10px] font-mono text-red-400 bg-red-950/20 border border-red-500/10 rounded-full px-2.5 py-1">
                  {item.step}
                </span>
                <h3 className="text-base font-black text-white mt-5 mb-3">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Client Services */}
      <section 
        id="playground"
        ref={el => observerElementsRef.current['playground'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-1000 ease-out transform ${visibleSections['playground'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">SERVICES</span>
            <h2 className="text-2xl font-black text-white">What I Can Build For You</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              These are the kinds of practical systems that help small teams, schools, offices, and service businesses replace messy manual work.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Booking Systems",
                desc: "For hotels, clinics, rentals, appointments, service schedules, room reservations, and customer requests.",
                items: ["Availability", "Reservation forms", "Admin review"],
              },
              {
                title: "Employee Time Record Systems",
                desc: "Attendance, daily time records, supervisor approvals, logs, exports, and simple reporting.",
                items: ["Clock in/out", "Staff records", "Reports"],
              },
              {
                title: "Customer Support Systems",
                desc: "Inquiry tracking, ticket status, staff assignment, response history, and organized customer communication.",
                items: ["Tickets", "Assignments", "History"],
              },
              {
                title: "Business Management Dashboards",
                desc: "Admin panels for customers, services, payments, inventory, records, approvals, and daily operations.",
                items: ["Admin tools", "Search", "Data tables"],
              },
            ].map((service) => (
              <article key={service.title} className="bg-neutral-950/50 border border-neutral-900 rounded-2xl p-6 min-h-[220px] flex flex-col justify-between hover:border-red-500/30 transition-colors">
                <div>
                  <h3 className="text-base font-black text-white mb-3">{service.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">{service.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-5">
                  {service.items.map((item) => (
                    <span key={item} className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-red-950/20 text-red-400 border border-red-500/10">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Work Experience & Customer Resolution Hybrid Matrix */}
      <section 
        id="experience"
        ref={el => observerElementsRef.current['experience'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-1000 ease-out transform ${visibleSections['experience'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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

      {/* Section 5: Technical Stack Pipeline */}
      <section
        id="stack"
        ref={el => observerElementsRef.current['stack'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-1000 ease-out transform ${visibleSections['stack'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-10 space-y-2">
          <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block font-extrabold">DEVELOPER ECOSYSTEM</span>
          <h2 className="text-2xl font-black text-white">Technical Stack Pipeline</h2>
          <p className="text-xs text-neutral-400 font-light max-w-xl leading-relaxed">
            A continuous overview of the languages, frameworks, and tools behind my school support systems, DTR workflows, booking prototypes, and this portfolio.
          </p>
        </div>

        <TechStackCarousel volumeOn={volumeOn} />
      </section>

      {/* Section 6: Projects GitHub Carousel */}
      <section 
        id="projects"
        ref={el => observerElementsRef.current['projects'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-1000 ease-out transform ${visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block mb-1 font-extrabold">PORTFOLIO DEPLOYMENTS</span>
            <h2 className="text-2xl font-black text-white">Engineered Systems Portfolio</h2>
            <p className="text-xs text-neutral-400 font-light max-w-md mt-2 leading-relaxed">
              Real projects from my BSIT work and OJT rounds. Hover the track to pause, or use the controls to step through deployments.
            </p>
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

      {/* Section 7: Contact Gateway */}
      <section 
        id="contact"
        ref={el => observerElementsRef.current['contact'] = el}
        className={`py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900/40 transition-all duration-1000 ease-out transform ${visibleSections['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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
                <form onSubmit={handleContactSubmit} className="space-y-4">
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
                    Send Email
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
            <p>(c) {new Date().getFullYear()} {devConfig.name}. Expected Graduation EAC Manila: July 2026.</p>
          </div>
          <div className="flex space-x-3 font-mono text-[9px]">
            <button onClick={() => scrollToSection("home")} className="hover:text-neutral-300 transition-colors cursor-pointer">Origin Root</button>
            <span className="text-neutral-800">|</span>
            <span className="text-neutral-600">Practical Systems Portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
