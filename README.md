# AstroGem 💎

AstroGem is a premium, full-stack gemstone recommendation application. It matches users with their ideal sacred gemstone based on their birth numerology, zodiac sign, and life intentions using an authentic Vedic astrology recommendation engine. The application features secure user authentication, a searchable gemstone catalog, a compatibility checker, and a responsive, world-class user interface built with React and custom CSS.

---

## 🌟 Features

- **Personalized Recommendations**: Evaluates numerological Life Path Numbers, zodiac alignments, and personal goals to find the Lagna Ratna (Life Stone), Bhagya Ratna (Lucky Stone), and Karya Ratna (Remedy Stone).
- **User Authentication**: Secure register and login functionality using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Navaratna Catalog**: A comprehensive, filterable directory of the 9 sacred gemstones, including detailed Vedic mantras, wearing rituals, and planetary profiles.
- **Compatibility Checker**: Verify if two gemstones can be safely worn together based on Vedic planetary friendships and enmities.
- **Modern UI/UX**: Premium aesthetic featuring dark/light mode, glassmorphism details, smooth animations, and a responsive dashboard layout.
- **AstroGuide Chat**: An interactive chat interface to ask common questions about gemstones and astrology.

---

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express**: For server execution and RESTful API routing.
- **TypeScript**: For static typing and robust code architecture.
- **JWT (JSON Web Tokens)**: Secure token-based user authentication.
- **bcryptjs**: Password encryption.
- **In-Memory Storage**: Lightweight, fast data persistence tailored for demonstration purposes without requiring external databases.

### Frontend
- **React (Vite)**: High-performance single page application (SPA).
- **TypeScript**: Ensuring type safety across components and API responses.
- **Vanilla CSS (Custom Design System)**: Utility-free, scalable CSS leveraging custom properties for theme management.
- **Lucide React**: Clean and consistent iconography.
- **Axios**: Promise-based HTTP client with interceptors for seamless API communication.

---

## 📁 Project Structure

```text
hamara-pandit/
├── backend/
│   ├── src/
│   │   ├── data/           # JSON data source for Navaratna gemstones
│   │   ├── middleware/     # Authentication and authorization guards (auth.ts)
│   │   ├── routes/         # Express API routing (auth.ts, gemstones.ts)
│   │   ├── services/       # Core business logic (astrologyService.ts)
│   │   └── index.ts        # Server startup and main entry point
│   ├── package.json        # Backend dependencies & scripts
│   └── tsconfig.json       # TypeScript configuration
│
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios client and API interceptors (client.ts)
│   │   ├── components/     # Reusable UI components (GemFinder, GemCatalog, etc.)
│   │   ├── context/        # React context wrappers for global state (AuthContext.tsx)
│   │   ├── pages/          # View/Route containers (LandingPage, AuthPage, DashboardLayout)
│   │   ├── App.tsx         # Main application component and routing logic
│   │   ├── main.tsx        # App entry and React DOM hydration
│   │   └── index.css       # Global design system and custom styling
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend dependencies & scripts
│   └── vite.config.ts      # Vite configuration
```

---

## ⚙️ Recommendation Engine Logic

The custom recommendation algorithm in `backend/src/services/astrologyService.ts` determines gemstones based on the following Vedic principles:

1. **Life Stone (Lagna Ratna)**: Calculated by reducing the user's birth day to a single-digit Life Path Number (1-9). Each number dictates a ruling planet and its corresponding primary gemstone.
2. **Lucky Stone (Bhagya Ratna)**: Determined by approximating the user's Moon sign based on their birth month. The engine then cross-references this with planetary compatibility to ensure it does not conflict with the Life Stone.
3. **Remedy Stone (Karya Ratna)**: Selected based on the user's specific life intention (e.g., Wealth, Career, Health, Love, Peace, Protection). The engine filters available stones and picks one that is highly compatible with the Life Stone.

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Registers a new user.
- `POST /api/auth/login` - Authenticates user & returns JWT.

### Gemstones
- `GET /api/gemstones` - Lists all 9 Navaratna gemstones *(Requires Token)*.
- `GET /api/gemstones/:id` - Fetch details for a specific gemstone *(Requires Token)*.
- `POST /api/gemstones/recommend` - Calculates and returns personalized recommendations *(Requires Token)*.
- `POST /api/gemstones/compatibility` - Checks compatibility between two gemstones *(Requires Token)*.
- `GET /api/health` - Public endpoint to check API status.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

---

### Step 1: Backend Setup

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on port 5000.*

---

### Step 2: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5174` (or the port Vite outputs).

---

## 👥 Using the Application

Since AstroGem utilizes a lightweight in-memory storage system designed for seamless demonstration:
- **No Database Setup Needed**: You do not need to configure MongoDB or any external databases.
- **Registration**: Simply click "Get Started" and register a new account on the fly. 
- **Demo Access**: The login page features a "Fill Demo Credentials" button to instantly populate form fields for quick testing.

Enjoy discovering your sacred gemstone!
