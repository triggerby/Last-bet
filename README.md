# TriggerBy — AI Automation for Shopify
_Last updated: 2025-01-22 01:43 UTC_

> Conversion-first marketing site and lead engine for TriggerBy. Built with **Next.js 14**, **TypeScript**, **TailwindCSS**, **Embla Carousel**, and a **glass UI AI Overlay** that captures store URL + email and schedules a 30‑minute diagnostic.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` and scroll once to trigger the AI overlay.

## Project Structure

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx          # Global shell with header/footer
│   │   └── page.tsx            # Main marketing page
│   ├── api/
│   │   └── audit/route.ts      # POST endpoint for audit requests
│   ├── globals.css             # Tailwind + custom styles
│   ├── sitemap.ts              # SEO sitemap
│   └── robots.ts               # SEO robots.txt
├── components/
│   ├── Hero.tsx                # Hero section with dual CTAs
│   ├── Automations.tsx         # 3 carousels (3-4-3 split)
│   ├── CtaStrip.tsx           # Glass CTA panel
│   ├── AiOverlay.tsx          # Scroll-triggered modal
│   ├── Header.tsx             # Navigation
│   └── Footer.tsx             # Footer
├── data/
│   └── automations.ts         # 10 automation cards data
public/
├── images/
│   ├── automations/           # Card artwork (10 images)
│   ├── agent/                 # AI agent photo
│   └── brand/                 # Logo, OG image
```

## Key Features

- **Scroll-triggered AI Overlay**: Opens on first scroll, captures email + store URL
- **3 Carousels**: 10 automations split as 3-4-3 (Recovery → Optimization → Protection)
- **Glass UI**: Modern backdrop-blur effects throughout
- **Responsive Design**: Mobile-first with Tailwind breakpoints
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Performance**: Core Web Vitals optimized, image optimization

## Customization

### Adding/Reordering Automation Cards
1. Add image to `public/images/automations/` (kebab-case, WebP/PNG, ≤250KB)
2. Update `src/data/automations.ts` array
3. Order determines carousel placement (first 3 = Carousel A, next 4 = B, last 3 = C)

### Email Integration
1. Set `RESEND_API_KEY` in `.env.local`
2. Uncomment email code in `src/app/api/audit/route.ts`
3. Update sender domain

## Deployment

Recommended: **Vercel**
1. Connect GitHub repo
2. Set environment variables
3. Deploy automatically on push

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **TailwindCSS** (utility-first)
- **Embla Carousel** (accessible carousels)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Performance Targets

- LCP ≤ 2.0s
- CLS < 0.10
- JS bundle < 180KB gzipped
- Images ≤ 250KB each

## License

Private work product for TriggerBy. Do not redistribute.