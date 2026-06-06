# NexVolt — Premium LiFePO4 Battery Website

> A production-ready premium energy technology website built to compete with Tesla Powerwall, EcoFlow, and Bluetti.

![NexVolt Hero](public/images/nexvolt_battery_3d_render_1780678669823.png)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion + GSAP |
| 3D Rendering | React Three Fiber + Three.js |
| Backend | Supabase (PostgreSQL) |
| Data Fetching | TanStack React Query |
| Forms | React Hook Form + Zod |
| Theming | next-themes (Dark/Light/Auto) |
| Deployment | Vercel-ready |

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── 3d/               # Three.js 3D components
│   │   └── BatteryModel.tsx
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Reusable page sections
│   │   ├── Hero.tsx
│   │   ├── EnergyFlow.tsx
│   │   ├── DayNightCycle.tsx
│   │   └── SmartTechnology.tsx
│   └── ui/               # Shared UI atoms
├── data/                 # Static mock data (before Supabase)
│   └── products.ts
├── lib/                  # Client integrations
│   └── supabase.ts
├── pages/                # Route-level page components
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── EnergyCalculator.tsx
│   ├── MobileApp.tsx
│   ├── BecomeDealer.tsx
│   └── Contact.tsx
├── types/                # Global TypeScript types
└── utils/
    └── cn.ts             # Tailwind class merging helper
supabase/
└── migrations/
    └── 20240605000000_initial_schema.sql
```

---

## ⚡ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

```bash
cp .env.example .env
# Then fill in your Supabase credentials
```

### 3. Run Database Migrations

Copy the SQL from `supabase/migrations/20240605000000_initial_schema.sql` into the Supabase SQL Editor.

### 4. Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 🗄️ Supabase Schema

| Table | Purpose |
|-------|---------|
| `products` | Product catalog with specs, features, images, SEO |
| `contact_leads` | All contact form submissions |
| `dealer_applications` | Dealer program applicants |
| `calculator_submissions` | Energy calculator lead capture |
| `site_settings` | CMS-style key-value settings |

Row Level Security (RLS) is enabled on all tables with appropriate public read/write policies.

---

## 🎨 Color System

| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | `#009DFF` | CTAs, interactive elements, data |
| Energy Green | `#7ED321` | Status indicators, metrics |
| Background | `#121212` | Main background (dark mode) |
| Card | `#1F1F1F` | Glass/card surfaces |

---

## 🌐 Deployment (Vercel)

1. Connect your GitHub repo to Vercel.
2. Set environment variables in the Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy. Done.

---

## 📋 Roadmap

- [ ] Supabase live product data integration
- [ ] Admin dashboard for CMS management  
- [ ] SEO meta tags + Schema.org + Sitemap
- [ ] Blog section
- [ ] WhatsApp chat integration
- [ ] Advanced energy calculator (appliance audit)
- [ ] EV Charging future products section
