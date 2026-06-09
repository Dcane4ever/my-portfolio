/* ─── AOS ───────────────────────────────────────── */
if (window.AOS && typeof AOS.init === "function") {
  AOS.init({
    duration: 900,
    easing: "ease-out-quart",
    once: true,
    offset: 80,
    delay: 60,
  });
}

/* ─── Typed.js ──────────────────────────────────── */
const typedTarget = document.querySelector("#typed");
if (typedTarget) {
  typedTarget.textContent = "web.";

  if (window.Typed) {
    new Typed("#typed", {
      strings: ["web.", "full-stack.", "Java apps.", "clean UIs.", "real things."],
      typeSpeed: 82,
      backSpeed: 24,
      backDelay: 2600,
      startDelay: 450,
      loop: true,
      smartBackspace: true,
      showCursor: false,
    });
  }
}

/* ─── Page unlock (hero CTA / hash) ────────────────
   The page starts with class="is-locked" which hides
   the nav and locks scroll. Clicking data-unlock or
   navigating to a hash triggers the unlock.
─────────────────────────────────────────────────── */
const root = document.documentElement;
const body = document.body;
const pageTransition = document.querySelector(".page-transition");

/* ─── Interactive hero background ───────────────── */
const particleCanvas = document.querySelector("[data-particle-canvas]");
if (particleCanvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const ctx = particleCanvas.getContext("2d");
  const accent = "#a695ff";
  let width = 0;
  let height = 0;
  let particles = [];
  let rafId;
  const pointer = { x: -9999, y: -9999 };

  const resizeParticles = () => {
    const parent = particleCanvas.parentElement;
    if (!parent) return;

    width = particleCanvas.width = parent.clientWidth;
    height = particleCanvas.height = parent.clientHeight;
    const count = Math.min(56, Math.max(24, Math.floor(width / 34)));

    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      radius: Math.random() * 1.15 + 0.65,
    }));
  };

  const drawLine = (a, b, maxDistance, alphaScale) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) return;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `${accent}${Math.floor((1 - distance / maxDistance) * alphaScale).toString(16).padStart(2, "0")}`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  };

  const renderParticles = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${accent}55`;
      ctx.fill();

      drawLine(particle, pointer, 180, 34);

      for (let i = index + 1; i < particles.length; i += 1) {
        drawLine(particle, particles[i], 138, 14);
      }
    });

    rafId = requestAnimationFrame(renderParticles);
  };

  const handleParticlePointer = (event) => {
    const rect = particleCanvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  };

  const resetParticlePointer = () => {
    pointer.x = -9999;
    pointer.y = -9999;
  };

  window.addEventListener("mousemove", handleParticlePointer);
  window.addEventListener("mouseleave", resetParticlePointer);
  window.addEventListener("resize", resizeParticles);
  resizeParticles();
  renderParticles();

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", handleParticlePointer);
    window.removeEventListener("mouseleave", resetParticlePointer);
    window.removeEventListener("resize", resizeParticles);
  });
}

const animateNumber = (from, to, duration, onUpdate, onComplete) => {
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const value = from + (to - from) * progress;
    onUpdate(value);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  };

  requestAnimationFrame(tick);
};

const setTransitionOpacity = (value) => {
  if (pageTransition) {
    pageTransition.style.opacity = String(value);
  }
};

const fadeElement = (
  element,
  fromOpacity,
  toOpacity,
  fromX,
  toX,
  fromBlur,
  toBlur,
  duration,
  onComplete
) => {
  if (!element) {
    if (onComplete) onComplete();
    return;
  }

  element.style.opacity = String(fromOpacity);
  element.style.transform = `translate3d(${fromX}px, 0, 0)`;
  element.style.filter = `blur(${fromBlur}px)`;
  element.style.willChange = "opacity, transform";

  animateNumber(fromOpacity, toOpacity, duration, (value) => {
    const progress = (value - fromOpacity) / (toOpacity - fromOpacity || 1);
    const x = fromX + (toX - fromX) * progress;
    const blur = fromBlur + (toBlur - fromBlur) * progress;
    element.style.opacity = String(value);
    element.style.transform = `translate3d(${x}px, 0, 0)`;
    element.style.filter = `blur(${blur}px)`;
  }, () => {
    element.style.opacity = "";
    element.style.transform = "";
    element.style.filter = "";
    element.style.willChange = "";
    if (onComplete) onComplete();
  });
};

const unlockPage = () => {
  root.classList.remove("is-locked");
  body.classList.remove("is-locked");
  body.classList.add("is-unlocked");
};

const getTargetElement = (target) => {
  if (!target || target === "#") return;

  return document.querySelector(target);
};

const scrollToTarget = (target, behavior = "smooth") => {
  const dest = getTargetElement(target);
  if (!dest) return;

  const top = dest.getBoundingClientRect().top + window.scrollY;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("is-scrolling");
  window.scrollTo({
    top,
    left: 0,
    behavior: reducedMotion ? "auto" : behavior,
  });

  window.setTimeout(() => {
    root.classList.remove("is-scrolling");
  }, 900);
};

const revealTargetAfterTransition = (target) => {
  const dest = getTargetElement(target);
  if (!dest) return;

  const targetItems = dest.querySelectorAll(".reveal-item");
  const aosItems = dest.querySelectorAll("[data-aos]");
  dest.classList.add("is-transition-target");
  dest.classList.remove("is-transition-ready");
  targetItems.forEach((item) => item.classList.remove("in-view"));

  scrollToTarget(target, "auto");

  requestAnimationFrame(() => {
    dest.classList.add("is-transition-ready");
    targetItems.forEach((item) => item.classList.add("in-view"));
    aosItems.forEach((item) => item.classList.add("aos-animate"));

    fadeElement(dest, 0, 1, -42, 0, 12, 0, 920, () => {
      window.setTimeout(() => {
        dest.classList.remove("is-transition-target", "is-transition-ready");
      }, 120);
    });
  });
};

// All elements with data-unlock attribute
document.querySelectorAll("[data-unlock]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const target = el.getAttribute("href");

    if (!body.classList.contains("is-locked")) {
      scrollToTarget(target);
      return;
    }

    body.classList.add("is-unlocking", "is-page-fading");
    setTransitionOpacity(0);

    const startUnlock = () => {
      unlockPage();
      revealTargetAfterTransition(target);

      animateNumber(0, 1, 420, setTransitionOpacity, () => {
        animateNumber(1, 0, 760, setTransitionOpacity, () => {
          body.classList.remove("is-unlocking", "is-page-fading");
        });
      });
    };

    window.setTimeout(startUnlock, 320);
  });
});

// Unlock immediately if there's a hash on load
if (window.location.hash && window.location.hash !== "#top") {
  unlockPage();
}

/* ─── Scroll-locked state: lock to top ─────────────
   If we land with is-locked, keep user at top.
─────────────────────────────────────────────────── */
if (root.classList.contains("is-locked") || body.classList.contains("is-locked")) {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

/* ─── Nav active-link highlight ────────────────────
   Adds .is-active to the nav link whose section is
   currently in view.
─────────────────────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__links a");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -40% 0px",
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

/* ─── Soft reveal fallback for important blocks ───────────────────────── */
const revealItems = Array.from(
  document.querySelectorAll(".section__header, .specialty-card, .project-filters, .project, .projects__more, .contact-inner")
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal-item");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
});

if (revealItems.length) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}

/* ─── Project filters ───────────────────────────── */
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-filter-hidden", !shouldShow);
    });
  });
});

/* ─── Contact form mail handoff ─────────────────── */
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const bodyText = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject scope:\n${message}`
    );

    if (formNote) {
      formNote.textContent = "Opening your email app with the project details...";
    }

    window.location.href = `mailto:vincentgabriellepimentel@gmail.com?subject=${subject}&body=${bodyText}`;
  });
}
