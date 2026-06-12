import gemstones from '../data/gemstones.json';

interface UserInput {
  name: string;
  day: number;
  month: number;
  year: number;
  focus: 'wealth' | 'career' | 'health' | 'love' | 'peace' | 'protection';
}

const getSingleDigit = (n: number): number => {
  if (n < 10) return n;
  return getSingleDigit(String(n).split('').reduce((a, d) => a + parseInt(d), 0));
};

const zodiacByMonth: Record<number, string> = {
  1: 'Capricorn', 2: 'Aquarius', 3: 'Pisces', 4: 'Aries',
  5: 'Taurus', 6: 'Gemini', 7: 'Cancer', 8: 'Leo',
  9: 'Virgo', 10: 'Libra', 11: 'Scorpio', 12: 'Sagittarius'
};

const focusMap: Record<string, string[]> = {
  wealth: ['yellow_sapphire', 'diamond', 'emerald'],
  career: ['ruby', 'blue_sapphire', 'emerald'],
  health: ['red_coral', 'pearl', 'ruby'],
  love: ['diamond', 'yellow_sapphire', 'pearl'],
  peace: ['pearl', 'emerald', 'yellow_sapphire'],
  protection: ['cats_eye', 'hessonite', 'blue_sapphire']
};

export const calculateRecommendation = (input: UserInput) => {
  const birthNum = getSingleDigit(input.day);
  const userZodiac = zodiacByMonth[input.month] || 'Aries';

  // Primary: numerology
  let primary = gemstones.find(g => g.numerologyNumbers.includes(birthNum)) || gemstones[0];

  // Secondary: zodiac-based, must be friendly with primary
  let secondary = gemstones.find(
    g => g.zodiacSigns.includes(userZodiac) && g.id !== primary.id && !primary.compatibility.inimical.includes(g.id)
  );
  if (!secondary) {
    const friendly = primary.compatibility.friendly;
    secondary = gemstones.find(g => friendly.includes(g.id)) || gemstones[2];
  }

  // Remedy: focus-based, must not conflict
  const focusList = focusMap[input.focus] || [];
  let remedy = gemstones.find(
    g => focusList.includes(g.id) && g.id !== primary.id && g.id !== secondary!.id && !primary.compatibility.inimical.includes(g.id)
  );
  if (!remedy) {
    remedy = gemstones.find(g => g.id !== primary.id && g.id !== secondary!.id) || gemstones[4];
  }

  return {
    primary,
    secondary,
    remedy,
    numerologyNumber: birthNum,
    zodiac: userZodiac,
    focus: input.focus
  };
};

export const checkCompatibility = (gem1Id: string, gem2Id: string) => {
  const gem1 = gemstones.find(g => g.id === gem1Id);
  const gem2 = gemstones.find(g => g.id === gem2Id);

  if (!gem1 || !gem2) return { status: 'error', message: 'Gemstone not found.' };

  if (gem1.id === gem2.id) {
    return { status: 'neutral', gem1, gem2, message: 'Same gemstone selected. No conflict, but one is sufficient.' };
  }

  if (gem1.compatibility.friendly.includes(gem2.id)) {
    return {
      status: 'friendly',
      gem1, gem2,
      message: `${gem1.name} and ${gem2.name} are astrologically compatible. Their ruling planets (${gem1.planet} & ${gem2.planet}) are friends. Wearing them together is highly auspicious and beneficial.`
    };
  }

  if (gem1.compatibility.inimical.includes(gem2.id)) {
    return {
      status: 'inimical',
      gem1, gem2,
      message: `⚠️ WARNING: ${gem1.name} and ${gem2.name} are INIMICAL. The planets ${gem1.planet} and ${gem2.planet} are enemies. Wearing these together can cause serious harm. Do NOT combine them.`
    };
  }

  return {
    status: 'neutral',
    gem1, gem2,
    message: `${gem1.name} and ${gem2.name} are neutral to each other. They can be worn simultaneously if recommended by your birth chart reading.`
  };
};

export { gemstones };
