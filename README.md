# Attiq — Freelance Portfolio (EN · IT · NL · FR · DE)

Multilingual portfolio website for my freelance services: **AI chatbots, web development, mobile apps and UI/UX design** for businesses in Europe.

Each language has its own URL: `/` (English), `/it`, `/nl`, `/fr`, `/de`. First-time visitors are redirected to their browser language.

## ✨ Features

- 🌍 5 languages with SEO-friendly URLs
- 🧩 Sections: Hero, Services, Work, Process, Why me, Pricing, FAQ, Contact
- 🔎 Structured data (JSON-LD) for Google
- 📱 Fully responsive, with smooth scroll animations
- ⚡ Static site: fast, no database or server needed

## 🛠 Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons

## 🚀 Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## ✏️ Personalise it

| What | Where |
| --- | --- |
| Name, email, WhatsApp, LinkedIn, GitHub, booking link, prices, projects, tech list | `src/portfolio/config.ts` |
| All texts in the 5 languages | `src/i18n/translations.ts` |
| Sections (hero, services, work, pricing, FAQ, contact…) | `src/components/portfolio/` |
| Colours, animations | `src/styles/globals.css` |

## 📂 Related project

The full-stack e-commerce demo (shop, Stripe checkout, AI shopping assistant) shown in the Work section lives in its own repo: [Flock-by-Attiq](https://github.com/attiq78/Flock-by-Attiq).

## 🚀 Deploy

Import this repo into [Vercel](https://vercel.com). No environment variables are needed.

---

Built by [Muhammad Attiq](https://www.linkedin.com/in/attique-dev/)
