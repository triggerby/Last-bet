# TriggerBy — AI Automation for Shopify
_Last updated: 2025-08-22 01:43 UTC_

> Conversion-first marketing site and lead engine for TriggerBy. Built with **Next.js 14**, **TypeScript**, **TailwindCSS**, **Embla Carousel**, and a **glass UI AI Overlay** that captures store URL + email and schedules a 30‑minute diagnostic. This README is intentionally exhaustive and operationally prescriptive.

---

## 1) Executive Summary
TriggerBy markets and delivers Shopify AI automations. The site converts traffic into qualified audits using a scroll‑triggered AI overlay and positions TriggerBy’s value with ten prebuilt automations displayed across three carousels (3–4–3). A data file (`data/automations.ts`) controls all card content and ordering. The backend route `/api/audit` receives `{ email, url }`, acknowledges receipt, and can be wired to an email provider (Resend/Mailgun) and a background analysis pipeline.

**Primary objectives**
- Capture **AI roadmap** requests and **free audit** leads with minimal friction.
- Present **10 automations** concisely with hard outcomes and clean visuals.
- Sell **custom buildouts** beyond standard flows.
- Educate **AI‑first founders** on the launch stack.

**Non‑objectives**
- This repository is not a landing page generator, CMS, or blog engine.
- Not intended for multi‑tenant hosting without adaptation.

---

## 2) System Diagram (logical)
- **Client**: Next.js app → SSR/CSR mix → Tailwind styles → Embla for carousels → Framer Motion optional.
- **Overlay**: First‑scroll event → Modal glass component → POST to `/api/audit`.
- **API**: Edge/Node runtime → Validates inputs → queues email and analysis.
- **Email**: Resend/Mailgun → transactional acknowledgements and final report delivery.
- **Analytics**: GA4 and ad pixels → events for carousel interactions and overlay submissions.
- **Hosting**: Vercel recommended → zero‑config builds, environment secrets, preview deployments.

---

## 3) Repository Layout
```
app/
  (marketing)/
    layout.tsx            # global shell (header, nav, footer)
    page.tsx              # assembles marketing sections
  api/
    audit/route.ts        # POST { email, url } → acknowledge/queue
components/
  Hero.tsx                # hero section with dual CTAs
  Automations.tsx         # 3 carousels reading from data file
  CtaStrip.tsx            # glass CTA panel
  AiOverlay.tsx           # first‑scroll modal that captures URL + email
data/
  automations.ts          # 10 card records; order defines carousels
public/
  brand/                  # logo, favicon, palette.json (optional)
  images/
    automations/          # artwork for cards
    agent/agent.jpg       # bot image for overlay
styles/
  globals.css             # Tailwind and .glass class
tailwind.config.ts        # brand tokens
next.config.js            # Next configuration
postcss.config.js         # Tailwind pipeline
tsconfig.json             # TypeScript configuration
README.md                 # project docs
```

---

## 4) Tech Stack and Rationale
- **Next.js 14 (App Router)**: server components where useful, edge‑ready API routes.
- **TypeScript**: strict types to avoid runtime surprises.
- **TailwindCSS**: design system via utility classes and a tiny token set.
- **Embla Carousel**: flexible, small footprint, full keyboard support.
- **Framer Motion**: optional micro‑animations; keep performance budgets tight.
- **No heavy UI kit**: faster, simpler, custom look.

**Browser support**: evergreen browsers and iOS/Android WebKit.

---

## 5) Installation

### A. Prerequisites
- Node.js ≥ 18 (LTS recommended). Install with nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc
nvm install --lts
node -v
```

### B. Package manager
Use **npm** out of the box, or install pnpm:
```bash
# npm (default)
npm install
npm run dev

# pnpm (optional)
npm i -g pnpm
pnpm install
pnpm dev
```

### C. Run
Visit `http://localhost:3000` and scroll once to trigger the overlay.

---

## 6) Environment Configuration
Copy `.env.example` to `.env.local`:

```
RESEND_API_KEY=
```

- If using **Resend**, un‑comment the send code in `app/api/audit/route.ts` and set a verified domain.
- If using **Mailgun**, call their REST API with your region + domain.

**Never commit secrets**. Rely on Vercel environment variables in production.

---

