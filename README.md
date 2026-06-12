# AstroGem — Vedic Gemstone Recommendation App

> A full-stack Gemstone Recommendation platform built for the **Hamara Pandit Hiring Assignment**

![AstroGem](https://img.shields.io/badge/AstroGem-v1.0.0-gold) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue) ![React](https://img.shields.io/badge/React-18-61DAFB) ![Express](https://img.shields.io/badge/Express-4.18-green) ![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📋 Project Overview

AstroGem is a **professionally architected, full-stack web application** that provides personalized Vedic gemstone recommendations based on Numerology, Zodiac signs, and life intentions. It implements the ancient Vedic **Navaratna** (Nine Sacred Gemstones) system via a clean REST API backed by JWT authentication.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Auth (JWT)** | Register/Login with JWT token stored in localStorage. All gemstone APIs are protected. |
| 💎 **Gem Finder** | 3-step wizard → birth details → Vedic analysis → 3 personalized gemstone recommendations |
| 📚 **Navaratna Catalog** | Full searchable & filterable directory of all 9 gemstones with detailed profiles, mantras, and rituals |
| ⚖️ **Compatibility Checker** | Check if 2 gemstones can be worn together using Vedic planetary friendship rules |
| 💬 **AstroGuide Chat** | Keyword-aware AI chat with suggestions, typing indicators, and rich astrological responses |
| 🌗 **Dark/Light Mode** | Smooth theme toggle — sidebar always stays dark navy (SaaS-standard two-tone design) |
| 📱 **Responsive** | Fully responsive across mobile, tablet, and desktop |

---

## 🏗️ Architecture

```
hamara-pandit/
├── backend/                  ← Node.js + Express + TypeScript (Port 5000)
│   ├── src/
│   │   ├── data/gemstones.json    ← Navaratna data (single source of truth)
│   │   ├── services/astrologyService.ts   ← Recommendation engine
│   │   ├── middleware/auth.ts     ← JWT verification
│   │   ├── routes/auth.ts         ← POST /api/auth/login, /register
│   │   ├── routes/gemstones.ts    ← GET /api/gemstones, POST /recommend, /compatibility
│   │   └── index.ts               ← Express entry point
│   └── package.json
│
└── src/ (frontend)          ← React + Vite + TypeScript (Port 5173)
    ├── api/client.ts          ← Axios API client with JWT interceptor
    ├── context/AuthContext.tsx← React auth state management
    ├── pages/
    │   ├── LandingPage.tsx    ← Hero, Features, How It Works, Footer
    │   ├── AuthPage.tsx       ← Login / Signup (calls backend)
    │   └── DashboardLayout.tsx← Sidebar + Topbar + Content
    └── components/
        ├── GemFinder.tsx      ← 3-step form → API call → Result cards
        ├── GemCatalog.tsx     ← Searchable grid from API + detail modal
        ├── GemCompatibility.tsx ← Compatibility checker (API call)
        └── AstroChat.tsx      ← Conversational UI with knowledge base
```

---

## 🧠 Vedic Astrology & Numerology Logic

The recommendation engine in `backend/src/services/astrologyService.ts`:

1. **Life Path Number** (Numerology): Reduces the birth day to a single digit (1-9). Each number maps to a ruling planet (1→Sun, 2→Moon, 3→Jupiter, 4→Rahu, 5→Mercury, 6→Venus, 7→Ketu, 8→Saturn, 9→Mars).

2. **Zodiac Approximation**: Uses birth month to approximate Moon sign (Jan→Capricorn, Feb→Aquarius, etc.).

3. **Compatibility Validation**: Cross-checks the secondary stone is not in the primary's "inimical" list using the Vedic planetary enmity rules (e.g., Sun and Saturn are enemies → Ruby and Blue Sapphire cannot be worn together).

4. **Remedy Stone**: Filters gemstones by life focus area (wealth, career, health, love, peace, protection) and picks one compatible with the primary.

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1. Install Dependencies

```bash
# Frontend (root folder)
npm install

# Backend
cd backend
npm install
```

### 2. Start Backend

```bash
cd backend
npm run dev
# → Runs on http://localhost:5000
```

### 3. Start Frontend

```bash
# From root folder
npm run dev
# → Runs on http://localhost:5173
```

### 4. Open in Browser

Visit `http://localhost:5173`. Click **Get Started**, register an account, and explore!

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `POST` | `/api/auth/login` | ❌ | Login, returns JWT |
| `GET` | `/api/gemstones` | ✅ | All 9 gemstones |
| `GET` | `/api/gemstones/:id` | ✅ | Single gemstone |
| `POST` | `/api/gemstones/recommend` | ✅ | Birth details → recommendations |
| `POST` | `/api/gemstones/compatibility` | ✅ | Two gem IDs → compatibility result |
| `GET` | `/api/health` | ❌ | Health check |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| Language | TypeScript (both frontend & backend) |
| Styling | Vanilla CSS with CSS Custom Properties (no bloat) |
| HTTP Client | Axios with JWT interceptor |
| Backend | Node.js + Express |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Icons | Lucide React |
| Storage | In-memory (no DB needed for demo) |

---

## 📐 Design Decisions & Assumptions

- **No Database**: User data is stored in-memory on the backend. For production, MongoDB or PostgreSQL would be used.
- **Zodiac Approximation**: We use birth month for zodiac estimation since exact birth time and location-based calculations require ephemeris APIs (out of scope for this assignment).
- **Sidebar Always Dark**: Following modern SaaS design patterns (Linear, Vercel), the sidebar stays dark regardless of the light/dark mode toggle, creating a premium two-tone contrast.
- **Password Security**: Passwords are hashed with bcryptjs even for in-memory storage, demonstrating security best practices.

---

## 🔮 Future Improvements

- **Panchang API Integration**: Precise planetary degree calculations using birth time and GPS coordinates.
- **MongoDB Persistence**: Store user profiles and history.
- **Gemstone Shopping**: Integration with Hamara Pandit's gemstone catalog for direct purchase.
- **PDF Report Generation**: Export personalized report as a styled PDF.
- **Multi-Language**: Hindi and Sanskrit localization.
- **Mobile App**: React Native version.

---

*Built with 💎 by Deepanshu Singla 
Assignment (June 2026)*
