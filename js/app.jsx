import React, { useEffect, useRef, useState } from "react";
import { content as c, isPlaceholder, isWebUrl } from "./content.js";

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
  ) : (
    <span className="pending-link">
      {children} <span>{c.ui.pendingLink}</span>
    </span>
  );
}
function SocialLinks() {
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
  return (
    <header className="site-header">
      <div className="container nav">
        <a
          href="#top"
          className="brand"
          aria-label={`${c.identity.initials}. ${c.identity.shortName}: ${c.ui.home}`}
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
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document.getElementById("menu-button").focus();
            }
          }}
        >
          {c.nav.links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <ButtonLink data-event="Book call">{c.nav.cta}</ButtonLink>
        <button
          id="menu-button"
          type="button"
          className="menu-toggle"
          aria-label={c.ui.menuLabel}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name="menu" />
        </button>
      </div>
    </header>
  );
}
function WorkflowPreview() {
  const m = c.hero.mockup;
  return (
    <figure className="product-preview">
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
      <figcaption>{m.caption}</figcaption>
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
                  {["context", "problem", "solution", "result"].map((key) => (
                    <div
                      key={key}
                      className={key === "result" ? "case-result" : ""}
                    >
                      <dt>{c.ui[key]}</dt>
                      <dd>{item[key]}</dd>
                    </div>
                  ))}
                </dl>
                <div className="case-stack">
                  <h4>{c.ui.stack}</h4>
                  <ul>
                    {item.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
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
              <p>{tier.description}</p>
              <p className="price">
                <span>{c.ui.from}</span>
                {tier.price}
              </p>
              <ul>
                {tier.includes.map((line) => (
                  <li key={line}>
                    <Icon name="check" />
                    {line}
                  </li>
                ))}
              </ul>
              <ButtonLink secondary href="#contact">
                {c.ui.next}
              </ButtonLink>
            </article>
          ))}
        </div>
        <p className="pricing-note">{c.pricing.note}</p>
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
            <span>{c.about.photoPlaceholder}</span>
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
  const [mailHref, setMailHref] = useState("");
  const successRef = useRef(null),
    pendingRef = useRef(false);
  const endpoint = isWebUrl(c.settings.formEndpoint)
    ? c.settings.formEndpoint
    : "";
  useEffect(() => {
    if (["sent", "prepared"].includes(status)) successRef.current?.focus();
  }, [status]);
  async function submit(event) {
    event.preventDefault();
    if (pendingRef.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) {
      setStatus("sent");
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
    if (!endpoint) {
      const body = c.contact.fields
        .map((field) => `${field.label}: ${payload[field.name]}`)
        .join("\n\n");
      const href = `mailto:${c.identity.email}?subject=${encodeURIComponent(`${c.contact.subject}: ${payload.organization}`)}&body=${encodeURIComponent(body)}`;
      setMailHref(href);
      setStatus("prepared");
      return;
    }
    pendingRef.current = true;
    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Inquiry was not accepted");
      setStatus("sent");
      window.plausible?.("Inquiry sent");
    } catch {
      setStatus("error");
    } finally {
      pendingRef.current = false;
    }
  }
  if (["sent", "prepared"].includes(status))
    return (
      <div
        className="form-success"
        ref={successRef}
        tabIndex="-1"
        role="status"
      >
        <Icon name="check" />
        <h3>
          {status === "sent" ? c.contact.sentTitle : c.contact.preparedTitle}
        </h3>
        <p>
          {status === "sent"
            ? c.contact.sentMessage
            : c.contact.preparedMessage}
        </p>
        {status === "prepared" && (
          <a className="text-link" href={mailHref}>
            {c.contact.sendPrepared}
          </a>
        )}
        <a className="text-link" href={`mailto:${c.identity.email}`}>
          {c.identity.email}
        </a>
        <button
          className="button button--secondary"
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
        >
          {c.contact.reset}
        </button>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-labelledby="form-title"
      aria-describedby="form-note"
    >
      <h3 id="form-title">{c.contact.formTitle}</h3>
      <div className="form-grid">
        {c.contact.fields.map((field) => {
          const props = {
            id: `field-${field.name}`,
            name: field.name,
            required: field.required,
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
          name="website"
          type="text"
          tabIndex="-1"
          autoComplete="off"
        />
      </div>
      <div role="alert" className="form-alert">
        {Object.keys(errors).length > 0 && c.contact.validation.summary}
        {status === "error" && c.contact.error}
      </div>
      <button
        className="button button--primary"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending"
          ? c.contact.submitting
          : endpoint
            ? c.contact.submit
            : c.contact.emailSubmit}
        <Icon name="arrow" />
      </button>
      <p id="form-note" className="form-note">
        {endpoint ? c.contact.endpointNote : c.contact.emailNote}
      </p>
    </form>
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
            {!isPlaceholder(c.identity.domainEmail) ? (
              <a href={`mailto:${c.identity.domainEmail}`}>
                {c.identity.domainEmail}
              </a>
            ) : (
              <p className="placeholder">{c.identity.domainEmail}</p>
            )}
          </div>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {c.identity.shortName}.{" "}
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
      <main id="main" tabIndex="-1">
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