## 7) Brand and Assets
**Colors** (Tailwind tokens in `tailwind.config.ts`):
- `brand.green` = `#00C58E`
- `brand.dark`  = `#0A0F0D`

**Place assets**
- Logo and favicon → `public/brand/`
- Card artwork → `public/images/automations/`
- Bot image → `public/images/agent/agent.jpg`

**File rules**
- Use **kebab‑case** filenames.
- Prefer **WebP** or optimized PNG. Target ≤ **250 KB** per image.
- Use **1200×800** or **1600×1000** aspect ratio (16:10).

---

## 8) Data Model for Automations
`data/automations.ts` is the single source of truth.

```ts
export type Automation = {{
  id: string;        // kebab-case slug
  title: string;     // human title
  kpi: string;       // short outcome
  oneLiner: string;  // concise value prop
  image: string;     // path under /public/images/automations
  badge?: string;    // optional: "New", "Popular"
  ctaLabel?: string; // optional CTA label
  ctaHref?: string;  // optional CTA URL
}};

export const automations: Automation[] = [
  // 10 items in narrative order (see Section 9)
];
```

**Authoring guidance**
- Title ≤ 38 chars. One‑liner ≤ 90 chars. KPI ≤ 22 chars.
- Badges are subtle, use sparsely.
- Use real numbers and concrete verbs.

---

## 9) Carousels: Narrative, Slicing, and Interaction
**Narrative**: _Recover → Optimize → Protect_  
**Slicing**: First **3** entries form **Carousel A**, next **4** form **Carousel B**, last **3** form **Carousel C**.

**Current order**
1. Cart Recovery Engine — Recover 8–15% lost carts
2. Where Is My Order (WISMO) — Tickets ↓ 30–60%
3. Ad Budget Optimizer — Spend → winners
4. Attribution Protector — ROAS you trust
5. AOV Booster — AOV +10–20%
6. Profit Maximizer — Margin ↑
7. Fraud Shield — False positives ↓
8. Loss Preventer — Leakage ↓
9. Chargeback Winner — Win rate ↑
10. Inventory Guard — Stockouts ↓

**Component**: `components/Automations.tsx`
- Embla instance per carousel.
- Card min widths: 280/320/360/380 px by breakpoint.
- Dots and prev/next buttons are recommended additions (see Section 16).

**Accessibility**
- Images include `alt` text.
- Buttons labeled with `aria-label` and `aria-current`.

**Performance**
- First visible image can use `priority`.
- All cards have fixed height to avoid CLS.

---

## 10) Adding or Reordering Cards
1. Place the image into `public/images/automations/` as kebab‑case.
2. Add an object to the `automations` array with `image` path.
3. Reorder array entries to change carousel membership.
4. Verify the 3–4–3 split after save.

---

## 11) First‑Scroll AI Overlay
**Location**: `components/AiOverlay.tsx`

**Behavior**
- Opens once on first scroll; can be reopened via CTA link `#ai-overlay`.
- Renders the bot image, a short explainer, URL/email inputs, and a submit button.
- Posts to `/api/audit` and shows confirmation text.

**Styling**
- Uses `.glass` class (backdrop blur, border, shadow).
- Responsive layout; keyboard focus trapped by the modal container.

**Copy**
- Headline: “TriggerBy AI Agent for Shopify”
- Body: “Transparent glass UI… Receive a diagnostic in 30 minutes.”

---

## 12) API: `/api/audit`
```ts
export async function POST(req: NextRequest) {{
  const {{ email, url }} = await req.json();
  if (!email || !url) return NextResponse.json({{ error: "email and url required" }}, {{ status: 400 }});

  // Wire your provider here (Resend example shown in comments).
  // Persist to a queue or database if analysis is asynchronous.

  return NextResponse.json({{ ok: true }});
}}
```

**Validation**: required fields. Enhance with regex/domain checks as needed.  
**Security**: rate‑limit at the edge (e.g., Vercel Middleware or Upstash).  
**Storage**: optional logging to a DB (Supabase/Planetscale) for audit history.

---

## 13) Email Integration (Resend example)
1. Verify a sending domain in Resend.
2. Set `RESEND_API_KEY` in `.env.local` and Vercel.
3. Un‑comment the send code and update `from:`.
4. Send two mails:
   - **Acknowledgement** immediately.
   - **Audit** within 30 minutes (link or PDF).

