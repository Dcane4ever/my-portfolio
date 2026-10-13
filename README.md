# Vincent Pimentel — client-facing freelancing site

React 18 + JSX and Tailwind are retained. A small esbuild/Tailwind build replaces the browser-side Babel compiler and development CDNs. The output contains prerendered HTML, a production React hydration bundle, a local Geist font, responsive WebP screenshots, a social preview image, JSON-LD, `robots.txt`, and `sitemap.xml`.

## Run locally

Requires Node.js 20.19+ and npm. On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:4173`. Edit `js/content.js`, then run `npm run build` again to update the preview and repository-root deployment files. `npm run preview` serves the last build. The template lives in `scripts/index.template.html`; the root `index.html` is a generated, fully rendered page. Commit `index.html`, `assets/`, `robots.txt`, `sitemap.xml`, and `.nojekyll` after rebuilding. The existing GitHub Pages deployment from `main` / repository root continues to work. Other static hosts can use the **contents of `dist/`**. No push or publication is performed by these scripts.

The default canonical URL preserves the existing GitHub Pages address. If you use a custom domain, change `settings.siteUrl` before building. Include its trailing slash. All asset paths are relative so the site works under `/my-portfolio/` as well as at a domain root. On a custom domain, place `robots.txt` at the domain root.

## Content and settings

All editable public copy, prices, availability, contact details, SEO, and integrations are in **`js/content.js`**. Components do not contain separate editable marketing copy. Unavailable values are empty strings, `null`, or empty arrays and are hidden; the public page contains no unfinished labels. With no calendar configured, call buttons lead to the inquiry section. The footer uses the verified existing Gmail address until a domain email is supplied. The About section uses your supplied `assets/unnamed.png`, optimized to `assets/vincent-pimentel.webp` during the build without overwriting the original. GitHub and LinkedIn use your supplied profile URLs.

AEGIS and all EAC branding/screenshots remain excluded pending employer clearance. The three retained project summaries describe only interface evidence from the repository screenshots. Missing problems, outcomes, deployment evidence, and implementation stacks are omitted. The hero remains an illustrative HTML/CSS mockup with sample data. No duration of professional development experience is claimed.

## Information still to confirm

| Config location | What to supply |
| --- | --- |
| `settings.calendarUrl` | Your real HTTPS calendar booking URL. Every call CTA uses it. |
| `identity.domainEmail` | Optional domain email. The current footer links to your existing Gmail address. |
| `identity.github`, `identity.linkedin` | Both are set to the profile URLs you supplied. Update these if your profiles change. |
| `identity.photo.source`, `.src`, `.alt`, `.width`, `.height` | Source PNG and optimized WebP paths, alt text, and actual image dimensions. The supplied portrait is 288×288 pixels. |
| `work.items[0..2].context` | Whether each project was academic, personal, or professional; actual deployment status; and permission to share. DTR and Car Wash are currently interface previews; Pearl is a booking UX prototype. |
| `work.items[0..2].problem`, `.result`, `.stack` | Actual problem, verified outcomes, and implementation sources that substantiate technologies. Omitted until verified. |
| `work.items[0..2].demo`, `.github` | Verified project demo and source URLs. Existing screenshot links already work. The hotel URL visible in the saved screenshot could not be verified and is not published as a demo link. |
| `stats[0..2].value` | Optional verified systems delivered, users served, and average delivery time. Leave `null` to keep hidden. |
| `testimonials.items` | Optional two or three real, consented quotes: `{ quote, name, role }`. Keep `[]` until supplied. At most three render. |
| `settings.analytics.domain` | Optional analytics domain, only if enabling `settings.analytics.enabled`. Off by default. |

The user-supplied pricing is configured as Starter Website **₱4,999** (5–7 days, one revision), Business Website **₱8,999** (1–2 weeks, two revision rounds), and Custom Web System **starting at ₱12,000**. All cards lead to the existing inquiry form. The five additional-service ranges are scope-dependent estimates. Domain registration, hosting, paid third-party services, extra revisions, and out-of-scope features may cost separately; no custom-system delivery time or guaranteed set of features is invented.

Motion is centralized in `js/motion.js`, using the retained GSAP and React integration. The hero introduces its copy and actions in a short sequence while keeping the headline fully painted. Section headings, service cards, project previews, process steps, pricing cards, portrait, and contact area reveal once as they enter the viewport. Cards in the same grid row stagger by 80ms; stacked mobile cards reveal individually. Offscreen content stays readable until a reveal actually starts, and keyboard focus finishes an active reveal immediately. Transforms and opacity clear after completion; React unmount and live reduced-motion changes revert animations, triggers, and listeners. This follows GSAP's [matchMedia lifecycle guidance](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()).

The illustrative hero workspace adds row highlights and drawn checkmarks in a short, replayable sequence. Replay resets each highlight to its original appearance before playing again. Fine-pointer hover adds a small card lift, screenshot zoom, and arrow movement. Mobile navigation and form confirmation have short entrance effects; supported browsers also animate FAQ expansion and collapse using native details transitions. Reduced motion disables these effects immediately and disables workflow replay. Static content, native FAQ behavior, and the existing email fallback remain available without JavaScript. No animations loop automatically.

## Inquiry form behavior

With `settings.formEndpoint` empty, the form validates all six fields and prepares a `mailto:` link. The visitor explicitly opens the prepared email and presses Send in their email app. The UI says that the email is prepared; it does not claim delivery. An email link remains available if no email app is configured. With JavaScript disabled, the form is hidden and a direct email fallback is shown.

To receive inquiries directly, set `settings.formEndpoint` to a working HTTP(S) JSON POST endpoint. It receives `name`, `email`, `organization`, `need`, `budget`, and `timeline`. It must allow requests from your site, validate and rate-limit server-side, and return a 2xx response only when accepting the inquiry. Configure any credentials on the server, never in this public content file. The form shows a real success state after 2xx, retains answers on failure, limits requests to 15 seconds, and blocks duplicate in-flight submissions. The honeypot stops filled spam submissions before a network request. A browser honeypot is not a substitute for server-side spam protection.

## Verify

```sh
npm run build
npm test
npm run preview
# In another terminal, with the preview running:
npm run test:browser
npm run audit
```

Browser checks use the locally installed Brave executable by default. Set `BROWSER_PATH` to another Chromium browser executable when needed; no browser is downloaded. Browser tests cover 375px, 768px, and 1280px, horizontal overflow, keyboard access, menu Escape behavior, accordion ARIA, required/email validation, email preparation, focus on success, honeypot behavior, reduced motion, and no-JavaScript fallback. Additional test-only bundles verify configured calendar links, opt-in analytics, and mocked form endpoint success/failure without sending real inquiries or altering production config.

`scripts/motion-check.mjs` also verifies running scroll reveals at all three widths, repeated workflow replay, desktop hover, FAQ keyboard interaction with motion enabled, live reduced-motion restoration, deep links, and React Strict Mode cleanup. Motion screenshots and results are saved to ignored `artifacts/`.

Lighthouse uses its default mobile simulation. Reports and screenshots are saved under ignored `artifacts/`. Scores are local lab measurements and may differ on the deployed host. Keep host compression enabled for HTML, JavaScript, and CSS; the local preview server uses gzip.

Verified on October 13, 2026: production build, content checks, responsive/browser checks, motion checks, and mocked integration checks passed. At 375px, 768px, and 1280px there was no horizontal overflow or browser error. The final local mobile Lighthouse run with the new motion scored **100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**, with 0.8s FCP, 1.7s LCP, and **0 CLS**. `artifacts/lighthouse-mobile.html` contains the full report. Remaining diagnostics concern the small render-blocking stylesheet and unused portions of the retained React/GSAP bundle; no scored accessibility failures remain. Browser tests mock configured endpoints and analytics so reruns never send actual inquiries.

## Decisions to confirm

- Service timelines are planning estimates, not measured historical delivery times. Adjust them to match your capacity.
- Exact ownership terms, included revisions, support duration, and hosting costs are intentionally agreed in the proposal. The copy does not invent contractual terms.
- Implementation stacks and project classification cannot be established from screenshots alone. The Laravel hostname visible in the Pearl screenshot does not prove the HTML/JavaScript prototype shares that implementation. No project-specific stack or paid-client status is inferred.
- No form backend or calendar provider was supplied. Email preparation works now; direct submissions and immediate calendar booking depend on the URLs above.
- No genuine client quotes, metrics, or results were supplied, so those are omitted without unfinished labels.
