# AstroGem — Project Notes 

I built the **AstroGem** application to demonstrate my full-stack skills, focusing on a clean UI, solid architecture, and a functional core. The goal of this project is to provide users with personalized Vedic gemstone recommendations based on their birth details and life goals.

Below is a detailed breakdown of exactly what I developed, the logic behind the application, and the honest constraints of the current implementation.

---

## 🌟 What the Application Does (Core Features)

I built four main features for the user experience:

1. **GemFinder (Recommendation Engine)**: 
   - A step-by-step wizard that collects the user's name, birth date, and primary life focus (e.g., Wealth, Career, Health, Love, Peace, Protection).
   - It calculates three personalized stones: 
     - **Primary Stone (Lagna Ratna / Life Stone)**: Based on numerology (Life Path Number calculated from the birth day).
     - **Secondary Stone (Bhagya Ratna / Lucky Stone)**: Based on the Zodiac sign approximated by their birth month.
     - **Remedy Stone (Karya Ratna)**: Based on their chosen life focus (e.g., Ruby for Career), with logic to ensure it doesn't astrologically conflict with the primary stone.
2. **Navaratna Catalog**: 
   - A detailed, filterable directory of all 9 sacred Vedic gemstones. Users can view the ruling planet, Vedic mantras, wearing rituals, and the specific benefits of each stone.
3. **Gem Compatibility Checker**: 
   - A tool where users can select two different gemstones to see if they are safe to wear together. It uses Vedic astrological rules (friendly vs. inimical planets) to warn users against conflicting combinations (e.g., wearing Blue Sapphire with Ruby).
4. **AstroGuide Chat**: 
   - An interactive chat interface designed to answer user queries and provide guidance on gemstone usage.

---

## 🛠️ The Tech Stack I Used

### Frontend
- **React (Vite)**: I chose Vite over Create React App for a much faster development experience and hot-module replacement.
- **TypeScript**: Used extensively across both the frontend and backend to ensure data shapes (like the `Gemstone` interfaces) stay consistent and catch errors early during development.
- **Custom Vanilla CSS**: I decided not to use heavy component libraries (like Material UI) or utility frameworks (like Tailwind). Instead, I built a custom CSS variable-based design system (`index.css`) from scratch. This showcases my foundational CSS skills and supports a premium dark/light mode and glassmorphism UI.
- **Axios Interceptors**: The frontend automatically attaches the JWT authentication token to every protected request for a seamless user experience.

### Backend
- **Node.js & Express**: I set up a lightweight server to handle API routing, JWT authentication, and the core recommendation logic.
- **Stateless Authentication**: I implemented secure password hashing with `bcryptjs` and session management using `jsonwebtoken` (JWT). 
- **Decoupled Architecture**: The frontend strictly handles UI and user input, while the backend is the single source of truth for the recommendation logic and astrological data.

---

## 🤔 Honest Constraints & Trade-offs (No Faking)

Because this is a demonstration project, I took a few deliberate shortcuts to keep the focus on code quality, UI/UX, and core functionality rather than complex infrastructure:

1. **Approximated Astrology Logic**: Real Vedic astrology requires exact birth times, precise GPS coordinates, and an Ephemeris engine (like a Panchang API) to calculate the exact Ascendant (Lagna) and planetary degrees. I didn't build a massive astrology engine. Instead, I approximated the recommendations using simple Numerology (Birth Day) and Zodiac mapping (Birth Month).
2. **Hardcoded Navaratna Data**: Instead of a database, the complex details for all 9 gemstones are hardcoded into a robust JSON array (`backend/src/data/gemstones.json`). The frontend fetches this data via the backend's `/api/gemstones` endpoint.
3. **In-Memory User Storage**: To make it instantly runnable for anyone without needing to configure MongoDB or PostgreSQL, I used in-memory Javascript arrays/maps for user accounts. This means **all registered users and history will be wiped when the backend server restarts**. 
4. **No Concurrency Handling**: Simple synchronous checks are used for things like email registration conflicts. This is perfectly fine for a demo, but a real production app would require database-level locks and transactions.

---

## 🔮 What I Would Add Next for Production

If I were to deploy this application to a real-world production environment, here is what I would prioritize next:
1. **Panchang API Integration**: Connecting to third-party APIs like AstroSage or ProKerala to get mathematically exact, location-based birth chart readings.
2. **Persistent Database**: Migrating the in-memory user store and recommendation history to a real database like **MongoDB** (with Mongoose) or **PostgreSQL** (with Prisma).
3. **E-commerce Checkout**: Integrating a payment gateway (like Razorpay or Stripe) to allow users to directly purchase the gemstones they are recommended.
4. **Localization (i18n)**: Adding full Hindi and Sanskrit language support to cater to the traditional astrological demographic.
