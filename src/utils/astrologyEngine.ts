import { navaratna } from './gemstoneData';
import type { Gemstone } from './gemstoneData';

export type LifeFocus = 'wealth' | 'career' | 'health' | 'love' | 'peace' | 'protection';

export interface UserDetails {
  name: string;
  day: number;
  month: number;
  year: number;
  focus: LifeFocus;
}

export interface RecommendationResult {
  primary: Gemstone;
  secondary: Gemstone;
  remedy: Gemstone;
  numerologyNumber: number;
}

const getSingleDigit = (num: number): number => {
  if (num < 10) return num;
  const sum = String(num).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  return getSingleDigit(sum);
};

export const calculateRecommendation = (user: UserDetails): RecommendationResult => {
  // 1. Calculate Life Path / Birth Number (Numerology)
  // For simplicity and direct planetary alignment, we use the Birth Day number
  // e.g., 15th -> 1+5 = 6 -> Venus -> Diamond
  const birthNumber = getSingleDigit(user.day);
  
  // 2. Determine Primary Gemstone based on Birth Number
  let primaryGem = navaratna.find(g => g.numerologyNumbers.includes(birthNumber));
  if (!primaryGem) primaryGem = navaratna[0]; // fallback to Ruby

  // 3. Determine Secondary Gemstone based on birth Month (Zodiac approx)
  // 1=Jan, 2=Feb etc.
  const zodiacApproximations: Record<number, string> = {
    1: "Capricorn", 2: "Aquarius", 3: "Pisces", 4: "Aries",
    5: "Taurus", 6: "Gemini", 7: "Cancer", 8: "Leo",
    9: "Virgo", 10: "Libra", 11: "Scorpio", 12: "Sagittarius"
  };
  const userZodiac = zodiacApproximations[user.month] || "Aries";
  let secondaryGem = navaratna.find(g => g.zodiacSigns.includes(userZodiac));
  
  // Prevent secondary from being the same as primary, or inimical to primary
  if (!secondaryGem || secondaryGem.id === primaryGem.id || primaryGem.compatibility.inimical.includes(secondaryGem.name)) {
    // Find a friendly stone
    const friendlyNames = primaryGem.compatibility.friendly;
    secondaryGem = navaratna.find(g => friendlyNames.includes(g.name)) || navaratna[2]; // fallback to Yellow Sapphire
  }

  // 4. Determine Remedy Gemstone based on Focus
  let remedyPool: Gemstone[] = [];
  switch (user.focus) {
    case 'wealth':
      remedyPool = navaratna.filter(g => g.benefits.some(b => b.toLowerCase().includes('wealth')));
      break;
    case 'career':
      remedyPool = navaratna.filter(g => g.benefits.some(b => b.toLowerCase().includes('career') || b.toLowerCase().includes('success')));
      break;
    case 'health':
      remedyPool = navaratna.filter(g => ['red_coral', 'pearl', 'ruby'].includes(g.id));
      break;
    case 'love':
      remedyPool = navaratna.filter(g => ['diamond', 'yellow_sapphire', 'pearl'].includes(g.id));
      break;
    case 'peace':
      remedyPool = navaratna.filter(g => ['pearl', 'emerald', 'yellow_sapphire'].includes(g.id));
      break;
    case 'protection':
      remedyPool = navaratna.filter(g => ['cats_eye', 'hessonite', 'blue_sapphire'].includes(g.id));
      break;
    default:
      remedyPool = navaratna;
  }

  // Pick a remedy stone that is not primary or secondary, and ideally friendly to primary
  let remedyGem = remedyPool.find(g => 
    g.id !== primaryGem!.id && 
    g.id !== secondaryGem!.id && 
    !primaryGem!.compatibility.inimical.includes(g.name)
  );

  // Fallback
  if (!remedyGem) {
    remedyGem = navaratna.find(g => g.id !== primaryGem!.id && g.id !== secondaryGem!.id) || navaratna[0];
  }

  return {
    primary: primaryGem,
    secondary: secondaryGem,
    remedy: remedyGem,
    numerologyNumber: birthNumber
  };
};
