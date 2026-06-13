# AI Usage Declaration 🤖✍️

This document outlines the usage of Artificial Intelligence (AI) assistants in the development, architecture design, coding, styling, and verification of **AstroGem**.

---

## 🤝 Human-AI Collaboration Model

The codebase represents a modern collaborative workflow. Tasks were distributed as follows:

### 1. Code Generation & Scaffolding (AI-Driven)
- Scaffolding of the Node.js / Express backend router mappings.
- Designing the in-memory data models for User and Gemstone records.
- Writing the recommendation engine logic (`backend/src/services/astrologyService.ts`) to calculate matches based on numerology, zodiac approximation, and life intentions.
- Scaffolding React page components (`LandingPage`, `DashboardLayout`, `GemFinder`, etc.).

### 2. UI/UX Design & Styling (AI & Human Directives)
- Implementation of a premium theme (glassmorphism dashboard cards, clean forms, responsive layout configurations).
- Creation of a custom CSS design system (`index.css`) with CSS variables for dark and light modes.
- Styling interactive components (sidebar menus, glowing buttons, step-by-step wizards).

### 3. Review, Debugging, & Quality Verification (Human & AI Collaboration)
- Testing of authentication states and local storage session tokens.
- Validation of Axios interceptor request injections (`frontend/src/api/client.ts`).
- Inspection of Express endpoints for robust error handling and CORS policy adjustments.

---

## 📈 Codebase Contribution Estimates

Below is a breakdown of the estimated contribution distribution:

| Layer / Component | AI-Generated Code (%) | Human Review & Refinement (%) |
| :--- | :---: | :---: |
| **Backend API Routing & Controllers** | 90% | 10% |
| **Astrology Recommendation Engine** | 95% | 5% |
| **Data Structures & JSON Seeding** | 85% | 15% |
| **React Components & UI Layout** | 85% | 15% |
| **React Context & API Services** | 80% | 20% |
| **Documentation & Guides** | 90% | 10% |

---

## 🔍 Verification & Integrity Procedures

To ensure that AI-generated code meets strict security, readability, and functional standards, the following guidelines were applied:

1. **Secret Management Verification**: Assured that all credentials (JWT secrets) are handled securely.
2. **Robust Password Hashing**: Verified that password hashing is handled securely using `bcryptjs` before in-memory storage.
3. **Cross-Origin Access Control**: Validated that `cors` middleware configurations align with security practices between frontend and backend ports, dynamically allowing localhost origins.
4. **No Placeholders**: Assured all gemstone data, mantras, and UI components display complete datasets, avoiding dummy texts and incomplete layouts.
