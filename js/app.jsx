import React, { useEffect, useRef, useState } from "react";
import {
  gsap,
  useGSAP,
  motionQuery,
  revealOnScroll,
  usePortfolioMotion,
} from "./motion.js";
import {
  content as c,
  isPlaceholder,
  isWebUrl,
  isConfiguredFormspreeEndpoint,
} from "./content.js";

// AEGIS and EAC systems, branding, and screenshots remain excluded pending employer clearance.
const bookingHref = isWebUrl(c.settings.calendarUrl)
  ? c.settings.calendarUrl
  : "#contact";
const externalProps = (href) =>
  isWebUrl(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

function Icon({ name, ...props }) {
  const paths = {
    arrow: "M5 12h14m-6-6 6 6-6 6",
    calendar: "M5 5h14v15H5zM8 3v4m8-4v4M5 10h14m-10 4h2m2 0h2m-6 3h2",
    clock: "M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
    workflow: "M4 4h6v6H4zM14 14h6v6h-6zM10 7h7v7M7 10v7h7",
    check: "m5 12 4 4L19 6",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "M6 6l12 12M18 6 6 18",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
function ButtonLink({
  children,
  href = bookingHref,
  secondary = false,
  ...props
}) {
  return (
    <a
      className={`button ${secondary ? "button--secondary" : "button--primary"}`}
      href={href}
      {...externalProps(href)}
      {...props}
    >
      {children}
      <Icon name="arrow" />
    </a>
  );
}
function ConfigLink({ href, children }) {
  return isWebUrl(href) ? (
    <a href={href} {...externalProps(href)}>
      {children}
      <Icon name="arrow" />
    </a>
  ) : null;
}
function SocialLinks() {
  if (![c.identity.github, c.identity.linkedin].some(isWebUrl)) return null;
  return (
    <div className="social-links" aria-label={c.ui.socialLabel}>
      <ConfigLink href={c.identity.github}>{c.ui.github}</ConfigLink>
      <ConfigLink href={c.identity.linkedin}>{c.ui.linkedin}</ConfigLink>
    </div>
  );
}
function SectionHeading({ section, id }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{section.eyebrow}</p>
      <h2 id={id}>{section.title}</h2>
      {section.description && <p>{section.description}</p>}
    </div>
  );
}
function Navigation() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  return (
    <header
      className="site-header"
      ref={headerRef}
      onBlur={(event) => {
        if (open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <div className="container nav">
        <a
          href="#top"
          className="brand"
          aria-label={`${c.identity.initials}. ${c.identity.shortName}: ${c.ui.home}`}
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            {c.identity.initials}
            <span>.</span>
          </span>
          <span className="brand-name">{c.identity.shortName}</span>
        </a>
        <nav
          id="main-navigation"
          className={`nav-links ${open ? "is-open" : ""}`}
          aria-label={c.ui.navigationLabel}
        >
          {c.nav.links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <ButtonLink data-event="Book call" aria-label={c.nav.cta} onClick={() => setOpen(false)}>
          <span className="nav-cta-label">{c.nav.cta}</span>
          <span className="nav-cta-label--compact">{c.nav.mobileCta}</span>
        </ButtonLink>
        <button
          id="menu-button"
          ref={menuButtonRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? c.ui.menuCloseLabel : c.ui.menuLabel}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((previous) => !previous)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
function WorkflowPreview() {
  const m = c.hero.mockup;
  const previewRef = useRef(null);
  const workflowRef = useRef(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionEnabled(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motionQuery, (context) => {
        const preview = previewRef.current;
        const cards = Array.from(
          preview.querySelectorAll(".preview-overview > div"),
        );
        const table = preview.querySelector(".preview-table");
        const rows = Array.from(table.querySelectorAll("tbody tr"));

        revealOnScroll(context, [preview], { distance: 28, duration: 0.9 });
        revealOnScroll(context, cards, { distance: 12, duration: 0.6 });

        const workflow = gsap.timeline({
          scrollTrigger: { trigger: table, start: "top 76%", once: true },
        });
        workflowRef.current = workflow;
        rows.forEach((row, index) => {
          const at = 0.15 + index * 0.95;
          const card = cards[index];
          const check = row.querySelector("svg path");
          const background = getComputedStyle(row).backgroundColor;
          workflow
            .fromTo(
              row,
              {
                backgroundColor: background,
                boxShadow: "inset 3px 0 0 transparent",
              },
              {
                backgroundColor: "#2e3035",
                boxShadow: "inset 3px 0 0 #c72c35",
                duration: 0.3,
                immediateRender: false,
              },
              at,
            )
            .to(
              row,
              {
                backgroundColor: background,
                boxShadow: "none",
                duration: 0.45,
                clearProps: "backgroundColor,boxShadow",
              },
              at + 0.7,
            );
          if (card) {
            const border = getComputedStyle(card).borderColor;
            workflow
              .fromTo(
                card,
                { borderColor: border },
                {
                  borderColor: "#bd6a70",
                  duration: 0.3,
                  immediateRender: false,
                },
                at,
              )
              .to(
                card,
                {
                  borderColor: border,
                  duration: 0.45,
                  clearProps: "borderColor",
                },
                at + 0.7,
              );
          }
          if (check) {
            const length = check.getTotalLength();
            workflow.fromTo(
              check,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                duration: 0.6,
                ease: "power2.out",
                immediateRender: false,
                clearProps: "strokeDasharray,strokeDashoffset",
              },
              at + 0.15,
            );
          }
        });
        workflow.from(preview.querySelector(".workspace-footer svg"), {
          scale: 0.8,
          duration: 0.4,
          ease: "power2.out",
          transformOrigin: "center",
          clearProps: "transform",
        });
        return () => {
          workflowRef.current = null;
        };
      });
      // Revert styles and triggers immediately if reduced motion is enabled or this unmounts.
      return () => media.revert();
    },
    { scope: previewRef },
  );
  return (
    <figure className="product-preview" ref={previewRef}>
      <div className="browser-bar">
        <span className="browser-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{m.browserLabel}</span>
        <span className="sample-label">{m.badge}</span>
      </div>
      <div className="workspace">
        <div className="workspace-sidebar" aria-hidden="true">
          <strong>{m.sidebarTitle}</strong>
          {m.sidebar.map((label, i) => (
            <div key={label} className={i === 0 ? "active" : ""}>
              <Icon name={["workflow", "calendar", "clock", "check"][i]} />
              {label}
            </div>
          ))}
          <span className="workspace-monogram">{c.identity.initials}</span>
        </div>
        <div className="workspace-main">
          <h2>{m.heading}</h2>
          <p>{m.subtitle}</p>
          <div className="preview-overview grid grid-cols-1 md:grid-cols-3">
            {m.overview.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="preview-table">
            <h3>{m.tableTitle}</h3>
            <table>
              <thead>
                <tr>
                  {m.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {m.rows.map((row) => (
                  <tr key={row.task}>
                    <td>{row.task}</td>
                    <td>
                      <span>
                        <Icon name="check" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="workspace-footer">
            <Icon name="check" />
            {m.footer}
          </p>
        </div>
      </div>
      <figcaption>
        <span>{m.caption}</span>
        <button
          className="workspace-replay"
          type="button"
          title={m.motionHint}
          disabled={!motionEnabled}
          onClick={() => {
            if (motionEnabled) workflowRef.current?.restart();
          }}
        >
          {m.replayLabel}
          <Icon name="arrow" />
        </button>
      </figcaption>
    </figure>
  );
}
function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-intro">
        <p className="availability">
          <span aria-hidden="true" />
          {c.settings.availability}
        </p>
        <p className="eyebrow">{c.hero.eyebrow}</p>
        <h1 id="hero-title">{c.hero.title}</h1>
        <p className="hero-description">{c.hero.description}</p>
        <div className="hero-actions">
          <ButtonLink data-event="Book call">{c.hero.primary}</ButtonLink>
          <ButtonLink secondary href={c.hero.secondaryHref}>
            {c.hero.secondary}
          </ButtonLink>
        </div>
        <p className="hero-note">{c.hero.note}</p>
      </div>
      <WorkflowPreview />
    </section>
  );
}
function Services() {
  const stats = c.stats.filter((stat) => !isPlaceholder(stat.value));
  return (
    <section
      id="services"
      className="section container"
      aria-labelledby="services-title"
    >
      <SectionHeading section={c.services} id="services-title" />
      <div className="services-grid grid grid-cols-1 lg:grid-cols-3">
        {c.services.items.map((item) => (
          <article className="service-card" key={item.title}>
            <Icon name={item.icon} className="service-icon" />
            <h3>{item.title}</h3>
            <p>
              <span className="sr-only">{c.services.audienceLabel}: </span>
              {item.audience}
            </p>
            <h4>{c.services.includesLabel}</h4>
            <ul>
              {item.deliverables.map((line) => (
                <li key={line}>
                  <Icon name="check" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="service-timeline">
              <span>{c.services.timelineLabel}</span>
              <p>{item.timeline}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="fine-print">{c.services.timelineNote}</p>
      <div className="stack-strip">
        <p>{c.services.stackLabel}</p>
        <ul>
          {c.services.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      {stats.length > 0 && (
        <dl className="client-stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
function CaseStudies() {
  return (
    <section
      id="work"
      className="section section--surface"
      aria-labelledby="work-title"
    >
      <div className="container">
        <SectionHeading section={c.work} id="work-title" />
        <div className="case-grid grid grid-cols-1 lg:grid-cols-3">
          {c.work.items.map((item) => (
            <article className="case-study" key={item.id}>
              <a
                className={`case-image case-image--${item.id}`}
                href={item.image.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.ui.screenshots}: ${item.title}`}
              >
                <img
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 700px, 90vw"
                  width={item.image.width}
                  height={item.image.height}
                  alt={item.image.alt}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="case-body">
                <p className="case-type">{item.type}</p>
                <h3>{item.title}</h3>
                <dl>
                  {item.responsibilities?.some((line) => !isPlaceholder(line)) && (
                    <div>
                      <dt>{c.ui.responsibilities}</dt>
                      <dd>
                        <ul className="case-responsibilities">
                          {item.responsibilities
                            .filter((line) => !isPlaceholder(line))
                            .map((line) => <li key={line}>{line}</li>)}
                        </ul>
                      </dd>
                    </div>
                  )}
                  {["context", "problem", "solution", "result"]
                    .filter((key) => !isPlaceholder(item[key]))
                    .map((key) => (
                      <div
                        key={key}
                        className={key === "result" ? "case-result" : ""}
                      >
                        <dt>{c.ui[key]}</dt>
                        <dd>{item[key]}</dd>
                      </div>
                    ))}
                  {["challenge", "resolution"]
                    .filter((key) => !isPlaceholder(item[key]))
                    .map((key) => (
                      <div key={key}>
                        <dt>{c.ui[key]}</dt>
                        <dd>{item[key]}</dd>
                      </div>
                    ))}
                </dl>
                {item.stack.length > 0 && (
                  <div className="case-stack">
                    <h4>{c.ui.stack}</h4>
                    <ul>
                      {item.stack.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="case-links">
                  <a
                    href={item.image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.ui.screenshots}
                    <Icon name="arrow" />
                  </a>
                  <ConfigLink href={item.demo}>{c.ui.demo}</ConfigLink>
                  <ConfigLink href={item.github}>{c.ui.repository}</ConfigLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Process() {
  return (
    <section
      id="process"
      className="section container"
      aria-labelledby="process-title"
    >
      <SectionHeading section={c.process} id="process-title" />
      <ol className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {c.process.items.map((step, i) => (
          <li key={step.title}>
            <span className="step-number" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
function Pricing() {
  return (
    <section
      id="pricing"
      className="section section--surface"
      aria-labelledby="pricing-title"
    >
      <div className="container">
        <SectionHeading section={c.pricing} id="pricing-title" />
        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3">
          {c.pricing.items.map((tier) => (
            <article className="price-card" key={tier.title}>
              <h3>{tier.title}</h3>
              <p className="pricing-audience">
                <span>{c.pricing.audienceLabel}: </span>
                {tier.description}
              </p>
              <p className="price">
                <span>{c.pricing.priceLabel} </span>
                {tier.price}
              </p>
              <h4 className="pricing-includes">
                {tier.includesLabel || c.pricing.includesLabel}
              </h4>
              <ul>
                {tier.includes.map((line) => (
                  <li key={line}>
                    <Icon name="check" />
                    {line}
                  </li>
                ))}
              </ul>
              {tier.scopeNote && (
                <p className="pricing-scope">{tier.scopeNote}</p>
              )}
              <div className="pricing-card-footer">
                {tier.timeline && (
                  <p className="pricing-delivery">
                    <span>{c.pricing.deliveryLabel}: </span>
                    {tier.timeline}
                  </p>
                )}
                <ButtonLink secondary href="#contact">
                  {c.pricing.cta}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
        <p className="pricing-note">{c.pricing.note}</p>
        {c.pricing.addons?.items.length > 0 && (
          <div
            className="pricing-addons"
            aria-labelledby="pricing-addons-title"
          >
            <h3 id="pricing-addons-title">{c.pricing.addons.title}</h3>
            <dl>
              {c.pricing.addons.items.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.price}</dd>
                </div>
              ))}
            </dl>
            <p>{c.pricing.addons.note}</p>
          </div>
        )}
      </div>
    </section>
  );
}
function About() {
  return (
    <section
      id="about"
      className="section container about"
      aria-labelledby="about-title"
    >
      <figure className="about-photo">
        {!isPlaceholder(c.identity.photo.src) ? (
          <img
            src={c.identity.photo.src}
            width={c.identity.photo.width}
            height={c.identity.photo.height}
            alt={c.identity.photo.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="photo-slot">
            <span className="photo-monogram" aria-hidden="true">
              {c.identity.initials}
              <span>.</span>
            </span>
            <span>{c.identity.shortName}</span>
          </div>
        )}
        <figcaption>{c.about.photoNote}</figcaption>
      </figure>
      <div>
        <SectionHeading section={c.about} id="about-title" />
        {c.about.paragraphs.map((paragraph) => (
          <p className="about-paragraph" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <SocialLinks />
      </div>
    </section>
  );
}
export function Testimonials() {
  const quotes = c.testimonials.items
    .filter(
      (item) =>
        item.quote &&
        item.name &&
        !isPlaceholder(item.quote) &&
        !isPlaceholder(item.name),
    )
    .slice(0, 3);
  if (!quotes.length) return null;
  return (
    <section className="section container" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">{c.testimonials.title}</h2>
      <div className="testimonials-grid">
        {quotes.map((quote, i) => (
          <figure key={i}>
            <blockquote>
              <p>{quote.quote}</p>
            </blockquote>
            <figcaption>
              {quote.name}
              {quote.role && <span>{quote.role}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
function FAQItem({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="faq-item" open={open}>
      <summary
        id={`faq-question-${i}`}
        aria-expanded={open}
        aria-controls={`faq-answer-${i}`}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {item.question}
        <span aria-hidden="true">{c.ui.faqToggle}</span>
      </summary>
      <div
        id={`faq-answer-${i}`}
        role="region"
        aria-labelledby={`faq-question-${i}`}
      >
        <p>{item.answer}</p>
      </div>
    </details>
  );
}
function FAQ() {
  return (
    <section
      id="faq"
      className="section section--surface"
      aria-labelledby="faq-title"
    >
      <div className="container faq-layout">
        <SectionHeading section={c.faq} id="faq-title" />
        <div>
          {c.faq.items.map((item, i) => (
            <FAQItem key={item.question} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
export function validateInquiry(values) {
  const errors = {};
  for (const field of c.contact.fields) {
    const value = String(values[field.name] || "").trim();
    if (field.required && !value)
      errors[field.name] = c.contact.validation.required;
    else if (
      field.type === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    )
      errors[field.name] = c.contact.validation.email;
    else if (field.maxLength && value.length > field.maxLength)
      errors[field.name] = c.contact.validation.tooLong;
    else if (field.options && !field.options.includes(value))
      errors[field.name] = c.contact.validation.option;
  }
  return errors;
}
function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const successRef = useRef(null),
    pendingRef = useRef(false),
    requestRef = useRef(null);
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);
  useEffect(() => {
    if (status === "error") {
      const firstError = Object.keys(errors)[0];
      // Run after React re-enables any select rejected by server validation.
      if (firstError) document.getElementById(`field-${firstError}`)?.focus();
    }
  }, [errors, status]);
  useEffect(() => () => requestRef.current?.abort(), []);
  async function submit(event) {
    event.preventDefault();
    if (pendingRef.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setFeedback("");
    setErrors({});
    setStatus("idle");
    // Block filled traps locally. Formspree also receives the empty _gotcha field.
    // A blocked submission must never be presented as delivered.
    if (String(data._gotcha || "").trim()) {
      setStatus("error");
      setFeedback(c.contact.error);
      return;
    }
    const nextErrors = validateInquiry(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.elements.namedItem(Object.keys(nextErrors)[0]).focus();
      return;
    }
    const payload = Object.fromEntries(
      c.contact.fields.map((field) => [field.name, data[field.name].trim()]),
    );
    if (!isConfiguredFormspreeEndpoint(c.settings.formEndpoint)) {
      setStatus("error");
      setFeedback(c.contact.unavailable);
      return;
    }
    pendingRef.current = true;
    setStatus("sending");
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort("timeout"), 15000);
    try {
      const response = await fetch(c.settings.formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          message: payload.need,
          _subject: c.contact.subject,
          _gotcha: "",
        }),
        signal: controller.signal,
        redirect: "error",
      });
      if (response.status === 429) {
        setFeedback(c.contact.rateLimit);
        setStatus("error");
        return;
      }
      // A redirect, HTML page, malformed body, or explicit API error cannot confirm success.
      const result = await response.json();
      // Formspree's current client recognizes the JSON `next` field as confirmation.
      // We display our own success state and never navigate to that URL.
      const confirmed =
        response.ok &&
        result &&
        typeof result === "object" &&
        !Array.isArray(result) &&
        typeof result.next === "string" &&
        result.ok !== false &&
        !("error" in result) &&
        !("errors" in result);
      if (!confirmed) {
        const serverErrors = {};
        if (Array.isArray(result?.errors)) {
          for (const error of result.errors) {
            const field = error?.field === "message" ? "need" : error?.field;
            if (c.contact.fields.some((item) => item.name === field)) {
              serverErrors[field] = c.contact.validation.server;
            }
          }
        }
        setErrors(serverErrors);
        throw new Error("Inquiry was not confirmed");
      }
      form.reset();
      setStatus("sent");
      // Optional analytics must not turn an accepted inquiry into a failure.
      try {
        window.plausible?.("Inquiry sent");
      } catch {
        // Submission is already confirmed.
      }
    } catch {
      if (!controller.signal.aborted || controller.signal.reason === "timeout") {
        setFeedback(
          controller.signal.reason === "timeout" ? c.contact.timeout : c.contact.error,
        );
        setStatus("error");
      }
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
      pendingRef.current = false;
    }
  }
  if (status === "sent")
    return (
      <div
        className="form-success"
        ref={successRef}
        tabIndex="-1"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <Icon name="check" />
        <h3>{c.contact.sentTitle}</h3>
        <p>{c.contact.sentMessage}</p>
        <button
          className="button button--secondary"
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrors({});
            setFeedback("");
          }}
        >
          {c.contact.reset}
        </button>
      </div>
    );
  return (
    <>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {status === "sending" ? c.contact.submitting : ""}
      </p>
      <form
        className="contact-form"
        onSubmit={submit}
        noValidate
        aria-labelledby="form-title"
        aria-describedby="form-note"
        aria-busy={status === "sending"}
      >
        <h3 id="form-title">{c.contact.formTitle}</h3>
        <div className="form-grid">
          {c.contact.fields.map((field) => {
            const props = {
              id: `field-${field.name}`,
              name: field.name,
              required: field.required,
              readOnly: status === "sending" && field.type !== "select",
              disabled: status === "sending" && field.type === "select",
              "aria-invalid": !!errors[field.name],
              "aria-describedby": errors[field.name]
                ? `error-${field.name}`
                : undefined,
            };
            return (
              <div
                className={`form-field ${["organization", "need"].includes(field.name) ? "form-field--full" : ""}`}
                key={field.name}
              >
                <label htmlFor={props.id}>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    {...props}
                    placeholder={field.placeholder}
                    rows="4"
                    maxLength={field.maxLength}
                  />
                ) : field.type === "select" ? (
                  <select {...props} defaultValue="">
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...props}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autocomplete}
                    maxLength={field.maxLength}
                  />
                )}
                {errors[field.name] && (
                  <p className="field-error" id={`error-${field.name}`}>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">{c.contact.honeypot}</label>
          <input
            id="website"
            name="_gotcha"
            type="text"
            tabIndex="-1"
            autoComplete="off"
          />
        </div>
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className="form-alert"
        >
          {status === "error"
            ? feedback
            : Object.keys(errors).length > 0 && c.contact.validation.summary}
        </div>
        <button
          className="button button--primary"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? c.contact.submitting : c.contact.submit}
          {status === "sending" ? (
            <span className="submission-spinner" aria-hidden="true" />
          ) : (
            <Icon name="arrow" />
          )}
        </button>
        <p id="form-note" className="form-note">
          {c.contact.endpointNote}
        </p>
      </form>
    </>
  );
}
function NoScriptContact() {
  return (
    <noscript>
      <p className="no-js-contact">
        {c.contact.noJsNote}{" "}
        <a href={`mailto:${c.identity.email}`}>{c.identity.email}</a>
      </p>
    </noscript>
  );
}
function Contact() {
  return (
    <section
      id="contact"
      className="section container contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-copy">
        <SectionHeading section={c.contact} id="contact-title" />
        {isWebUrl(c.settings.calendarUrl) ? (
          <ButtonLink data-event="Book call">
            {c.contact.calendarLabel}
          </ButtonLink>
        ) : (
          <p className="calendar-fallback">{c.contact.calendarFallback}</p>
        )}
        <p className="reply-note">
          <Icon name="clock" />
          {c.contact.replyNote}
        </p>
        <div className="contact-email">
          <p>{c.contact.emailLabel}</p>
          <a href={`mailto:${c.identity.email}`}>{c.identity.email}</a>
        </div>
      </div>
      <ContactForm />
      <NoScriptContact />
    </section>
  );
}
function Footer() {
  const footerEmail = isPlaceholder(c.identity.domainEmail)
    ? c.identity.email
    : c.identity.domainEmail;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a className="brand" href="#top">
              {c.identity.shortName}
              <span>.</span>
            </a>
            <p>{c.footer.line}</p>
          </div>
          <div>
            <p>{c.identity.location}</p>
            <a href={`mailto:${footerEmail}`}>{footerEmail}</a>
          </div>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <p>
            Â© {new Date().getFullYear()} {c.identity.shortName}.{" "}
            {c.ui.copyright}
          </p>
          <p>
            {c.settings.analytics.enabled
              ? c.footer.analyticsPrivacy
              : c.footer.privacy}
          </p>
        </div>
      </div>
    </footer>
  );
}
export default function App() {
  const mainRef = useRef(null);
  usePortfolioMotion(mainRef);
  useEffect(() => {
    if (
      !c.settings.analytics.enabled ||
      isPlaceholder(c.settings.analytics.domain) ||
      !isWebUrl(c.settings.analytics.scriptUrl)
    )
      return;
    window.plausible =
      window.plausible ||
      function (...args) {
        (window.plausible.q = window.plausible.q || []).push(args);
      };
    const script = document.createElement("script");
    script.defer = true;
    script.src = c.settings.analytics.scriptUrl;
    script.dataset.domain = c.settings.analytics.domain;
    document.head.append(script);
    const click = (event) => {
      const link = event.target.closest("[data-event]");
      if (link) window.plausible(link.dataset.event);
    };
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
      script.remove();
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        {c.ui.skip}
      </a>
      <Navigation />
      <main id="main" tabIndex="-1" ref={mainRef}>
        <Hero />
        <section className="problem-strip" aria-labelledby="problem-title">
          <div className="container">
            <h2 id="problem-title">{c.problem.title}</h2>
            <div>
              <p>{c.problem.description}</p>
              <p className="problem-conclusion">{c.problem.conclusion}</p>
            </div>
          </div>
        </section>
        <Services />
        <CaseStudies />
        <Process />
        <Pricing />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