**Deliverability**
- Set SPF, DKIM, DMARC on your domain.
- Use a dedicated subdomain like `notify.triggerby.ai`.

---

## 14) Image Governance
- Keep artwork cohesive. Use the glossy green/black 3D theme.
- Prefer lossless PNG for UI‑sharp edges; use WebP for photographic blends.
- Run images through Squoosh with `MozJPEG/WebP` quality 70–80.
- Cache headers: Next Image sets optimal HTTP caching automatically.

---

## 15) SEO
- Metadata in `app/(marketing)/layout.tsx`.
- Title ≤ 60 chars. Description ≤ 160 chars.
- Add Open Graph images under `public/brand/og.png`.
- JSON‑LD for Organization and Product (audit) is recommended.
- Generate `sitemap.xml` and `robots.txt` (can be added under `app/`).

---

## 16) Accessibility
- Color contrast ≥ 4.5:1 for body text; ≥ 3:1 for large text.
- Visible focus states on all interactive elements.
- Keyboard navigation across carousels and overlay controls.
- `aria-modal="true"` and `role="dialog"` for the modal container.

---

## 17) Analytics Events
Emit the following events to GA4 or your preferred platform:
- `overlay_open` `{{ source: "scroll" | "cta" }}`
- `audit_submit` `{{ emailDomain, urlHost }}` (hashed or truncated if needed)
- `carousel_view` `{{ carousel: "A"|"B"|"C" }}`
- `carousel_nav` `{{ carousel, direction, fromIndex, toIndex }}`
- `card_cta_click` `{{ id, carousel, position }}`

---

## 18) Performance Budgets
- LCP ≤ 2.0s on mid‑tier mobile.
- CLS < 0.10. Avoid layout shifts by fixing heights and widths.
- JS < 180 KB gzipped on the marketing page.
- Images ≤ 250 KB each; lazy‑load offscreen slides.

**Testing tools**
- Lighthouse, WebPageTest, Chrome DevTools Performance.

---

## 19) Security and Privacy
- Collect only URL and email.
- Avoid storing PII in logs. Redact or hash addresses.
- Set CORS defaults (Next API is same‑origin by default).
- Rate‑limit POST `/api/audit` to prevent abuse.

---

## 20) Local Development
```bash
npm install
npm run dev
```
- Source edits hot‑reload.
- Tailwind JIT builds on file save.
- API route logs print in the terminal.

---

## 21) Deployment (Vercel)
- Import Git repo → select framework “Next.js”.
- Environment variables → add `RESEND_API_KEY` if using Resend.
- Preview deployments on every PR; promote to prod when green.
- Set custom domain and attach SSL automatically.

---

## 22) Content Editing SOP
1. Update copy in the relevant component (Hero, CtaStrip, etc.).
2. For card changes, edit `data/automations.ts` only.
3. For image updates, replace files in `public/images/automations/` with same names.
4. Commit with a descriptive message. Open PR, run preview checks, then merge.

---

## 23) Troubleshooting
- **Port 3000 in use**: `kill -9 $(lsof -ti:3000)`.
- **pnpm not found**: use `npm` or `npm i -g pnpm`.
- **Images not showing**: filename mismatch with `image` path; check console 404s.
- **Overlay not opening**: ensure you scrolled; check `AiOverlay.tsx` event listener.
- **Email not received**: verify sender domain; check spam; confirm env var.

---

## 24) Quality Gates
- Lighthouse P/S/A ≥ 95/95/95 on mobile.
- No TypeScript `any`. No console errors/warnings.
- a11y scan passes (axe DevTools).
- Manual cross‑browser pass: Chrome, Safari, Firefox, iOS Safari, Android Chrome.

---

## 25) RACI
- **Shivam** — Approver. Offer, prices, final copy.
- **Pratyush** — Responsible. Code, integrations, deployments.
- **Harshit** — Accountable for visuals. Image prep, look and feel.
- **Reviewer** — Code review and QA sign‑off.

---

## 26) Roadmap
- Add `/automations` detail pages per card with metrics and schema.
- Integrate a CMS (Sanity/Contentlayer) for marketing copy.
- Add case studies and testimonial sliders.
- Add server‑side event tracking for purchase funnels.
- Replace overlay with multi‑step form experiment (A/B test).

