# 🚀 Andaz — Next-Gen Learning Dashboard

A high-fidelity, futuristic student dashboard built with **Next.js 16 (App Router)**, **Supabase**, **Framer Motion**, and **Tailwind CSS v4**. Features server-rendered data, hardware-accelerated animations, and zero layout shifts.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square&logo=supabase)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)

---

## ✨ Features

- **Bento Grid Layout** — Responsive dashboard with Hero, Course, and Activity tiles
- **Server Components (RSC)** — Courses fetched securely from Supabase on the server
- **Granular Suspense** — Only course cards show loading skeletons; Hero and Activity render instantly
- **Spring Physics Animations** — Hover effects with `stiffness: 300, damping: 20`
- **Staggered Entry** — Tiles fade in with blur reduction (`opacity + translateY + blur`)
- **layoutId Sidebar** — Active navigation indicator smoothly animates between items
- **Animated Counters** — Hero stats count up from 0 on mount
- **Contribution Heatmap** — GitHub-style activity visualization
- **Dark Mode Only** — Premium dark UI inspired by Linear, Vercel, Raycast
- **Fully Responsive** — Desktop (sidebar), Tablet (icon-only), Mobile (bottom nav)
- **Accessibility** — Semantic HTML, keyboard navigation, ARIA labels, `prefers-reduced-motion`
- **Empty & Error States** — Polished UI for zero courses and database connection failures

---

## 🏗 Architecture

### Server/Client Component Split

```
app/page.tsx (Server Component)
├── <HeroTile />                    → Client (mock data — renders instantly)
├── <ActivityTile />                → Client (mock data — renders instantly)
└── <Suspense fallback={skeletons}>
    └── <CourseSection />           → Server (async Supabase fetch)
        └── <CourseGrid />          → Client (Framer Motion animations)
```

**Key decision:** The page is a Server Component that uses granular `<Suspense>`. Only `<CourseSection>` (which fetches from Supabase) is wrapped in Suspense. This means:

- Hero tile and Activity tile render immediately — no waiting for the database
- Course cards show skeleton loaders while Supabase data streams in
- Better perceived performance and demonstrates strong RSC understanding

### Component Hierarchy

```
RootLayout (Server)
├── Sidebar (Client)         — Collapsible nav, layoutId highlight
├── main
│   └── DashboardPage (Server)
│       ├── HeroTile (Client)
│       │   ├── AnimatedCounter ×4
│       │   └── WeeklyGoalBar
│       ├── Suspense → CourseSection (Server)
│       │   └── CourseGrid (Client)
│       │       ├── CourseTile × N
│       │       │   └── ProgressBar
│       │       └── CourseEmptyState (if 0 courses)
│       └── ActivityTile (Client)
│           ├── ContributionHeatmap
│           └── WeeklyBarChart
└── MobileNav (Client)      — Bottom nav for mobile
```

### Type-Safe Icon Registry

Instead of unsafe `icons[iconName]` bracket lookups, the app uses a typed registry:

```typescript
const iconRegistry: Record<string, LucideIcon> = { BookOpen, Brain, Code2, ... };

export function getIcon(name: string): LucideIcon {
  return iconRegistry[name] ?? FallbackIcon;
}
```

Unknown icon names from the database gracefully fall back to a default icon.

---

## 🗄 Database Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Navigate to **Settings → API** to find your project URL and anon key

### 2. Create the `courses` Table

Run this SQL in the **SQL Editor** (`supabase.com/dashboard/project/_/sql/new`):

```sql
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'BookOpen'),
  ('System Design Fundamentals', 42, 'Brain'),
  ('TypeScript Mastery', 91, 'Code2'),
  ('Data Structures & Algorithms', 28, 'Trophy');
```

### 3. Enable Read Access

Ensure Row Level Security (RLS) allows public read access:

```sql
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) project (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/andaz.git
cd andaz

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase URL and anon key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## 📁 Project Structure

```
andaz/
├── app/
│   ├── globals.css           # Tailwind v4 design tokens + base styles
│   ├── layout.tsx            # Root layout — fonts, metadata, sidebar shell
│   ├── page.tsx              # Dashboard — granular Suspense architecture
│   ├── loading.tsx           # Route-level skeleton fallback
│   └── error.tsx             # Error boundary with retry
│
├── components/
│   ├── dashboard/
│   │   ├── HeroTile.tsx      # Stats centerpiece (greeting, counters, goal)
│   │   ├── CourseSection.tsx  # Server Component — Supabase fetch
│   │   ├── CourseGrid.tsx     # Animated grid with stagger
│   │   ├── CourseTile.tsx     # Individual card (icon, progress, glow)
│   │   ├── CourseEmptyState.tsx # Zero courses UI
│   │   ├── CourseSkeletons.tsx  # Loading skeletons
│   │   ├── ActivityTile.tsx   # Compound analytics tile
│   │   ├── ContributionHeatmap.tsx # GitHub-style grid
│   │   └── WeeklyBarChart.tsx # Daily study hours
│   ├── sidebar/
│   │   ├── Sidebar.tsx        # Collapsible nav + layoutId
│   │   ├── SidebarItem.tsx    # Nav item with active highlight
│   │   └── MobileNav.tsx      # Bottom nav for mobile
│   └── ui/
│       ├── AnimatedCounter.tsx # Number count-up
│       ├── ProgressBar.tsx    # Animated progress with glow
│       ├── GlowCard.tsx       # Reusable card wrapper
│       ├── Skeleton.tsx       # Loading primitive
│       └── WeeklyGoalBar.tsx  # Goal progress indicator
│
├── hooks/
│   └── useAnimationConfig.ts  # Reduced motion + animation presets
│
├── lib/
│   ├── supabase/server.ts     # Supabase server client
│   ├── icon-registry.ts       # Typed Lucide icon map
│   ├── constants.ts           # Mock data + config
│   ├── types.ts               # TypeScript interfaces
│   └── utils.ts               # cn() helper
│
├── .env.example               # Environment variable template
└── README.md
```

---

## 🎨 Design Decisions

### Visual Language

Inspired by **Linear**, **Vercel**, **Raycast**, and **Resend** — not generic admin templates.

- **Color palette**: Near-black backgrounds (`#09090b`), indigo/violet accents, emerald for success
- **Typography**: Geist font family with tight heading tracking
- **Effects**: Glassmorphism cards, gradient mesh backgrounds, grain textures, border glow on hover
- **Animation**: Spring physics (`type: "spring"`) for natural feel, blur-to-focus entry

### Zero Layout Shifts

All animations exclusively use `transform` and `opacity` (GPU-composited properties):

- Hover: `scale(1.02)` via `whileHover` — no `width`/`height`/`margin` changes
- Progress bar: `scaleX` animation — not `width` transition
- Border glow: `box-shadow` transition — not border changes
- Cards: `will-change-transform` hint for compositor promotion

### Reduced Motion Support

Every animated component uses `useReducedMotion()` from Framer Motion. When `prefers-reduced-motion` is active:

- No stagger delays
- No blur/translate animations
- No hover scale
- Counter values show immediately
- Content remains fully functional

### Supabase Security

- Environment variables use `NEXT_PUBLIC_` prefix (required for Supabase client)
- Data is fetched in **Server Components** — the Supabase client never runs on the browser
- `persistSession: false` — no auth persistence needed for read-only access
- `.env.local` is gitignored; `.env.example` committed as a template

---

## 🧪 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Framer Motion in RSC | Clear `"use client"` boundary — Server Component fetches data, passes to Client Component for animation |
| Tailwind CSS v4 breaking changes | Used `@theme inline` syntax and `@import "tailwindcss"` instead of `@tailwind` directives |
| Next.js 16 error boundary API | Used `unstable_retry` instead of deprecated `reset` per docs |
| Dynamic icon rendering | Built typed registry with compile-time validation and runtime fallback |
| Zero layout shifts | Exclusively used `transform`, `opacity`, and `box-shadow` for all animations |

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2.7 | Framework (App Router, RSC) |
| React | 19.2.4 | UI Library |
| Supabase | 2.107+ | PostgreSQL BaaS |
| Framer Motion | 12.40+ | Animations |
| Tailwind CSS | 4.x | Styling |
| Lucide React | 1.17+ | Icons |
| TypeScript | 5.x | Type Safety |

---

## 📝 Assumptions

1. **No authentication** — The assignment doesn't mention auth, so the user name ("Nishtha") is hardcoded in `lib/constants.ts`
2. **Hero stats are mock data** — Streak, XP, and weekly goal are static values since no user tracking system is required
3. **Activity data is generated** — Contribution heatmap and weekly hours use deterministic random mock data
4. **Course progress is stored in Supabase** — The `progress` integer (0-100) represents completion percentage
5. **Icon names must match the registry** — Invalid `icon_name` values in the database gracefully fall back to a default icon

---

## 📄 License

MIT
