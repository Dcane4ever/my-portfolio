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

AEGIS and all EAC branding/screenshots remain excluded pending employer clearance. The project cards use your confirmed context and technologies: DTR was built for your father's employee workflow in Java/Spring Boot; Pearl Manila was assigned by your OJT supervisor, uses Laravel/PHP, and is currently utilized by the company; Car Wash was a Java/Spring Boot Application Development course project with a 98% mark. Each card includes responsibilities, technologies, the challenge of obtaining user testing, and how feedback improved the work. No unreported technical obstacle, database, deployment URL, or digital-signature implementation is claimed. The hero remains an illustrative HTML/CSS mockup with sample data.

## Information still to confirm

| Config location | What to supply |
| --- | --- |
| `settings.calendarUrl` | Your real HTTPS calendar booking URL. Every call CTA uses it. |
| `settings.formEndpoint` | Replace `YOUR_FORM_ID` in `https://formspree.io/f/YOUR_FORM_ID` with the public ID from your Formspree dashboard, then run `npm run build`. |
| `identity.domainEmail` | Optional domain email. The current footer links to your existing Gmail address. |
| `identity.github`, `identity.linkedin` | Both are set to the profile URLs you supplied. Update these if your profiles change. |
| `identity.photo.source`, `.src`, `.alt`, `.width`, `.height` | Source PNG and optimized WebP paths, alt text, and actual image dimensions. The supplied portrait is 288×288 pixels. |
| `work.items[0..2].context`, `.responsibilities`, `.challenge`, `.resolution`, `.stack` | Current entries use your confirmed project notes. Add further implementation details only when accurate. |
| `work.items[0..2].demo`, `.github` | Verified project demo and source URLs. Existing screenshot links already work. The hotel URL visible in the saved screenshot could not be verified and is not published as a demo link. |
| `stats[0..2].value` | Optional verified systems delivered, users served, and average delivery time. Leave `null` to keep hidden. |
| `testimonials.items` | Optional two or three real, consented quotes: `{ quote, name, role }`. Keep `[]` until supplied. At most three render. |
| `settings.analytics.domain` | Optional analytics domain, only if enabling `settings.analytics.enabled`. Off by default. |

The user-supplied pricing is configured as Starter Website **₱4,999** (5–7 days, one revision), Business Website **₱8,999** (1–2 weeks, two revision rounds), and Custom Web System **starting at ₱12,000**. All cards lead to the existing inquiry form. The five additional-service ranges are scope-dependent estimates. Domain registration, hosting, paid third-party services, extra revisions, and out-of-scope features may cost separately; no custom-system delivery time or guaranteed set of features is invented.

Motion is centralized in `js/motion.js`, using the retained GSAP and React integration. The hero introduces its copy and actions in a short sequence while keeping the headline fully painted. Section headings, service cards, project previews, process steps, pricing cards, portrait, and contact area reveal once as they enter the viewport. Cards in the same grid row stagger by 80ms; stacked mobile cards reveal individually. Offscreen content stays readable until a reveal actually starts, and keyboard focus finishes an active reveal immediately. Transforms and opacity clear after completion; React unmount and live reduced-motion changes revert animations, triggers, and listeners. This follows GSAP's [matchMedia lifecycle guidance](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()).

The illustrative hero workspace adds row highlights and drawn checkmarks in a short, replayable sequence. Replay resets each highlight to its original appearance before playing again. Fine-pointer hover adds a small card lift, screenshot zoom, and arrow movement. Mobile navigation and form confirmation have short entrance effects; supported browsers also animate FAQ expansion and collapse using native details transitions. Reduced motion disables these effects immediately and disables workflow replay. Static content, native FAQ behavior, and the existing email fallback remain available without JavaScript. No animations loop automatically.

## Inquiry form behavior

The existing React form submits directly to Formspree with `fetch()`, without opening an email application or refreshing the page. It retains name, email, organization, project details (`need`), budget, and timeline. The project-details value is also sent as `message`, alongside `_subject` and Formspree's `_gotcha` honeypot field. Inputs are validated and trimmed before submission. A spinner, accessible loading announcement, and disabled submit button show progress; an immediate ref guard prevents concurrent requests before React re-renders. Answers are frozen during the request and preserved on failure. Only a successful HTTP response with Formspree's recognized JSON confirmation shows the exact success message and resets the form. The response's `next` URL is never followed. HTTP errors, server validation, rate limits, malformed responses, network failures, and the 15-second timeout restore the form for retry. Unmount aborts a pending request.

### Activate Formspree

