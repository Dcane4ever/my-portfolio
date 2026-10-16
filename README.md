# Vincent Gabrielle Pimentel

I build booking, attendance, and workflow systems that replace paperwork for schools and small businesses.

[View my portfolio](https://dcane4ever.github.io/my-portfolio/) · [Email me about your project](mailto:vincentgabriellepimentel@gmail.com)

![My portfolio hero, showing practical web application services and an illustrative team workspace.](assets/portfolio-hero.webp)

## See how I approach your project

This is my portfolio site. It shows my services, project interfaces, pricing, and the steps I take from a first conversation to launch. I built it with the same attention to clear screens and practical communication that I bring to business tools. You can judge the site itself on your phone, try the contact flow, and decide whether my approach fits your team.

## Make everyday work easier

These services are intended for schools and small businesses. The examples below describe who a system could help; they are not claims that I have already worked with every industry listed.

- **Booking and reservation systems:** For schools and appointment-based businesses that need availability, bookings, and staff controls in one place. Planning estimate: 3–6 weeks for a focused first version.
- **Attendance and DTR systems:** For administrators tracking staff time. Daily time records, supervisor review, and useful attendance reports. Planning estimate: 4–8 weeks, depending on your rules.
- **Admin dashboards and workflow automation:** For teams repeating the same admin tasks. Track requests, roles, statuses, and approvals without copying information between spreadsheets. Planning estimate: 3–8 weeks for an agreed workflow.

The site also lists introductory website packages starting at **₱4,999** and custom-system estimates starting at **₱12,000**. I confirm the actual scope, price, and schedule with you before work starts.

## A site you can use with confidence

| What matters to you              | How this site handles it                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fast to open on a phone          | Complete page content is prepared in advance. Photos and screenshots use optimized WebP files, and lower-page images load when needed. The font is included locally. |
| Easy to navigate                 | Clear headings, keyboard controls, visible focus outlines, labeled form fields, and accessible FAQ controls.                                                         |
| Comfortable on different screens | Browser checks cover 375px phones, 768px tablets, and 1280px desktops, including horizontal overflow.                                                                |
| Easy to find and share           | A descriptive title, search description, social preview image, structured information for search engines, and a sitemap.                                             |
| A clear way to contact me        | The form checks your answers and prepares an email draft. Open that draft and press Send in your email app. A direct email link is always available.                 |
| Motion that stays useful         | The hero animates on page entry. Other sections reveal as you scroll. Reduced-motion preferences stop the effects, and content remains readable without JavaScript.  |
| Privacy by default               | Analytics are off by default. Preparing an inquiry does not automatically transmit it.                                                                               |

**Measured locally on October 12, 2026:** mobile Lighthouse scored **100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO**, with **zero measured layout shift**. Lighthouse is an automated browser check; these are local lab results, not a guarantee of identical results on every device or connection.

## Under the hood

The technical choices support a simple client experience: readable pages, reusable sections, and content that stays consistent.

<details>
<summary>Details for your technical reviewer</summary>

- **React 18 and JSX:** Reusable page sections keep shared controls consistent.
- **Tailwind CSS and custom CSS:** A shared type scale, colors, spacing, and responsive layout.
- **esbuild and React server rendering:** Compile production JavaScript and prepare complete HTML before the browser opens the site.
- **Sharp:** Produces optimized WebP photos and screenshots with explicit dimensions.
- **GSAP, ScrollTrigger, and the React GSAP hook:** Scope motion to the relevant elements and clean it up when reduced motion is enabled. ScrollTrigger starts a reveal when an element reaches the viewport.
- **CSS entrance animations:** Start the navigation and hero at first paint, without waiting for the React bundle.

Key source areas:

```text
js/       Page sections, content settings, and motion
css/      Shared styles and original project images
assets/   Optimized photos, screenshots, and sharing image
scripts/  Page rendering, asset processing, and checks
```

`js/content.js` contains public copy, contact values, prices, project information, and optional integrations. The build reads the same data for rendered HTML, metadata, and structured data describing a Person and ProfessionalService. React then attaches interactive controls to the rendered page.

`js/motion.js` controls the section reveals. The workspace keeps its own short workflow sequence and Replay animation control. Motion runs on entry or when content reaches the viewport; it does not loop automatically. Resize handling keeps the reveal positions accurate when an FAQ opens or a form changes. Keyboard focus reveals the relevant section immediately.

Content checks reject unfinished copy, validate generated assets, and exercise inquiry validation. Browser checks cover navigation, keyboard access, FAQ behavior, pricing, responsive layouts, email preparation, reduced motion, and page entrances. Optional form-endpoint success and failure are tested with mocked requests; no real inquiries are sent during those tests. Lighthouse measures mobile performance and accessibility.

The form also has a hidden spam field. Its current implementation prepares email rather than submitting to a server, so the success message says that a draft is ready. With JavaScript disabled, the page offers a direct email fallback.

</details>

## Know what happens next

1. **Discovery call:** We spend 20 minutes discussing your current process, your team, and what needs to change.
2. **Fixed-scope proposal:** You receive a written scope, price, timeline, and deliverables before work begins.
3. **Build with weekly demos:** You see progress, try the workflow, and give feedback while it is being built.
4. **Launch and support:** I help with launch and team training, then provide the support agreed in your proposal.

The proposal sets out code ownership, source-code handover, included revisions, and the support window. If a request changes the agreed scope, I explain the effect on price and timing before doing it. I reply within 24 hours.

## Selected work

These are project interface previews. The hotel work is explicitly a prototype. They are not client endorsements or evidence of live operation.

- **DTR Supervisor and Workflow System — attendance interface preview.** Saved screens show supervisor and employee views, time-in controls, schedules, and links to time-record requests and print summaries.
- **Pearl Manila Hotel Booking prototype — booking UX prototype.** The saved page shows hotel information, amenities, and navigation for rooms, facilities, check-in, and login.
- **Car Wash Management System — website interface preview.** Saved screens show service-package descriptions, sign-in, and account-registration interfaces.

![Saved Car Wash Management System interface preview, showing service-package descriptions.](assets/carwash-960.webp)

## Work directly with someone who understands support

- My customer and tech support background shapes how I explain problems in plain language.
- I focus on clear screens and workflows that non-technical staff can use.
- I agree on scope and deliverables in writing before work starts.
- You work directly with me, with regular opportunities to review progress and give feedback.

## Let’s talk about your project

[Email me](mailto:vincentgabriellepimentel@gmail.com) with the process you want to improve, who will use the system, and your preferred deadline. A rough idea or a spreadsheet is enough to start the conversation. I reply within 24 hours.

You can also [visit the portfolio](https://dcane4ever.github.io/my-portfolio/) to compare packages or prepare an inquiry email.

[GitHub](https://github.com/Dcane4ever) · [LinkedIn](https://www.linkedin.com/in/vincent-pimentel-6986b726b/)

<details>
<summary>Run it locally</summary>

```sh
npm install
npm run dev
```

</details>

<<<<<<< HEAD
© 2026 Vincent Gabrielle Pimentel.
=======
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

## Mobile layout

Phones below 600px use a compact named header, a shorter call label, smaller section gaps, full-width actions, and readable single-column cards and form fields. The workspace preview keeps its real table and replay behavior with balanced columns on small screens. Process steps use a numbered column, project previews scale with their card width, and the portrait uses its original square aspect ratio. Touch links have usable hit areas; form text stays at 16px. Viewport safe-area padding accommodates notches and home indicators without disabling browser zoom.

The mobile menu closes on link selection, the header call/home actions, outside taps, Escape, and keyboard focus leaving the header. Switching to desktop closes any open mobile menu. Its height follows the available viewport so short landscape views can scroll the menu. The desktop layout retains its existing dimensions and styling; Formspree configuration and motion behavior are preserved.

`scripts/mobile-check.mjs` runs in the normal browser suite. It uses Chromium touch emulation at 320, 360, 390, 430, 600, 768, and 844px, including short landscape views. It verifies layout width, tap targets, sticky anchor positioning, menu dismissal, resize behavior, draft retention in reduced-height views, mocked Formspree submission, and the no-JavaScript fallback. Screenshots and results are saved in ignored `artifacts/`. These are emulated checks; Safari and physical-device testing remain separate.

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
>>>>>>> 003dd30003db58dd6fb5db84c427b0b71b48538f
