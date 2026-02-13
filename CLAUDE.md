# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**biz2a_home** is a static GitHub Pages website serving as the home page for Biz2A, an IT business consulting firm. The site is entirely static HTML/CSS/JavaScript with no build process required.

**Primary URLs:**
- Main site: `index.html` (Korean-language consulting services page)
- Golf jokes collection: `golfjoke/index.html` (50+ individual joke pages)
- Musical tool: `isorhythm_motet/` (specialized HTML5 motet player)

## Architecture & Development

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Hosting**: GitHub Pages with custom domain (CNAME file present)
- **Forms**: Formspree integration for contact form submissions
- **Fonts**: Google Fonts (Noto Sans KR for Korean text)

### Key File Structure
```
├── index.html              # Main Korean consulting page
├── css/style.css           # Global styles (~240 lines)
├── js/script.js            # Main JavaScript (~70 lines)
├── golfjoke/               # Self-contained joke collection
│   ├── index.html          # Joke navigation page  
│   ├── gj0001-gj0065.html  # Individual joke pages
│   ├── css/style.css       # Golfjoke-specific styles
│   └── js/script.js        # Golfjoke navigation logic
├── isorhythm_motet/        # Musical tool (inline styles)
└── images/                 # Shared assets (logos, photos)
```

### CSS Architecture
- **CSS Variables** defined in `:root` at `css/style.css:8-16`
  - `--primary-color: #3a5f8a` (corporate blue)
  - `--secondary-color: #6fa3d2` 
  - `--transition: all 0.3s ease`
- **Responsive Design**: Mobile-first with breakpoint at 768px
- **Grid System**: CSS Grid with `max-width: 1200px` containers
- **Typography**: Korean support via Noto Sans KR (weights: 300, 400, 500, 700)

### JavaScript Patterns
- **Event-Driven**: DOM ready listeners, intersection observers for animations
- **Form Handling**: AJAX submission to Formspree at `https://formspree.io/f/xjkrrbwk`
- **Mobile Navigation**: Class-based toggle system (`hamburger.active`, `nav-menu.active`)
- **Scroll Animations**: IntersectionObserver for `.feature`, `.service-card`, `.ceo-highlights`

## Development Commands

### Local Development
```bash
# No build process - open directly in browser
open index.html
# OR serve locally
python -m http.server 8000
# OR
npx serve .
```

### Deployment
```bash
# Deploy to GitHub Pages
git add .
git commit -m "Update site content"
git push origin main
# Site auto-deploys via GitHub Actions
```

## Content & Language Conventions

- **Primary Language**: Korean (`lang="ko"`)
- **Business Focus**: IT consulting services, professional tone
- **Contact Form**: Name, company, email, message + mandatory privacy consent
- **Navigation**: 5 main sections (home, about, services, consultant, contact) + golf jokes link

## Critical Integration Points

### Contact Form (`index.html:174`)
- **Formspree Action**: `https://formspree.io/f/xjkrrbwk`
- **Required Fields**: name, company, email, message, privacy consent
- **AJAX Handling**: Form submission with success/error messaging in `js/script.js`
- **Subject Line**: Auto-populated from name and company inputs

### Image Dependencies
- **Favicon**: `images/favicon.png` (required for all pages)
- **Logo**: `images/logo.png` (header navigation)
- **CEO Photo**: `images/dk_profile2-2.jpg` (consultant section)

### Responsive Navigation (`css/style.css:41+`, `js/script.js:1-23`)
- **Desktop**: Horizontal navigation bar
- **Mobile**: Hamburger menu toggle at 768px breakpoint
- **State Management**: Class-based active states

## Styling Guidelines

- **Section Layout**: Use `.container` class with consistent padding (60px desktop, 40px mobile)
- **Card Components**: Follow `.service-card` pattern for new content blocks
- **Button Styles**: Use `.btn` and `.btn-primary` classes
- **Color Usage**: Stick to CSS variables for consistency
- **Korean Typography**: Ensure proper line-height (1.4-1.6) for readability

## Important Notes

- **No Build Process**: Direct HTML/CSS/JavaScript editing
- **GitHub Pages**: Auto-deploys from main branch
- **CNAME**: Custom domain configured
- **Static Only**: No server-side processing or database
- **Privacy Compliance**: GDPR-like consent form included
- **Cross-Module**: Golf jokes and motet tools reference `../images/` and `../css/style.css`