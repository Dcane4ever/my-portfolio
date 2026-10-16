import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

<<<<<<< HEAD
// The hero uses CSS at first paint. Other sections reveal only when they enter view.
export function usePageMotion(mainRef) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const main = mainRef.current;
        const animations = new Map();
        const sections = [
          ...main.querySelectorAll(":scope > section:not(.hero)"),
        ];
        const footer = main.nextElementSibling;
        if (footer?.matches("footer")) sections.push(footer);

        for (const section of sections) {
          let targets;
          if (section.matches(".problem-strip"))
            targets = section.querySelectorAll(".container > *");
          else if (section.id === "contact")
            targets = section.querySelectorAll(".contact-copy, .contact-form");
          else if (section.matches("footer"))
            targets = section.querySelectorAll(
              ".footer-main > div, .footer-bottom",
            );
          else
            targets = section.querySelectorAll(
              ".section-heading, .service-card, .fine-print, .stack-strip, .client-stats, .case-study, .process-grid > li, .price-card, .pricing-note, .pricing-addons, .about-photo, .about-paragraph, .social-links, .faq-item, .testimonials-grid > figure, :scope > h2",
            );

          [...targets].forEach((target, index) => {
            animations.set(
              target,
              gsap.from(target, {
                y: 28,
                opacity: 0,
                duration: 0.8,
                delay: (index % 3) * 0.1,
                ease: "power2.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: target,
                  start: "top 94%",
                  once: true,
                },
              }),
            );
          });
        }

        // Keyboard users should never have to wait for a focused control to appear.
        const revealFocusedSection = (event) => {
          const section = event.target.closest("main > section, footer");
          if (!section) return;
          for (const [target, animation] of animations) {
            if (section.contains(target)) animation.progress(1);
          }
        };
        document.addEventListener("focusin", revealFocusedSection);
        let active = true;
        let refreshFrame;
        const resize = new ResizeObserver(() => {
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => {
            if (active) ScrollTrigger.refresh();
          });
        });
        resize.observe(main);
        document.fonts?.ready.then(() => {
          if (active) ScrollTrigger.refresh();
        });
        return () => {
          active = false;
          resize.disconnect();
          cancelAnimationFrame(refreshFrame);
          document.removeEventListener("focusin", revealFocusedSection);
        };
      });
      return () => media.revert();
    },
    { scope: mainRef },
=======
export { gsap, ScrollTrigger, useGSAP };

export const motionQuery = "(prefers-reduced-motion: no-preference)";
const ease = "power3.out";

// Create the tween only on entry. Static HTML and offscreen content stay readable,
// even when JavaScript is delayed, a visitor follows an anchor, or setup fails.
export function revealOnScroll(
  mediaContext,
  targets,
  { distance = 24, duration = 0.7 } = {},
) {
  const elements = gsap.utils.toArray(targets);
  const reveal = mediaContext.add(null, (element, delay) => {
    if (element.contains(document.activeElement)) return;
    gsap.fromTo(
      element,
      { y: distance, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        overwrite: "auto",
        clearProps: "transform,opacity",
      },
    );
  });

  elements.forEach((element, index) => {
    // Skip content above the viewport on restored scroll positions / deep links.
    if (element.getBoundingClientRect().bottom <= 0) return;
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      once: true,
      onEnter: () => {
        // Measure at entry so a resized grid still staggers by its current row.
        // offsetTop ignores the transforms of siblings already revealing.
        const top = element.offsetTop;
        const rowIndex = elements.slice(0, index).filter(
          (previous) => Math.abs(previous.offsetTop - top) < 4,
        ).length;
        reveal(element, Math.min(rowIndex, 3) * 0.08);
      },
    });
  });
}

export function usePortfolioMotion(scope) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        motionQuery,
        (context) => {
          const root = scope.current;
          const intro = root.querySelector(".hero-intro");
          // Keep the headline fully painted for fast loading; motion adds hierarchy.
          if (intro.getBoundingClientRect().bottom > 0 && window.scrollY < 100) {
            gsap
              .timeline({ defaults: { ease, clearProps: "transform,opacity" } })
              .from(intro.querySelectorAll(".availability, .eyebrow"), {
                y: 10,
                opacity: 0.5,
                duration: 0.55,
                stagger: 0.07,
              })
              .from(intro.querySelector("h1"), { y: 18, duration: 0.85 }, 0.08)
              .from(
                intro.querySelectorAll(".hero-description, .hero-actions, .hero-note"),
                { y: 14, opacity: 0.5, duration: 0.65, stagger: 0.09 },
                0.16,
              );
          }

          [
            ".problem-strip .container > *",
            ".section-heading",
            ".service-card",
            ".case-study",
            ".process-grid > li",
            ".price-card",
            ".about-photo",
            ".contact-copy",
            ".contact-form",
          ].forEach((selector) =>
            revealOnScroll(context, root.querySelectorAll(selector)),
          );

          // Keyboard users should never wait for a focused control to finish revealing.
          const finishFocusedReveal = (event) => {
            let element = event.target;
            while (element && element !== root) {
              gsap.getTweensOf(element).forEach((tween) => {
                if (tween.vars.opacity !== undefined) tween.progress(1);
              });
              element = element.parentElement;
            }
          };
          root.addEventListener("focusin", finishFocusedReveal);

          // Font loading can move section boundaries after hydration.
          let disposed = false;
          let frame;
          document.fonts?.ready.then(() => {
            if (!disposed) frame = requestAnimationFrame(() => ScrollTrigger.refresh());
          });
          return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            root.removeEventListener("focusin", finishFocusedReveal);
          };
        },
        scope,
      );
      return () => media.revert();
    },
    { scope },
>>>>>>> 003dd30003db58dd6fb5db84c427b0b71b48538f
  );
}
