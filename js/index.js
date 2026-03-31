AOS.init({
  duration: 900,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
});

const typedTarget = document.querySelector("#typed");
if (typedTarget) {
  new Typed("#typed", {
    strings: ["DESIGNER", "DEVELOPER", "PROGRAMMER", "TECH ENTHUSIAST"],
    typeSpeed: 70,
    backSpeed: 30,
    backDelay: 1600,
    loop: true,
    smartBackspace: true,
  });
}

const aboutSection = document.querySelector(".about-scroll");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateAboutScroll = () => {
  if (!aboutSection || prefersReduced) {
    return;
  }
  const rect = aboutSection.getBoundingClientRect();
  const viewport = window.innerHeight;
  const total = rect.height - viewport;
  const scrolled = Math.min(Math.max(-rect.top, 0), total);
  const startOffset = total * 0.01;
  const endOffset = total * 0.05;
  const range = Math.max(total - startOffset - endOffset, 1);
  const progress = total > 0 ? (scrolled - startOffset) / range : 0;
  const clamped = Math.min(Math.max(progress, 0), 1);
  aboutSection.style.setProperty("--progress", clamped.toFixed(3));
};

window.addEventListener("scroll", updateAboutScroll, { passive: true });
window.addEventListener("resize", updateAboutScroll);

const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const track = carousel.querySelector(".carousel__track");
  if (track && !track.dataset.cloned) {
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));
    track.dataset.cloned = "true";
  }
}

const nav = document.querySelector(".nav");
const cinematicSections = Array.from(document.querySelectorAll(".section--cinematic, .hero"));

const updateNavTheme = () => {
  if (!nav || cinematicSections.length === 0) {
    return;
  }
  const navHeight = nav.offsetHeight || 0;
  const probe = window.scrollY + navHeight + 4;
  let isDark = false;
  for (const section of cinematicSections) {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (probe >= top && probe < bottom) {
      isDark = true;
      break;
    }
  }
  nav.classList.toggle("nav--dark", isDark);
  nav.classList.toggle("nav--light", !isDark);
};

window.addEventListener("scroll", updateNavTheme, { passive: true });
window.addEventListener("resize", updateNavTheme);
const root = document.documentElement;
const body = document.body;
const unlockLink = document.querySelector("[data-unlock]");

const isLocked = root.classList.contains("is-locked") || body.classList.contains("is-locked");
if (isLocked) {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

const unlockPage = () => {
  root.classList.remove("is-locked");
  body.classList.remove("is-locked");
  body.classList.add("is-unlocked");
  window.requestAnimationFrame(updateNavTheme);
};

if (unlockLink) {
  unlockLink.addEventListener("click", (event) => {
    event.preventDefault();
    body.classList.add("is-unlocking");

    const aboutSection = document.querySelector("#about");
    window.setTimeout(() => {
      unlockPage();
      updateAboutScroll();
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      body.classList.remove("is-unlocking");
    }, 700);
  });
}

if (window.location.hash && window.location.hash !== "#top") {
  unlockPage();
}
const aboutTiles = document.querySelectorAll(".about__tile");
if (window.matchMedia("(hover: hover)").matches) {
  aboutTiles.forEach((tile) => {
    tile.addEventListener("mousemove", (event) => {
      const rect = tile.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      tile.style.setProperty("--tx", `${x}px`);
      tile.style.setProperty("--ty", `${y}px`);
    });
    tile.addEventListener("mouseleave", () => {
      tile.style.setProperty("--tx", "0px");
      tile.style.setProperty("--ty", "0px");
    });
  });
}

updateNavTheme();

updateAboutScroll();
