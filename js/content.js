// Edit this file, then run `npm run build`. All public copy and editable settings live here.
// AEGIS and all EAC branding/screenshots are excluded pending employer clearance.
// Never add a client name, result, metric, or testimonial without verified permission/evidence.
export const content = {
  identity: {
    name: "Vincent Gabrielle Pimentel",
    shortName: "Vincent Pimentel",
    initials: "VP",
    email: "vincentgabriellepimentel@gmail.com",
    phone: "09273537500",
    domainEmail: "",
    location: "Manila, Philippines",
    address: { locality: "Manila", country: "PH" },
    github: "https://github.com/Dcane4ever/my-portfolio",
    linkedin: "",
    photo: {
      src: "",
      alt: "Vincent Gabrielle Pimentel",
      width: 640,
      height: 800,
    },
  },
  settings: {
    siteUrl: "https://dcane4ever.github.io/my-portfolio/",
    calendarUrl: "",
    availability: "Taking 1-2 projects at a time",
    formEndpoint: "", // Optional HTTPS POST endpoint accepting JSON; must return 2xx only after accepting the inquiry.
    analytics: {
      enabled: false,
      domain: "",
      scriptUrl: "https://plausible.io/js/script.js",
    },
  },
  seo: {
    title: "Websites & Business Systems | Vincent Pimentel, Manila",
    description:
      "Practical websites, booking tools, and administrative systems for schools and small businesses. Explore introductory pricing and request a project quote.",
    serviceName: "Vincent Pimentel — Websites & Business Tools",
    previewImage: "assets/social-preview.png",
    previewAlt: "Vincent Pimentel — less paperwork, more time for your team.",
    serviceType: [
      "Small business websites",
      "Booking and reservation systems",
      "Attendance and DTR systems",
      "Admin dashboards and workflow automation",
    ],
  },
  ui: {
    skip: "Skip to content",
    menu: "Menu",
    menuLabel: "Toggle navigation",
    home: "Go to home",
    navigationLabel: "Main navigation",
    socialLabel: "Social links",
    github: "GitHub",
    linkedin: "LinkedIn",
    stack: "Stack",
    context: "Context",
    problem: "Problem",
    solution: "Solution",
    result: "Result",
    demo: "Live demo",
    repository: "GitHub",
    screenshots: "View screenshot",
    processNumberLabel: "Step",
    faqToggle: "+",
    copyright: "All rights reserved.",
  },
  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
    ],
    cta: "Book a free call",
  },
  hero: {
    eyebrow: "Practical systems. Personal support.",
    title:
      "I build practical web applications, booking systems, and business tools that simplify everyday operations.",
    description:
      "Responsive websites and Spring Boot or Laravel systems, with an agreed scope, clear handover, and support options for your team.",
    primary: "Book a free 20-min call",
    secondary: "See how it works",
    secondaryHref: "#process",
    note: "Tell me what slows your team down. We’ll find a practical next step.",
    mockup: {
      caption: "Illustrative workflow preview — not a client system.",
      replayLabel: "Replay animation",
      motionHint: "Animation respects your reduced-motion preference.",
      title: "One place to keep the day moving.",
      browserLabel: "Your team workspace",
      sidebarTitle: "Daily operations",
      sidebar: ["Overview", "Bookings", "Attendance", "Reports"],
      heading: "Today, without the paper trail.",
      subtitle: "Bookings and attendance, together in one view.",
      badge: "Sample data",
      overview: [
        { label: "Bookings", value: "All in one place" },
        { label: "Attendance", value: "Ready to review" },
        { label: "Reports", value: "Easy to find" },
      ],
      tableTitle: "Your daily workflow",
      columns: ["Task", "Next step"],
      rows: [
        { task: "Review a booking", status: "Confirm availability" },
        { task: "Check a time record", status: "Review attendance" },
        { task: "Prepare a report", status: "Export records" },
      ],
      footer: "Less chasing updates. More getting things done.",
    },
  },
  problem: {
    title: "Your team has better things to do than chase paperwork.",
    description:
      "Paper logs. Spreadsheets. Group chats. Manual enrollment and booking. When information lives everywhere, even a simple update takes too long.",
    conclusion: "Bring the work into one clear system.",
  },
  services: {
    eyebrow: "What I can build for you",
    title: "Less admin. A clearer working day.",
    description:
      "Start with the task that takes up the most time. Build only what your team needs.",
    audienceLabel: "For",
    includesLabel: "You get",
    timelineLabel: "Planning estimate",
    items: [
      {
        icon: "calendar",
        title: "Booking and reservation systems",
        audience: "Schools, hotels, and appointment-based businesses.",
        deliverables: [
          "Availability and booking in one place",
          "Clear confirmations and staff controls",
          "A booking flow that works on phones",
        ],
        timeline: "3–6 weeks for a focused first version.",
      },
      {
        icon: "clock",
        title: "Attendance and DTR systems",
        audience: "School administrators and teams tracking staff time.",
        deliverables: [
          "Daily time records and attendance logs",
          "Supervisor review and approvals",
          "Reports your admin team can use",
        ],
        timeline: "4–8 weeks, depending on your rules.",
      },
      {
        icon: "workflow",
        title: "Admin dashboards and workflow automation",
        audience: "Small businesses with repeat admin work.",
        deliverables: [
          "One place to track tasks and requests",
          "Clear roles, statuses, and approvals",
          "Less copying between spreadsheets",
        ],
        timeline: "3–8 weeks for an agreed workflow.",
      },
    ],
    timelineNote:
      "These are planning estimates, not past delivery metrics. Your proposal confirms the scope and schedule.",
    stackLabel: "Built with dependable tools",
    stack: ["Spring Boot · Java 17", "Laravel · PHP", "MySQL"],
  },
  stats: [
    { label: "Systems delivered", value: null },
    { label: "Users served", value: null },
    { label: "Average delivery time", value: null },
  ],
  work: {
    eyebrow: "Selected work",
    title: "A closer look at the systems.",
    description:
      "Project interfaces from the saved screenshots. These previews are not client endorsements or evidence of a live deployment.",
    items: [
      {
        id: "dtr",
        title: "DTR Supervisor and Workflow System",
        type: "Attendance interface preview",
        context:
          "A daily time record interface with separate supervisor and employee views in the saved screenshots.",
        problem: "",
        solution:
          "The screens show time-in controls, daily records, schedule views, and links to time-record requests and print summaries.",
        result: "",
        stack: [],
        image: {
          source: "css/images/DTR3.png",
          src: "assets/dtr-960.webp",
          srcSet: "assets/dtr-480.webp 480w, assets/dtr-960.webp 960w",
          alt: "Daily time record system sign-in screen",
          width: 376,
          height: 448,
        },
        demo: "",
        github: "",
      },
      {
        id: "pearl",
        title: "Pearl Manila Hotel Booking prototype",
        type: "Booking prototype · not a client endorsement",
        context:
          "A hotel website and booking UX prototype, presented as interface work.",
        problem: "",
        solution:
          "The saved page shows hotel information, amenities, and navigation for rooms, facilities, check-in, and login.",
        result: "",
        stack: [],
        image: {
          source: "css/images/PRL1.png",
          src: "assets/pearl-960.webp",
          srcSet: "assets/pearl-480.webp 480w, assets/pearl-960.webp 960w",
          alt: "Pearl Manila Hotel booking prototype page",
          width: 1280,
          height: 760,
        },
        demo: "",
        github: "",
      },
      {
        id: "carwash",
        title: "Car Wash Management System",
        type: "Car wash website interface preview",
        context:
          "A car wash website interface with service-package and account-registration screens in the repository.",
        problem: "",
        solution:
          "The saved screens show basic wash, premium detailing, and express service descriptions, along with sign-in and create-account interfaces.",
        result: "",
        stack: [],
        image: {
          source: "css/images/CAR3.png",
          src: "assets/carwash-960.webp",
          srcSet: "assets/carwash-480.webp 480w, assets/carwash-960.webp 960w",
          alt: "Car wash management system service packages page",
          width: 1246,
          height: 700,
        },
        demo: "",
        github: "",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "A clear plan. No guessing what happens next.",
    items: [
      {
        title: "Discovery call",
        description:
          "We spend 20 minutes on your current process, your team, and what needs to change.",
      },
      {
        title: "Fixed-scope proposal",
        description:
          "You get a written scope, a price, a timeline, and clear deliverables before work starts.",
      },
      {
        title: "Build with weekly demos",
        description:
          "See progress each week. Try the workflow and give feedback while it is being built.",
      },
      {
        title: "Launch and support",
        description:
          "I help with launch, train your team, and provide the support agreed in your proposal.",
      },
    ],
  },
  pricing: {
    eyebrow: "Budget planning",
    title: "Choose a starting point. Scope it together.",
    description:
      "Introductory packages for small businesses in the Philippines. Start with what you need and confirm the scope before work begins.",
    audienceLabel: "Best for",
    priceLabel: "Starting at",
    includesLabel: "Includes",
    deliveryLabel: "Estimated delivery",
    cta: "Request a Quote",
    items: [
      {
        title: "Starter Website",
        price: "₱4,999",
        description: "Small businesses, local shops, and startups.",
        includes: [
          "One-page responsive website",
          "Business information, services, or menu",
          "Contact buttons and Google Maps integration",
          "Mobile-friendly design",
          "One revision",
        ],
        timeline: "5–7 days",
      },
      {
        title: "Business Website",
        price: "₱8,999",
        description:
          "Cafés, clinics, restaurants, event venues, and other small businesses.",
        includes: [
          "Up to 4–5 pages",
          "Services, menu, or photo gallery",
          "Contact or inquiry form",
          "Social media links",
          "Basic SEO setup",
          "Two revision rounds",
        ],
        timeline: "1–2 weeks",
      },
      {
        title: "Custom Web System",
        price: "₱12,000",
        description:
          "Businesses that need functionality beyond a standard informational website.",
        includesLabel: "Potential features, depending on scope",
        includes: [
          "Booking or reservation features",
          "Administrative dashboards",
          "Database-backed functionality",
          "Custom workflows and reports",
        ],
        scopeNote:
          "The final price depends on the features, complexity, and requirements agreed for your project.",
      },
    ],
    note: "Prices are introductory estimates for small businesses. Domain registration, hosting, paid third-party services, additional revisions, and out-of-scope features may incur separate charges. Final pricing will be confirmed after discussing your requirements.",
    addons: {
      title: "Additional services",
      items: [
        {
          title: "Digital menu or simple business page",
          price: "₱2,500–₱4,000",
        },
        { title: "Website fixes and small updates", price: "₱500–₱1,500" },
        { title: "Additional website page", price: "₱800–₱1,500" },
        { title: "Simple booking system", price: "₱8,000–₱15,000" },
        { title: "Basic administrative dashboard", price: "₱6,000–₱12,000" },
      ],
      note: "These are starting estimates. The final quote reflects the actual scope of work.",
    },
  },
  about: {
    eyebrow: "The person behind your system",
    title: "Built by someone who understands support.",
    paragraphs: [
      "I’m Vincent, and I build practical websites and business tools for schools and small businesses.",
      "Before moving into development, I worked in customer and tech support, helping people solve problems in plain language.",
      "That experience shapes how I build: clear screens, reliable workflows, and tools non-technical staff can actually use.",
      "You work directly with me, from the first call through training and launch.",
    ],
    photoNote: "Vincent Pimentel · Manila",
  },
  testimonials: {
    title: "In their own words.",
    // Up to three consented testimonials: { quote, name, role }. Leave empty until real quotes are supplied.
    items: [],
  },
  faq: {
    eyebrow: "Before we talk",
    title: "A few things you might be wondering.",
    items: [
      {
        question: "How long does a project take?",
        answer:
          "A focused first version is usually planned in weeks. The exact schedule depends on your workflows, integrations, and how quickly we can review feedback. We agree on milestones in the proposal.",
      },
      {
        question: "How much will it cost?",
        answer:
          "The price depends on what you need built. The tiers above are starting points. After our call, I’ll give you a written scope and quote so you can decide before work begins.",
      },
      {
        question: "Who owns the code?",
        answer:
          "Code ownership, source-code handover, and any third-party licenses are set out in the written proposal. We agree on these terms before the project starts.",
      },
      {
        question: "Can you help with hosting?",
        answer:
          "Yes. I can help choose and set up hosting that fits the system. Hosting fees, account ownership, backups, and ongoing responsibilities are agreed separately. I explain the options in plain language.",
      },
      {
        question: "What happens after launch?",
        answer:
          "I train your team and provide the support included in your proposal. We agree on the support window, what it covers, and any ongoing maintenance before launch.",
      },
      {
        question: "How do revisions work?",
        answer:
          "Weekly demos give you regular chances to review the work. The proposal defines included revisions. If a request changes the agreed scope, I’ll explain the impact on price and timing before doing it.",
      },
    ],
  },
  contact: {
    eyebrow: "Let’s make the work easier",
    title: "What is slowing your team down?",
    description:
      "Bring a rough idea, a spreadsheet, or a process you’re tired of repeating. We can start there.",
    calendarLabel: "Book a free 20-min call",
    calendarFallback:
      "Want to talk first? Use the form to request a free 20-minute call.",
    replyNote: "I reply within 24 hours.",
    emailLabel: "Prefer email?",
    formTitle: "Tell me a little about your project.",
    fields: [
      {
        name: "name",
        label: "Your name",
        type: "text",
        placeholder: "Your full name",
        autocomplete: "name",
        required: true,
        maxLength: 100,
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        placeholder: "you@yourorganization.com",
        autocomplete: "email",
        required: true,
        maxLength: 254,
      },
      {
        name: "organization",
        label: "School or business",
        type: "text",
        placeholder: "Your school or business name",
        autocomplete: "organization",
        required: true,
        maxLength: 160,
      },
      {
        name: "need",
        label: "What do you need built?",
        type: "textarea",
        placeholder:
          "For example: a booking system so our staff can stop tracking appointments in group chats.",
        required: true,
        maxLength: 4000,
      },
      {
        name: "budget",
        label: "Budget range",
        type: "select",
        placeholder: "Choose a budget range",
        required: true,
        options: [
          "Under ₱5,000",
          "₱5,000–₱10,000",
          "₱10,000–₱20,000",
          "₱20,000+",
          "I need help estimating",
        ],
      },
      {
        name: "timeline",
        label: "When do you need it?",
        type: "select",
        placeholder: "Choose a timeline",
        required: true,
        options: [
          "Within a month",
          "In 1–3 months",
          "In 3+ months",
          "Flexible / exploring options",
        ],
      },
    ],
    honeypot: "Leave this field empty",
    submit: "Send project details",
    emailSubmit: "Prepare inquiry email",
    submitting: "Sending…",
    emailNote:
      "The form prepares your inquiry. Open it in your email app, review it, and press Send there. Nothing is sent automatically.",
    noJsNote: "To discuss your project, email me directly.",
    endpointNote: "Your details are used only to respond to this inquiry.",
    validation: {
      required: "Please complete this field.",
      email: "Please enter a valid email address.",
      tooLong: "Please shorten this answer.",
      option: "Please choose one of the listed options.",
      summary: "Please check the highlighted fields.",
    },
    sentTitle: "Your inquiry is on its way.",
    sentMessage: "Thanks for sharing your project. I reply within 24 hours.",
    preparedTitle: "Your inquiry email is ready.",
    preparedMessage:
      "Open the prepared email below, review your details, and press Send in your email app. If you do not use an email app, email me directly.",
    sendPrepared: "Open prepared email",
    reset: "Start another inquiry",
    error:
      "Your inquiry could not be sent. Please try again or email me directly.",
    subject: "System project inquiry",
  },
  footer: {
    line: "Less paperwork. More time for your team.",
    privacy:
      "Privacy: your inquiry details are used only to reply and discuss your project. No advertising trackers are enabled by default.",
    analyticsPrivacy:
      "Privacy: your inquiry details are used only to reply and discuss your project. Privacy-friendly analytics are enabled; no advertising trackers are used.",
  },
};

export const isPlaceholder = (value) =>
  !value || /\[ADD[^\]]*\]/i.test(String(value));
export const isWebUrl = (value) => {
  if (isPlaceholder(value)) return false;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};
