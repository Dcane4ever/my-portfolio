// Edit this file, then run `npm run build`. All public copy and editable settings live here.
// AEGIS and all EAC branding/screenshots are excluded pending employer clearance.
// Never add a client name, result, metric, or testimonial without verified permission/evidence.
export const content = {
  identity: {
    name: 'Vincent Gabrielle Pimentel', shortName: 'Vincent Pimentel', initials: 'VP',
    email: 'vincentgabriellepimentel@gmail.com', phone: '09273537500',
    domainEmail: '[ADD DOMAIN EMAIL]', location: 'Manila, Philippines',
    github: '[ADD GITHUB URL]', linkedin: '[ADD LINKEDIN URL]',
    photo: { src: '[ADD PHOTO PATH]', alt: 'Vincent Gabrielle Pimentel', width: 640, height: 800 },
  },
  settings: {
    siteUrl: 'https://dcane4ever.github.io/my-portfolio/',
    calendarUrl: '[ADD CALENDAR URL]',
    availability: 'Taking 1-2 projects at a time',
    formEndpoint: '', // Optional HTTPS POST endpoint accepting JSON; must return 2xx only after accepting the inquiry.
    analytics: { enabled: false, domain: '[ADD ANALYTICS DOMAIN]', scriptUrl: 'https://plausible.io/js/script.js' },
  },
  seo: {
    title: 'Booking & Attendance Systems | Vincent Pimentel, Manila',
    description: 'Replace paperwork with booking, attendance, and workflow systems for schools and small businesses. Spring Boot and Laravel apps with training and support. Book a free call.',
    serviceName: 'Vincent Pimentel — Booking & Attendance Systems',
    previewImage: 'assets/social-preview.png', previewAlt: 'Vincent Pimentel — less paperwork, more time for your team.',
    serviceType: ['Booking and reservation systems', 'Attendance and DTR systems', 'Admin dashboards and workflow automation'],
  },
  ui: {
    skip: 'Skip to content', menu: 'Menu', menuLabel: 'Toggle navigation', home: 'Go to home',
    navigationLabel: 'Main navigation', socialLabel: 'Social links', github: 'GitHub', linkedin: 'LinkedIn',
    pendingLink: '[ADD URL]', stack: 'Stack', context: 'Context', problem: 'Problem', solution: 'Solution', result: 'Result',
    demo: 'Live demo', repository: 'GitHub', screenshots: 'View screenshot',
    from: 'from ₱', next: 'Let’s talk', processNumberLabel: 'Step', faqToggle: '+', copyright: 'All rights reserved.',
  },
  nav: { links: [{ label: 'Services', href: '#services' }, { label: 'Work', href: '#work' }, { label: 'Process', href: '#process' }, { label: 'Pricing', href: '#pricing' }], cta: 'Book a free call' },
  hero: {
    eyebrow: 'Practical systems. Personal support.',
    title: 'I build booking and attendance systems that replace paperwork for schools and small businesses.',
    description: 'Spring Boot and Laravel apps delivered in weeks, with training and support so your team can use them from day one.',
    primary: 'Book a free 20-min call', secondary: 'See how it works', secondaryHref: '#process',
    note: 'Tell me what slows your team down. We’ll find a practical next step.',
    mockup: {
      caption: 'Illustrative workflow preview — not a client system.', title: 'One place to keep the day moving.',
      browserLabel: 'Your team workspace', sidebarTitle: 'Daily operations',
      sidebar: ['Overview', 'Bookings', 'Attendance', 'Reports'], heading: 'Today, without the paper trail.',
      subtitle: 'Bookings and attendance, together in one view.', badge: 'Sample data',
      overview: [{ label: 'Bookings', value: 'All in one place' }, { label: 'Attendance', value: 'Ready to review' }, { label: 'Reports', value: 'Easy to find' }],
      tableTitle: 'Your daily workflow', columns: ['Task', 'Next step'],
      rows: [{ task: 'Review a booking', status: 'Confirm availability' }, { task: 'Check a time record', status: 'Review attendance' }, { task: 'Prepare a report', status: 'Export records' }],
      footer: 'Less chasing updates. More getting things done.',
    },
  },
  problem: {
    title: 'Your team has better things to do than chase paperwork.',
    description: 'Paper logs. Spreadsheets. Group chats. Manual enrollment and booking. When information lives everywhere, even a simple update takes too long.',
    conclusion: 'Bring the work into one clear system.',
  },
  services: {
    eyebrow: 'What I can build for you', title: 'Less admin. A clearer working day.',
    description: 'Start with the task that takes up the most time. Build only what your team needs.',
    audienceLabel: 'For', includesLabel: 'You get', timelineLabel: 'Planning estimate',
    items: [
      { icon: 'calendar', title: 'Booking and reservation systems', audience: 'Schools, hotels, and appointment-based businesses.', deliverables: ['Availability and booking in one place', 'Clear confirmations and staff controls', 'A booking flow that works on phones'], timeline: '3–6 weeks for a focused first version.' },
      { icon: 'clock', title: 'Attendance and DTR systems', audience: 'School administrators and teams tracking staff time.', deliverables: ['Daily time records and attendance logs', 'Supervisor review and approvals', 'Reports your admin team can use'], timeline: '4–8 weeks, depending on your rules.' },
      { icon: 'workflow', title: 'Admin dashboards and workflow automation', audience: 'Small businesses with repeat admin work.', deliverables: ['One place to track tasks and requests', 'Clear roles, statuses, and approvals', 'Less copying between spreadsheets'], timeline: '3–8 weeks for an agreed workflow.' },
    ],
    timelineNote: 'These are planning estimates, not past delivery metrics. Your proposal confirms the scope and schedule.',
    stackLabel: 'Built with dependable tools', stack: ['Spring Boot · Java 17', 'Laravel · PHP', 'MySQL'],
  },
  stats: [
    { label: 'Systems delivered', value: '[ADD]' },
    { label: 'Users served', value: '[ADD]' },
    { label: 'Average delivery time', value: '[ADD]' },
  ],
  work: {
    eyebrow: 'Selected work', title: 'A closer look at the systems.',
    description: 'Examples of the kinds of tools I build. Results stay unclaimed until there is evidence to share.',
    items: [
      {
        id: 'dtr', title: 'DTR Supervisor and Workflow System', type: 'Attendance & supervisor workflow',
        context: 'A daily time record system for reviewing employee attendance. [ADD CONTEXT: confirm project scope and permission to share.]',
        problem: '[ADD PROBLEM: describe the original time-record process and its pain points.]',
        solution: 'Attendance logs, supervisor review, and employee record tracking in one system.',
        result: '[ADD RESULT: verified outcome or measured improvement.]',
        stack: ['Spring Boot', 'MySQL', 'Thymeleaf', 'Bootstrap'],
        image: { source: 'css/images/DTR3.png', src: 'assets/dtr-960.webp', srcSet: 'assets/dtr-480.webp 480w, assets/dtr-960.webp 960w', alt: 'Daily time record system sign-in screen', width: 376, height: 448 },
        demo: '[ADD DTR DEMO URL]', github: '[ADD DTR GITHUB URL]',
      },
      {
        id: 'pearl', title: 'Pearl Manila Hotel Booking prototype', type: 'Booking prototype · not a client endorsement',
        context: 'A hotel booking UX prototype. [ADD CONTEXT: confirm whether this was a personal, study, or commissioned project.]',
        problem: '[ADD PROBLEM: describe the reservation flow this prototype explores.]',
        solution: 'A prototype exploring room selection, availability checks, and a clearer booking flow.',
        result: '[ADD RESULT: verified prototype feedback or test findings. Do not imply a live deployment.]',
        stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        image: { source: 'css/images/PRL1.png', src: 'assets/pearl-960.webp', srcSet: 'assets/pearl-480.webp 480w, assets/pearl-960.webp 960w', alt: 'Pearl Manila Hotel booking prototype page', width: 1280, height: 760 },
        demo: '[ADD PEARL DEMO URL]', github: '[ADD PEARL GITHUB URL]',
      },
      {
        id: 'carwash', title: 'Car Wash Management System', type: 'Scheduling & service tracking',
        context: 'A tool for scheduling and daily car wash operations. [ADD CONTEXT: confirm project scope and whether it was deployed.]',
        problem: '[ADD PROBLEM: describe the scheduling or service-tracking issue.]',
        solution: 'Appointment scheduling, customer requests, and service tracking in one workflow.',
        result: '[ADD RESULT: verified outcome or measured improvement.]',
        stack: ['Java SE', 'Spring Framework', 'SQLite', 'Tailwind CSS'],
        image: { source: 'css/images/CAR3.png', src: 'assets/carwash-960.webp', srcSet: 'assets/carwash-480.webp 480w, assets/carwash-960.webp 960w', alt: 'Car wash management system service packages page', width: 1246, height: 700 },
        demo: '[ADD CAR WASH DEMO URL]', github: '[ADD CAR WASH GITHUB URL]',
      },
    ],
  },
  process: {
    eyebrow: 'How it works', title: 'A clear plan. No guessing what happens next.',
    items: [
      { title: 'Discovery call', description: 'We spend 20 minutes on your current process, your team, and what needs to change.' },
      { title: 'Fixed-scope proposal', description: 'You get a written scope, a price, a timeline, and clear deliverables before work starts.' },
      { title: 'Build with weekly demos', description: 'See progress each week. Try the workflow and give feedback while it is being built.' },
      { title: 'Launch and support', description: 'I help with launch, train your team, and provide the support agreed in your proposal.' },
    ],
  },
  pricing: {
    eyebrow: 'Budget planning', title: 'Choose a starting point. Scope it together.',
    description: 'A short call helps us decide what to build first. You’ll receive a fixed-scope quote before you commit.',
    items: [
      { title: 'Starter', price: '[ADD]', description: 'One focused task, done well.', includes: ['One core workflow', 'Essential staff controls', 'Launch and staff handover'] },
      { title: 'Standard', price: '[ADD]', description: 'Connected tools for a growing team.', includes: ['Connected booking or attendance workflows', 'Roles, approvals, and useful reports', 'Weekly demos and team training'] },
      { title: 'Custom', price: '[ADD]', description: 'A system shaped around your operations.', includes: ['Multiple departments or workflows', 'Integrations scoped to your needs', 'A phased launch and support plan'] },
    ],
    note: 'Every tier includes an agreed scope, mobile-friendly screens, testing, training, and launch handover. Hosting, maintenance, and support duration are quoted separately and agreed in writing.',
  },
  about: {
    eyebrow: 'The person behind your system', title: 'Built by someone who understands support.',
    paragraphs: [
      'I’m Vincent. I build practical systems for schools and small businesses, with 5+ years of hands-on experience.',
      'Before moving into development, I worked in customer and tech support, helping people solve problems in plain language.',
      'That experience shapes how I build: clear screens, reliable workflows, and tools non-technical staff can actually use.',
      'You work directly with me, from the first call through training and launch.',
    ],
    photoPlaceholder: '[ADD PHOTO]', photoNote: 'Vincent Pimentel · Manila',
  },
  testimonials: {
    title: 'In their own words.',
    // Up to three consented testimonials: { quote, name, role }. Leave empty until real quotes are supplied.
    items: [],
  },
  faq: {
    eyebrow: 'Before we talk', title: 'A few things you might be wondering.',
    items: [
      { question: 'How long does a project take?', answer: 'A focused first version is usually planned in weeks. The exact schedule depends on your workflows, integrations, and how quickly we can review feedback. We agree on milestones in the proposal.' },
      { question: 'How much will it cost?', answer: 'The price depends on what you need built. The tiers above are starting points. After our call, I’ll give you a written scope and quote so you can decide before work begins.' },
      { question: 'Who owns the code?', answer: 'Code ownership, source-code handover, and any third-party licenses are set out in the written proposal. We agree on these terms before the project starts.' },
      { question: 'Can you help with hosting?', answer: 'Yes. I can help choose and set up hosting that fits the system. Hosting fees, account ownership, backups, and ongoing responsibilities are agreed separately. I explain the options in plain language.' },
      { question: 'What happens after launch?', answer: 'I train your team and provide the support included in your proposal. We agree on the support window, what it covers, and any ongoing maintenance before launch.' },
      { question: 'How do revisions work?', answer: 'Weekly demos give you regular chances to review the work. The proposal defines included revisions. If a request changes the agreed scope, I’ll explain the impact on price and timing before doing it.' },
    ],
  },
  contact: {
    eyebrow: 'Let’s make the work easier', title: 'What is slowing your team down?',
    description: 'Bring a rough idea, a spreadsheet, or a process you’re tired of repeating. We can start there.',
    calendarLabel: 'Book a free 20-min call', calendarFallback: 'Want to talk first? Use the form to request a free 20-minute call.',
    replyNote: 'I reply within 24 hours.', emailLabel: 'Prefer email?', formTitle: 'Tell me a little about your project.',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', placeholder: 'Your full name', autocomplete: 'name', required: true, maxLength: 100 },
      { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@yourorganization.com', autocomplete: 'email', required: true, maxLength: 254 },
      { name: 'organization', label: 'School or business', type: 'text', placeholder: 'Your school or business name', autocomplete: 'organization', required: true, maxLength: 160 },
      { name: 'need', label: 'What do you need built?', type: 'textarea', placeholder: 'For example: a booking system so our staff can stop tracking appointments in group chats.', required: true, maxLength: 4000 },
      { name: 'budget', label: 'Budget range', type: 'select', placeholder: 'Choose a budget range', required: true, options: ['Under ₱25,000', '₱25,000–₱50,000', '₱50,000–₱100,000', '₱100,000+', 'I need help estimating'] },
      { name: 'timeline', label: 'When do you need it?', type: 'select', placeholder: 'Choose a timeline', required: true, options: ['Within a month', 'In 1–3 months', 'In 3+ months', 'Flexible / exploring options'] },
    ],
    honeypot: 'Leave this field empty', submit: 'Send project details', emailSubmit: 'Prepare inquiry email', submitting: 'Sending…',
    emailNote: 'The form prepares an email in your email app. Review it and press Send there. Nothing is sent automatically.',
    endpointNote: 'Your details are used only to respond to this inquiry.',
    validation: { required: 'Please complete this field.', email: 'Please enter a valid email address.', tooLong: 'Please shorten this answer.', option: 'Please choose one of the listed options.', summary: 'Please check the highlighted fields.' },
    sentTitle: 'Your inquiry is on its way.', sentMessage: 'Thanks for sharing your project. I reply within 24 hours.',
    preparedTitle: 'Your inquiry email is ready.', preparedMessage: 'Your email app should open with your project details. Press Send there to finish. If it did not open, use the email link below.',
    sendPrepared: 'Open prepared email', reset: 'Start another inquiry', error: 'Your inquiry could not be sent. Please try again or email me directly.',
    subject: 'System project inquiry',
  },
  footer: {
    line: 'Less paperwork. More time for your team.',
    privacy: 'Privacy: your inquiry details are used only to reply and discuss your project. No advertising trackers are enabled by default.',
    analyticsPrivacy: 'Privacy: your inquiry details are used only to reply and discuss your project. Privacy-friendly analytics are enabled; no advertising trackers are used.',
  },
};

export const isPlaceholder = (value) => !value || /\[ADD[^\]]*\]/i.test(String(value));
export const isWebUrl = (value) => {
  if (isPlaceholder(value)) return false;
  try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
};
