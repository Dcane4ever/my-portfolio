AOS.init({
  duration: 900,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
});

const typedTarget = document.querySelector("#typed");
if (typedTarget) {
  new Typed("#typed", {
    strings: ["DESIGNER", "DEVELOPER", "CREATOR"],
    typeSpeed: 70,
    backSpeed: 30,
    backDelay: 1600,
    loop: true,
    smartBackspace: true,
  });
}

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
};

if (unlockLink) {
  unlockLink.addEventListener("click", (event) => {
    event.preventDefault();
    body.classList.add("is-unlocking");

    const aboutSection = document.querySelector("#about");
    window.setTimeout(() => {
      unlockPage();
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