---

## 27) Contribution Guide
- Branch naming: `feat/*`, `fix/*`, `chore/*`.
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`.
- PR template: problem, solution, screenshots, test plan.
- Review SLA: 24 hours for marketing changes.

---

## 28) Code Style
- Strict TypeScript. No implicit `any`.
- Prefer small React components.
- Tailwind class order: layout → spacing → typography → color → effects.
- Avoid multiple z‑index layers; keep stacking contexts simple.

---

## 29) Testing (lightweight)
- Add Playwright smoke test for hero, carousels, overlay open, and POST `/api/audit` happy path.
- Unit test `data` utilities if introduced later.

---

## 30) Glossary
- **WISMO**: “Where Is My Order” support deflection flow.
- **ROAS**: Return on ad spend.
- **LTV**: Lifetime value.
- **CLS/LCP**: Core Web Vitals.

---

## 31) Checklists

### Pre‑commit
- [ ] Build passes locally
- [ ] Images optimized
- [ ] Copy reviewed
- [ ] a11y checked

### Pre‑deploy
- [ ] ENV set in Vercel
- [ ] Analytics firing
- [ ] 3–4–3 carousels correct
- [ ] Overlay submits successfully

### Post‑deploy
- [ ] Smoke tests pass
- [ ] Error logs clean
- [ ] Pixels collecting events

---

## 32) Frequently Asked Questions
**Q: How do I change the first carousel order?**  
A: Reorder the first three entries in `data/automations.ts`.

**Q: Can images live in Google Drive?**  
A: Not recommended. Use `/public`. If required, add `images.remotePatterns` in `next.config.js` for Drive CDN hosts.

**Q: Can we track which card converts best?**  
A: Yes. Emit `card_cta_click` events with card IDs.

---

## 33) Security Notes
- Sanitize all inputs. Never echo raw values to HTML.
- Consider a CAPTCHA if spam increases.
- Use HTTPS everywhere (default on Vercel).

---

## 34) License
Private work product for TriggerBy. Do not redistribute.

---

## 35) Change Log
- v0.1.0 — Initial marketing scaffold with carousels and overlay.

---

## Appendix A — Current Cards (authoritative list)
1. Cart Recovery Engine — `/images/automations/cart-recovery-engine.png`
2. Where Is My Order (WISMO) — `/images/automations/where-is-my-order.png`
3. Ad Budget Optimizer — `/images/automations/ad-budget-optimizer.png`
4. Attribution Protector — `/images/automations/attribution-protector.png`
5. AOV Booster — `/images/automations/aov-booster.png`
6. Profit Maximizer — `/images/automations/profit-maximizer.png`
7. Fraud Shield — `/images/automations/fraud-shield.png`
8. Loss Preventer — `/images/automations/loss-preventer.png`
9. Chargeback Winner — `/images/automations/chargeback-winner.png`
10. Inventory Guard — `/images/automations/inventory-guard.png`

---

## Appendix B — Step‑By‑Step: From Drive to Site
1. Download images from Drive as a zip and unzip.
2. Rename files to kebab‑case.
3. Copy to `public/images/automations/`.
4. Update `data/automations.ts` entries with matching paths.
5. Ensure desired 3/4/3 order via array slicing.
6. Run `npm run dev` and verify the UI.
7. Commit and push to trigger a preview deploy.

---

## Appendix C — Error Scenarios and Fixes
- **400 on `/api/audit`**: Missing `email` or `url`. Ensure both inputs exist.
- **Broken image**: 404 in console. Verify filename and path under `/public`.
- **Overlay opens repeatedly**: Ensure the `seen` flag is set and event listener removed.

---

## Appendix D — Performance Playbook
- Inline critical hero CSS if needed.
- Preload first carousel image with `priority` only on one image.
- Avoid oversized images; let Next Image compute sizes.

---

## Appendix E — A11y Playbook
- Make modal focus‑trap explicit when adding close buttons.
- Provide `Esc` to close and restore focus to the opener.

---

## Appendix F — SEO Playbook
- Add `og:image` at 1200×630.
- Use meaningful headings: one H1 per page.
- Avoid duplicate titles.

---

## Appendix G — Deployment Notes
- Protect preview environments with password if running paid ads.
- Use Vercel logs for API route observability.
