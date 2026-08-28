# Retro Pastel Profile Template

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Zero-Build](https://img.shields.io/badge/Build-Zero--Dependency-success?style=flat-square)](#)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Ready-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Ready-181717?style=flat-square&logo=github)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-pink.svg?style=flat-square)](LICENSE)

A lightweight, zero-dependency, aesthetic retro pastel profile and bio template. Fully configurable through a single `config.js` file with zero build step required.

This template is free for personal and commercial use. If you use it, please make sure to give credit (e.g. keeping the subtle footer credit line linking to [NottKoneko](https://github.com/NottKoneko)).

---

## Features

- **Zero Build Step / Plug and Play:** Plain HTML, CSS, and Vanilla JavaScript. Runs directly in any browser or static host.
- **100% Config-Driven (`config.js`):** Customize creator details, links, stats, schedules, commissions, catalog items, and images without touching HTML markup.
- **Safe Open-Source Assets:**
  - Pure CSS dual linear-gradient gingham background (zero proprietary images or vectors).
  - Clean CC0 heart SVG bullets and standard open-source Feather/Lucide UI icons.
- **Fully Responsive Multi-Column Layout:** 3-column desktop layout (`22% / 56% / 22%`) that transitions to a mobile-friendly single-column layout.
- **Multi-Section SPA Navigation:** Dynamic section switching (Home, Menu/Catalog) with browser history support (`#home`, `#menu`) and prev/next controls.
- **Interactive Toast Notification:** Animated copy-to-clipboard button with visual confirmation popup.
- **Ultra Lightweight:** Sub-millisecond load times with minimal asset overhead.

---

## File Structure

```text
├── index.html         # Semantic HTML5 structure & icon SVGs
├── style.css          # CSS design tokens, pure CSS gingham pattern & responsive grids
├── config.js          # Central configuration file for all content, links & text
├── app.js             # Lightweight vanilla JS state & section switching router
├── assets/            # Local images (avatar, banner placeholder)
└── README.md          # Project documentation & deployment guide
```

---

## Customization Guide

You can customize almost everything by editing [`config.js`](config.js):

### 1. Site Metadata & Address Bar Pill
```javascript
meta: {
  title: "Your Name Official Site",
  domainPill: "yourname.com",
  domainUrl: "https://yourname.com",
}
```

### 2. Header & Banner Image
```javascript
header: {
  navLinks: [
    { id: "home", label: "home" },
    { id: "menu", label: "menu" },
  ],
  bannerImage: {
    url: "assets/banner-placeholder.png", // Or external image URL
    alt: "Banner Image",
    maxHeight: "180px", // "180px" or "none" for natural aspect ratio
  },
}
```

### 3. Profile, Stats & Favorite Things (Left Sidebar)
```javascript
homeSection: {
  leftColumn: {
    avatarUrl: "assets/avatar-placeholder.png",
    name: "Your Name",
    tagline: "Your custom tagline or introduction.",
    statsButtonLabel: "stats",
    stats: [
      { label: "Energy", value: "[4/5]" },
      { label: "Creativity", value: "[5/5]" },
    ],
    favoriteThings: {
      title: "FAVORITE THINGS",
      items: [
        { category: "Interests", value: "Art, Gaming, Coding" },
      ],
    },
    varietySchedule: {
      title: "Main schedule",
      text: "Weekly live schedule details go here.",
    },
  },
}
```

### 4. Links Directory & Paragraphs (Center Column)
```javascript
centerColumn: {
  heading: "Welcome to my room~",
  subheading: "Official information board & links directory",
  paragraphs: [
    "Paragraph 1 welcoming your audience.",
    "Paragraph 2 with updates or community notes.",
  ],
  linkGroups: [
    {
      title: "Social Media",
      links: [
        { label: "X / Twitter", url: "https://x.com/" },
        { label: "Instagram", url: "https://instagram.com/" },
      ],
    },
  ],
}
```

### 5. Todos, Status, Calendar & Side Schedule (Right Sidebar)
```javascript
rightColumn: {
  todosTitle: "To dos:",
  todos: ["Update schedule", "Drink water", "Finish artwork"],
  statusTitle: "status",
  statusText: "Working on exciting new projects!",
  calendarTitle: "Calendar",
  calendarDate: "Next Event:",
  calendarEvent: "Community gaming night this Friday at 7pm EST.",
  sideScheduleTitle: "Side schedule",
  sideScheduleItems: [
    "Every Sunday weekly video release.",
  ],
}
```

### 6. Subpage / Service Catalog / Commissions (Menu Section)
```javascript
menuSection: {
  leftColumn: {
    commissionsHeading: "Custom Commissions",
    commissionsStatus: "OPEN",
    commissionsDesc: "Custom commission requests are open.",
    commissionButton: { label: "Request Form", url: "https://forms.google.com/" },
    disclaimerTitle: "Notice & Policy",
    disclaimerText: "Terms and guidelines for services.",
  },
  rightColumn: {
    title: "Service Catalog / Menu",
    description: "Browse available services and categories below.",
    categories: [
      {
        title: "Illustration",
        items: ["Chibi Icon", "Bust Illustration", "Full Body"],
      },
    ],
  },
}
```

### 7. Custom Colors & Styling
To tweak the color palette, open [`style.css`](style.css) and adjust `:root` variables:
```css
:root {
  --bg-page: #FFF2F8;        /* Page background */
  --bg-card: #FFFFFF;        /* Card background */
  --bg-header: #FFEBF5;      /* Header background */
  --border-main: #FFD4E9;    /* Borders */
  --text-main: #FFB3D8;      /* Primary accent color */
  --text-body: #FFB3D8;      /* Body text color */
}
```

---

## Deployment

Because this project requires zero compilation or build steps, deployment takes under 1 minute.

### Option A: Cloudflare Pages (Recommended)
1. Fork or push this repository to GitHub.
2. Log into the Cloudflare Dashboard and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Set **Build command** to *(leave empty)* and **Build output directory** to `retro-pastel-profile` (or root if deploying standalone).
5. Click **Save and Deploy**.

### Option B: GitHub Pages
1. Push your repository to GitHub.
2. Go to your repository **Settings** > **Pages**.
3. Under **Source**, select `Deploy from a branch`.
4. Choose `main` branch and folder, then click **Save**.

### Option C: Vercel / Netlify
- Drag and drop the project folder directly into the Netlify or Vercel dashboard.

---

## License & Credits

- **License:** MIT License — free for personal and commercial use (attribution requested).
- **Built by:** [NottKoneko](https://github.com/NottKoneko)
- **Vector Icons:** Standard CC0 and Feather Icons (MIT License).