1. Create a form in your [Formspree dashboard](https://formspree.io/), configure the destination email, and complete any verification or activation it requests.
2. In **`js/content.js`**, replace only `YOUR_FORM_ID` in `settings.formEndpoint`:

   ```js
   formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   ```

3. Run `npm run build` to update the existing `index.html`, `assets/app.js`, and `assets/site.css`. These generated files are what GitHub Pages serves; changing only `content.js` does not update the deployed form.
4. Review **Settings > Spam protection** in Formspree. This integration uses the [server-supported `_gotcha` honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/) together with Formspree's server-side spam filtering. Keep the hosted redirect CAPTCHA off for this plain-fetch flow; if you require CAPTCHA, configure an on-page token integration first. Formspree documents [using your own CAPTCHA key to avoid redirection](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings). Available filter controls depend on your plan.
5. If you configure domain restrictions, allow the deployed GitHub Pages origin, and accommodate localhost while testing.

The form ID is public configuration. No private API key, email password, backend server, or database is needed. While the endpoint still contains `YOUR_FORM_ID`, the form displays an unavailable message, keeps the visitor's details, and sends no request. A filled honeypot also sends no request and never claims delivery. Standalone email links and the no-JavaScript email fallback are retained; the form's obsolete email-preparation logic is removed.

### Test locally and on GitHub Pages

After inserting the real form ID, run `npm run dev` and open `http://127.0.0.1:4173`. Send one clearly labeled test inquiry. Confirm that the page stays in place, the spinner appears while sending, the exact thank-you message appears, and the submission reaches the Formspree dashboard. Check that email notifications reach the configured address separately; the website confirms acceptance by Formspree, not inbox delivery.

Try missing fields and an invalid email. To test a network failure, load the page first, then switch DevTools Network to Offline before submitting; the error should preserve every answer. Switch back online to retry. Rapid clicks or Enter presses while sending must produce only one in-flight POST. The Network panel should show the six original fields, `message`, `_subject`, and an empty `_gotcha`.

Deploy through the existing GitHub Pages workflow with the refreshed repository-root `index.html` and `assets/`, plus the modified sources and documentation. After deployment, hard-refresh the live portfolio and repeat one test inquiry; confirm it in Formspree and verify mobile layout. No backend or GitHub Pages configuration change is required.

## Verify

```sh
npm run build
npm test
npm run preview
# In another terminal, with the preview running:
npm run test:browser
npm run audit
```

Browser checks use the locally installed Brave executable by default. Set `BROWSER_PATH` to another Chromium browser executable when needed; no browser is downloaded. Browser tests cover 375px, 768px, and 1280px, horizontal overflow, keyboard access, menu Escape behavior, accordion ARIA, required/email validation, direct form submission, focus on success, honeypot behavior, reduced motion, and no-JavaScript fallback. Test-only bundles use intercepted Formspree IDs. Integration checks cover confirmed success, HTTP/network failures, invalid JSON/HTML/unconfirmed responses, server-side validation messages, 429 rate limits, timeout, trimmed payloads, duplicate prevention, success-only reset, no page reload, and the placeholder-ID guard. They retain calendar and analytics coverage. All automated inquiries are mocked; no real submissions are sent and production settings are not changed.

`scripts/motion-check.mjs` also verifies running scroll reveals at all three widths, repeated workflow replay, desktop hover, FAQ keyboard interaction with motion enabled, live reduced-motion restoration, deep links, and React Strict Mode cleanup. Motion screenshots and results are saved to ignored `artifacts/`.

Lighthouse uses its default mobile simulation. Reports and screenshots are saved under ignored `artifacts/`. Scores are local lab measurements and may differ on the deployed host. Keep host compression enabled for HTML, JavaScript, and CSS; the local preview server uses gzip.

Formspree upgrade verified on October 13, 2026: production build, content checks, responsive/browser checks, motion checks, and mocked integration checks passed. At 375px, 768px, and 1280px there was no horizontal overflow or browser error. Formspree acceptance and failure scenarios were intercepted, including direct confirmation, server validation, network failure, redirects, timeout, duplicates, success-only reset, and no reload. Actual live acceptance remains to be verified after inserting your real form ID.

The prior local mobile Lighthouse baseline for the animation update scored **100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**, with 0.8s FCP, 1.7s LCP, and **0 CLS**. That report predates the Formspree upgrade; rerun `npm run audit` for updated measurements. `artifacts/lighthouse-mobile.html` contains the baseline report.

## Decisions to confirm

- Service timelines are planning estimates, not measured historical delivery times. Adjust them to match your capacity.
- Exact ownership terms, included revisions, support duration, and hosting costs are intentionally agreed in the proposal. The copy does not invent contractual terms.
- Project technologies and contexts use your confirmed notes; database engines, deeper technical implementation details, and project demo URLs remain unspecified.
- Direct submissions require your real Formspree form ID. Immediate calendar booking still requires your calendar URL.
- No genuine client quotes, metrics, or results were supplied, so those are omitted without unfinished labels.
