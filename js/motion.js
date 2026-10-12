import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  );
}
