# AI Usage Declaration — AstroGem

This document transparently declares the use of AI tools during the development of the **AstroGem** Gemstone Recommendation App.

---

## Tool Used

**Antigravity IDE (Powered by Google DeepMind / Claude Sonnet)**
- Used as an AI pair-programming assistant throughout the project.

---

## How AI Was Used

### 1. Project Scaffolding
The initial Vite + React + TypeScript project was initialized using the standard Vite CLI. The directory structure (separating `backend/` and `frontend/` concerns) was designed and architected by the developer, with AI helping generate boilerplate files.

### 2. CSS Design System
The full `index.css` design system (CSS custom properties for dark/light themes, glassmorphism utilities, sidebar styles, responsive grid, animation keyframes) was written with AI assistance to ensure consistency and professional polish.

### 3. Vedic Astrology & Numerology Engine
The core recommendation logic in `backend/src/services/astrologyService.ts` — including the numerology number calculation, zodiac month mapping, planetary compatibility checks, and focus-area filtering — was built using AI's knowledge of Vedic Jyotish astrology principles.

### 4. Gemstone Data
The detailed JSON data for all 9 Navaratna gemstones (`backend/src/data/gemstones.json`) — including Sanskrit names, planetary rulers, chakras, mantras, wearing rituals, purification steps, and compatibility lists — was synthesized by AI from Vedic astrology reference material.

### 5. UI Component Structure
The React component architecture (LandingPage, AuthPage, DashboardLayout, GemFinder, GemCatalog, GemCompatibility, AstroChat) was designed collaboratively, with AI generating the complete TypeScript component code.

### 6. AstroChat Knowledge Base
The 15 keyword-matching patterns in the `AstroChat` component were manually curated to cover the most common gemstone queries, with AI helping phrase the astrological responses accurately.

---

## What Was NOT AI-Generated
- Project requirements interpretation and feature prioritization
- Overall architecture decisions (backend vs frontend split, JWT auth choice, in-memory storage decision)
- The product naming decision ("AstroGem")
- Final code review and quality control

---

*This declaration is provided in compliance with the Hamara Pandit hiring assignment guidelines.*
