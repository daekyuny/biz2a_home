# Biz2A Codebase Instructions for AI Agents

## Project Overview
**biz2a_home** is a static website hosted on GitHub Pages serving as a temporary home page for Biz2A, an IT business consulting firm. The site promotes the consulting services of Daekyun Yoon and includes supplementary content sections (golf jokes, musical resources).

**Key URLs:**
- Main site: Root `index.html` with consultation services
- Golf jokes: `golfjoke/index.html` (50+ joke pages)
- Isorhythmic motet player: `isorhythm_motet/` (specialized musical tool)

## Architecture & Key Components

### Site Structure
- **Main Site** (`index.html`): Korean-language marketing page with 5 core sections (hero, about, services, consultant bio, contact)
- **Golf Jokes** (`golfjoke/`): Magazine-style joke collection (50 individual pages + index)
- **Music Tool** (`isorhythm_motet/`): Interactive HTML5 motet player

### Styling Conventions
- **CSS Variables**: Defined in `:root` (see `css/style.css`)
  - Color theme: `--primary-color: #3a5f8a` (corporate blue), `--secondary-color: #6fa3d2`
  - All transitions use `--transition: all 0.3s ease`
- **Layout**: Mobile-first responsive design with breakpoint at 768px
- **Typography**: 'Noto Sans KR' Google Font (weights: 300, 400, 500, 700)
- **Grid System**: CSS Grid with `max-width: 1200px` container for desktop sections

### JavaScript Patterns
- **DOM Manipulation**: Vanilla JS (no frameworks), event-driven architecture
- **Form Handling**: Formspree integration (`https://formspree.io/f/xjkrrbwk`) with AJAX submission
- **Animations**: IntersectionObserver for scroll-triggered fade-ins on `.feature`, `.service-card`, `.ceo-highlights`
- **Mobile Menu**: Hamburger toggle with class-based state management (`hamburger.active`, `nav-menu.active`)

## Content & Language Conventions

- **Primary Language**: Korean (HTML `lang="ko"`, form labels, descriptions)
- **Technical Terms**: Mixed Korean/English (e.g., "IT 경영 컨설팅" = IT Business Consulting)
- **Tone**: Professional, consultant-focused; emphasizes credentials and expertise
- **Form Fields**: Name, company affiliation, email, message + privacy consent checkbox (GDPR-like)
- **Contact Integration**: Uses Formspree for form submission; includes hidden subject line templates

## Critical Developer Workflows

### Adding New Pages
1. Maintain the header/footer navigation structure (link back to `../index.html` for subpages)
2. Import shared CSS from root: `<link rel="stylesheet" href="../css/style.css">` (adjust path depth)
3. Use `.container` class with `max-width: 1200px` for consistency
4. Include favicon references and Google Fonts preconnect links

### Updating Forms
- Contact form uses Formspree with AJAX; subject line auto-populated from `[name]` and `company` inputs
- Privacy consent checkbox is **required** (`required` attribute on input)
- Form reset happens after successful submission (see `js/script.js` lines 82-90)

### Mobile Responsiveness
- Hamburger menu toggles on `max-width: 768px`
- All grid sections (`service-grid`, `about-features`) use `repeat(auto-fit, minmax(300px, 1fr))`
- Section padding: 60px desktop, 40px mobile; adjust if adding new sections

### CSS Class Naming
- Sections: `.hero`, `.about`, `.services`, `.ceo`, `.contact`
- Cards/Features: `.feature`, `.service-card`, `.ceo-highlights`
- Buttons: `.btn`, `.btn-primary`
- No BEM convention; flat, descriptive names preferred

## Integration Points & Dependencies

- **External**: Google Fonts (Noto Sans KR), Formspree (email)
- **Images**: Required favicon, logo, profile photo in `/images/` folder (referenced in HTML)
- **GitHub Pages**: CNAME file present; site auto-deploys on push to `main`
- **Subdomain Structure**: Golf jokes (50 files) and motet player are independent modules; share root CSS

## File Organization & Patterns

- **Shared Assets**: `css/style.css` (240+ lines), `js/script.js` (70+ lines)
- **Dedicated Modules**: `golfjoke/css/style.css`, `golfjoke/js/script.js`, `isorhythm_motet/` (inline styles)
- **Images Path**: Root level `images/` folder (all submodules reference `../images/`)
- **No Build Step**: Pure static HTML/CSS/JS; no npm dependencies or transpilation

## Common Tasks & Commands

- **Local Preview**: Open `index.html` in browser (no build required)
- **Deploy**: Push to `main` branch; GitHub Pages auto-deploys
- **Add New Section**: Copy service-card pattern in `.service-grid`; update navigation in header
- **Update Consultant Bio**: Edit `.ceo-content` in `index.html`; profile image at `images/dk_profile2-2.jpg`

## Standards to Follow

1. **Preserve Korean content**: Maintain Korean headings, descriptions, and form labels
2. **Consistent spacing**: Use CSS variables for colors/transitions; maintain 1.5rem gaps between elements
3. **Accessibility**: Include alt text on images; semantic HTML (h1/h2/h3 hierarchy, form labels)
4. **Mobile-first mindset**: Test hamburger menu and grid collapse at 768px breakpoint
5. **Form validation**: Privacy consent is mandatory; other fields use standard HTML5 validation
