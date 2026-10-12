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

All editable public copy, prices, availability, contact details, SEO, and integrations are in **`js/content.js`**. Components do not contain separate editable marketing copy. Unavailable values are empty strings, `null`, or empty arrays and are hidden; the public page contains no unfinished labels. With no calendar configured, call buttons lead to the inquiry section. The footer uses the verified existing Gmail address until a domain email is supplied. The About image slot uses the existing initials as a brand panel until a real portrait is available.

AEGIS and all EAC branding/screenshots remain excluded pending employer clearance. The three retained project summaries describe only interface evidence from the repository screenshots. Missing problems, outcomes, deployment evidence, and implementation stacks are omitted. The hero remains an illustrative HTML/CSS mockup with sample data. No duration of professional development experience is claimed.

## Information still to confirm

| Config location | What to supply |
| --- | --- |
| `settings.calendarUrl` | Your real HTTPS calendar booking URL. Every call CTA uses it. |
| `identity.domainEmail` | Optional domain email. The current footer links to your existing Gmail address. |
| `identity.github`, `identity.linkedin` | GitHub currently points to the verified portfolio repository. Supply a preferred profile and LinkedIn URL if desired. |
| `identity.photo.src`, `.alt`, `.width`, `.height` | Optional local portrait path, alt text, and actual dimensions. Prefer WebP. The existing initials panel appears until supplied. |
| `work.items[0..2].context` | Whether each project was academic, personal, or professional; actual deployment status; and permission to share. DTR and Car Wash are currently interface previews; Pearl is a booking UX prototype. |
| `work.items[0..2].problem`, `.result`, `.stack` | Actual problem, verified outcomes, and implementation sources that substantiate technologies. Omitted until verified. |
| `work.items[0..2].demo`, `.github` | Verified project demo and source URLs. Existing screenshot links already work. The hotel URL visible in the saved screenshot could not be verified and is not published as a demo link. |
| `stats[0..2].value` | Optional verified systems delivered, users served, and average delivery time. Leave `null` to keep hidden. |
| `testimonials.items` | Optional two or three real, consented quotes: `{ quote, name, role }`. Keep `[]` until supplied. At most three render. |
| `settings.analytics.domain` | Optional analytics domain, only if enabling `settings.analytics.enabled`. Off by default. |

The user-supplied pricing is configured as Starter Website **₱4,999** (5–7 days, one revision), Business Website **₱8,999** (1–2 weeks, two revision rounds), and Custom Web System **starting at ₱12,000**. All cards lead to the existing inquiry form. The five additional-service ranges are scope-dependent estimates. Domain registration, hosting, paid third-party services, extra revisions, and out-of-scope features may cost separately; no custom-system delivery time or guaranteed set of features is invented.

The illustrative hero workspace uses GSAP for a one-time entrance, staggered summary-card reveals, and a short sequence of row highlights and checkmark draws. Each part waits until it reaches the viewport. A Replay animation button lets visitors watch the workflow sequence again. The current row has a brighter background and red accent, then returns to its original appearance. The sequence does not repeat automatically or change sample copy. Enabling reduced motion immediately stops the effects, restores static styles, and disables replay; all content also stays readable without JavaScript.

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

Lighthouse uses its default mobile simulation. Reports and screenshots are saved under ignored `artifacts/`. Scores are local lab measurements and may differ on the deployed host. Keep host compression enabled for HTML, JavaScript, and CSS; the local preview server uses gzip.

Verified on October 12, 2026: build and checks passed; 375px, 768px, and 1280px had no horizontal overflow, failed requests, or console errors. The final local mobile Lighthouse run scored **100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**, with 0.8s FCP, 1.6s LCP, and **0 CLS**. `artifacts/lighthouse-mobile.html` contains the full report. Remaining diagnostics concern the small render-blocking stylesheet and unused portions of the retained React bundle; no scored accessibility failures remain. Browser tests mock configured endpoints and analytics so reruns never send actual inquiries.

## Decisions to confirm

- Service timelines are planning estimates, not measured historical delivery times. Adjust them to match your capacity.
- Exact ownership terms, included revisions, support duration, and hosting costs are intentionally agreed in the proposal. The copy does not invent contractual terms.
- Implementation stacks and project classification cannot be established from screenshots alone. The Laravel hostname visible in the Pearl screenshot does not prove the HTML/JavaScript prototype shares that implementation. No project-specific stack or paid-client status is inferred.
- No form backend or calendar provider was supplied. Email preparation works now; direct submissions and immediate calendar booking depend on the URLs above.
- No genuine client quotes, metrics, results, or portrait were supplied, so those are omitted without unfinished labels.
