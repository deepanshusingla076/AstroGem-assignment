# AstroGem (Gemstone Recommendation App)

A highly premium, interactive Gemstone Recommendation Web Application built for **Hamara Pandit**. AstroGem utilizes Vedic astrology principles, numerology, and life intentions to recommend the optimal life, luck, and remedy stones.

## ✨ Features
- **Vedic & Numerological Engine:** Automatically maps birth details to planetary rulers (Life Path Numbers) and approximates zodiac signs to provide highly accurate primary (Lagna) and secondary (Bhagya) gemstones.
- **Dynamic Intentions System:** Recommends specific remedy stones based on personal goals (Wealth, Career, Health, Peace, etc.).
- **Interactive Gemstone Catalog:** Explore the Navaratna (9 Sacred Gemstones) with detailed properties, mantras, and compatibility filters.
- **Premium UI / UX:** 
  - Dynamic Celestial Starfield Background (Canvas API).
  - High-fidelity Glassmorphism UI components.
  - Seamless Dark/Light mode theme system using custom CSS properties.

## 🛠 Tech Stack
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Custom Vanilla CSS (No bloated frameworks) for maximum performance, using CSS custom properties for theming.
- **Icons:** Lucide React

## 🚀 Architecture & Logic
The astrology recommendation engine (`src/utils/astrologyEngine.ts`) functions as follows:
1. **Life Path (Numerology):** Sums the birth day to a single digit (1-9) to determine the governing planet.
2. **Zodiac Approximation:** Uses the birth month to approximate the Moon/Sun sign.
3. **Compatibility Checking:** Ensures the secondary and remedy stones are not astrologically inimical to the primary stone (e.g., avoiding mixing Sun/Ruby with Saturn/Blue Sapphire).

## 📦 Setup & Run

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🔮 Future Improvements
- Integration with external ephemeris/Panchang APIs for precise planetary degree calculations.
- Live LLM-powered AstroChat for dynamic astrological consultations.
- Multi-language support (Hindi/Sanskrit localization).

*Developed as a hiring project for Hamara Pandit.*
