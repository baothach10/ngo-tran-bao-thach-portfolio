# Ngo Tran Bao Thach Portfolio

Personal portfolio of **Ngo Tran Bao Thach** — an interactive React + Three.js site showcasing projects, experience, achievements, and contact.

**Live:** [https://ngo-tran-bao-thach.vercel.app](https://ngo-tran-bao-thach.vercel.app)

## Features

- Interactive 3D scenes with Three.js and OGL
- Smooth page transitions and motion with GSAP
- Work highlights — projects and positions with detail modals
- Achievements — certificates and awards
- Contact form via EmailJS and React Hook Form
- SEO-friendly pages with sitemap generation
- Responsive layout across desktop and mobile

## Pages

| Route | Page | Description |
| --- | --- | --- |
| `/` | Home | Landing page with an aurora background, interactive 3D “mini me” scene, role introduction, location, and tech stack carousel. |
| `/about-me` | About Me | Personal background, education, main skills, tech stack, and beyond-work interests. |
| `/work-highlights` | Work Highlights | Professional experience and key projects, with modal detail views for each position and project. |
| `/achievements` | Achievements | Awards and certifications with modal detail views for each entry. |
| `/contact-me` | Contact Me | Contact form with light-ray background and EmailJS delivery. |

Detail routes open as overlays on their parent page:

- `/work-highlights/projects/:id` — project details
- `/work-highlights/positions/:id` — position details
- `/achievements/certificates/:id` — certificate details
- `/achievements/awards/:id` — award details

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React 19, TypeScript, Vite |
| 3D / motion | Three.js, OGL, GSAP, Phaser |
| Routing | React Router |
| Forms | React Hook Form, EmailJS |
| Deploy / analytics | Vercel, Vercel Analytics |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment

Create a `.env.local` file in the project root:

```env
VITE_REACT_APP_PUBLIC_KEY=your_emailjs_public_key
VITE_REACT_APP_SERVICE_ID=your_emailjs_service_id
VITE_REACT_APP_TEMPLATE_ID=your_emailjs_template_id
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run type-check` | TypeScript check without emit |
| `npm run format` | Format with Prettier |
| `npm run generate-sitemap` | Regenerate `public/sitemap.xml` |

## Project Structure

```
src/
  components/   # Shared UI and page sections
  pages/        # Route-level pages
  hooks/        # Custom React hooks
  context/      # React context providers
  styles/       # Global styles
  utils/        # Helpers
public/
  assets/       # Images, fonts, 3D models
  data/         # Portfolio content (JSON)
```

## License

Personal portfolio project. All rights reserved.
