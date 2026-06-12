# AstroGem — Project Notes

This document provides a concise overview of the technical decisions, architecture, and constraints involved in building the **AstroGem** gemstone recommendation application for the Hamara Pandit hiring assignment.

---

## 🛠️ Tech Stack Justification

The project is built as a decoupled Full-Stack application using the **MERN-like** ecosystem (minus the database for the sake of assignment simplicity).

### Frontend
- **React (Vite)**: Selected for its fast hot-module replacement and rapid bundling compared to Create React App.
- **TypeScript**: Used extensively across both frontend and backend to guarantee type safety, especially for the complex `Gemstone` data interfaces and API responses.
- **Vanilla CSS (Custom Design System)**: Instead of relying on heavy component libraries (like Material UI) or utility frameworks (like Tailwind), a custom CSS variable-based design system (`index.css`) was built from scratch. This demonstrates strong foundational CSS skills, allowing for a highly tailored "premium SaaS/fintech" aesthetic with dark/light mode toggles and glassmorphism without the bloat.
- **Lucide React**: Used for modern, clean, and consistent SVG iconography.

### Backend
- **Node.js & Express**: Provides a lightweight, unopinionated server to handle API routing, JWT authentication, and the core recommendation logic.
- **In-Memory Storage**: Instead of requiring the evaluator to spin up a MongoDB or PostgreSQL instance, the app uses in-memory Javascript Maps for user accounts. This guarantees zero-friction setup.
- **bcryptjs & jsonwebtoken**: Standard security practices were implemented for password hashing and stateless session management.

---

## 🏗️ Architecture

The project is divided into two distinct services:
1. `frontend/` (Port 5174)
2. `backend/` (Port 5000)

### Key Architectural Patterns
- **Separation of Concerns**: The frontend handles strictly UI, state, and routing (via conditional rendering to avoid adding `react-router-dom` bloat for a 3-page app). The backend strictly handles data validation, authentication, and the astrology engine logic.
- **Single Source of Truth**: All 9 Navaratna gemstones are hardcoded into a robust JSON array in the backend (`backend/src/data/gemstones.json`). The frontend fetches this data via the `/api/gemstones` endpoint, ensuring UI and logic are always perfectly synced with the data layer.
- **JWT Axios Interceptor**: The frontend `api/client.ts` uses an Axios interceptor to automatically attach the `localStorage` JWT token to every protected request, creating a clean service layer.

---

## 🤔 Assumptions & Constraints

1. **Astrological Accuracy**: Precise Vedic astrology (Jyotish) requires exact birth time, latitude, longitude, and an Ephemeris engine (like Swiss Ephemeris) to calculate exact planetary degrees. For this assignment, we **approximate** the Zodiac via birth month and use Numerology (Birth Day -> Life Path Number) to simulate the Lagna (Ascendant) and Bhagya (Luck) calculations.
2. **Ephemeral Data**: Because we use in-memory storage for users, all registered accounts and history will be wiped when the backend server restarts. 
3. **No Database Scaling**: Concurrency and race conditions (e.g., two users registering the same email at the exact same millisecond) are handled gracefully via simple synchronous checks, which is sufficient for a demo but would require transactional locks in a real DB.
4. **Vite Port**: Vite is configured to fall back to port `5174` or higher if `5173` is busy. The backend CORS policy uses a regular expression (`/^http:\/\/localhost:\d+$/`) to dynamically allow any localhost port to prevent CORS preflight failures during evaluation.

---

## 🔮 Future Improvements

If AstroGem were to be pushed to a production environment for Hamara Pandit, the following improvements would be prioritized:

1. **Panchang API Integration**: Integrate a third-party Jyotish API (e.g., AstroSage or ProKerala API) to get mathematically exact Lagna (Ascendant) and Rashi (Moon sign) calculations based on exact GPS coordinates and birth time.
2. **Persistent Database**: Migrate the in-memory user store and recommendation history to **MongoDB (Mongoose)** or **PostgreSQL (Prisma)**.
3. **Admin Dashboard**: Build a protected `/admin` route allowing staff to add/edit gemstone inventory, adjust pricing, and view aggregate user recommendation statistics.
4. **E-commerce Checkout**: Integrate Stripe or Razorpay so users can purchase their recommended gemstone directly from the results page.
5. **Localization (i18n)**: Provide a toggle to switch the entire application interface and gemstone descriptions into Hindi and Sanskrit.
6. **PDF Report Generation**: Allow users to download their detailed astrological reading and gemstone prescription as a beautifully formatted PDF (using a library like `pdfmake` or `puppeteer`).
