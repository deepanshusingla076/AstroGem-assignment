export interface Gemstone {
  id: string;
  name: string;
  sanskritName: string;
  planet: string;
  planetHindi: string;
  color: string;
  benefits: string[];
  mantra: string;
  metal: string;
  finger: string;
  dayToWear: string;
  chakra: string;
  zodiacSigns: string[];
  numerologyNumbers: number[];
  compatibility: {
    friendly: string[];
    inimical: string[];
  };
  description: string;
}

export const navaratna: Gemstone[] = [
  {
    id: "ruby",
    name: "Ruby",
    sanskritName: "Manik",
    planet: "Sun",
    planetHindi: "Surya",
    color: "Deep Red",
    benefits: ["Leadership", "Confidence", "Career Growth", "Vitality", "Fame"],
    mantra: "Om Suryaya Namah",
    metal: "Gold or Copper",
    finger: "Ring Finger",
    dayToWear: "Sunday Morning",
    chakra: "Manipura (Solar Plexus)",
    zodiacSigns: ["Leo"],
    numerologyNumbers: [1],
    compatibility: {
      friendly: ["Pearl", "Yellow Sapphire", "Red Coral"],
      inimical: ["Blue Sapphire", "Diamond", "Hessonite", "Cat's Eye"]
    },
    description: "The King of Gemstones. It brings power, status, and clears self-doubt. Excellent for those seeking high administrative or leadership roles."
  },
  {
    id: "pearl",
    name: "Pearl",
    sanskritName: "Moti",
    planet: "Moon",
    planetHindi: "Chandra",
    color: "White",
    benefits: ["Mental Peace", "Emotional Balance", "Motherhood", "Wealth"],
    mantra: "Om Chandraya Namah",
    metal: "Silver",
    finger: "Little Finger",
    dayToWear: "Monday Evening",
    chakra: "Svadhishthana (Sacral)",
    zodiacSigns: ["Cancer"],
    numerologyNumbers: [2],
    compatibility: {
      friendly: ["Ruby", "Red Coral", "Yellow Sapphire"],
      inimical: ["Hessonite", "Cat's Eye"]
    },
    description: "A calming stone that soothes the mind and reduces anger. It enhances emotional intelligence and attracts steady prosperity."
  },
  {
    id: "yellow_sapphire",
    name: "Yellow Sapphire",
    sanskritName: "Pukhraj",
    planet: "Jupiter",
    planetHindi: "Guru",
    color: "Golden Yellow",
    benefits: ["Wealth", "Wisdom", "Marriage", "Spiritual Growth"],
    mantra: "Om Gurave Namah",
    metal: "Gold",
    finger: "Index Finger",
    dayToWear: "Thursday Morning",
    chakra: "Ajna (Third Eye)",
    zodiacSigns: ["Sagittarius", "Pisces"],
    numerologyNumbers: [3],
    compatibility: {
      friendly: ["Ruby", "Pearl", "Red Coral"],
      inimical: ["Diamond", "Blue Sapphire"]
    },
    description: "One of the most auspicious stones. It acts as a magnet for abundance, ensures marital bliss, and imparts deep philosophical wisdom."
  },
  {
    id: "hessonite",
    name: "Hessonite",
    sanskritName: "Gomed",
    planet: "Rahu",
    planetHindi: "Rahu",
    color: "Cinnamon / Honey",
    benefits: ["Sudden Wealth", "Overcoming Hidden Enemies", "Political Success"],
    mantra: "Om Rahave Namah",
    metal: "Silver or Ashtadhatu",
    finger: "Middle Finger",
    dayToWear: "Saturday Night",
    chakra: "Muladhara (Root)",
    zodiacSigns: ["Aquarius"],
    numerologyNumbers: [4],
    compatibility: {
      friendly: ["Diamond", "Blue Sapphire"],
      inimical: ["Ruby", "Pearl"]
    },
    description: "A stone for out-of-the-box thinkers. It brings sudden gains and protects against psychological fears, making it great for modern tech/political fields."
  },
  {
    id: "emerald",
    name: "Emerald",
    sanskritName: "Panna",
    planet: "Mercury",
    planetHindi: "Budh",
    color: "Green",
    benefits: ["Intelligence", "Communication", "Business Success", "Creativity"],
    mantra: "Om Budhaya Namah",
    metal: "Gold or Silver",
    finger: "Little Finger",
    dayToWear: "Wednesday Morning",
    chakra: "Anahata (Heart)",
    zodiacSigns: ["Gemini", "Virgo"],
    numerologyNumbers: [5],
    compatibility: {
      friendly: ["Diamond", "Blue Sapphire"],
      inimical: ["Pearl"]
    },
    description: "The stone of logic and trade. Highly recommended for students, speakers, and business owners to enhance memory and eloquence."
  },
  {
    id: "diamond",
    name: "Diamond",
    sanskritName: "Heera",
    planet: "Venus",
    planetHindi: "Shukra",
    color: "Sparkling Clear",
    benefits: ["Luxury", "Beauty", "Romance", "Artistic Success"],
    mantra: "Om Shukraya Namah",
    metal: "Gold, Platinum or Silver",
    finger: "Middle or Ring Finger",
    dayToWear: "Friday Morning",
    chakra: "Anahata (Heart) / Crown",
    zodiacSigns: ["Taurus", "Libra"],
    numerologyNumbers: [6],
    compatibility: {
      friendly: ["Emerald", "Blue Sapphire", "Hessonite"],
      inimical: ["Ruby", "Pearl", "Yellow Sapphire"]
    },
    description: "The ultimate stone of luxury. It amplifies charisma, attracts romantic love, and brings material comforts and artistic recognition."
  },
  {
    id: "cats_eye",
    name: "Cat's Eye",
    sanskritName: "Lehsuniya",
    planet: "Ketu",
    planetHindi: "Ketu",
    color: "Grey-Green with Band",
    benefits: ["Spiritual Awakening", "Protection from Evil Eye", "Intuition"],
    mantra: "Om Ketave Namah",
    metal: "Silver or Ashtadhatu",
    finger: "Middle Finger",
    dayToWear: "Tuesday or Saturday Night",
    chakra: "Sahasrara (Crown)",
    zodiacSigns: ["Scorpio"],
    numerologyNumbers: [7],
    compatibility: {
      friendly: ["Diamond", "Blue Sapphire"],
      inimical: ["Ruby", "Pearl"]
    },
    description: "A highly mystical stone. It detaches one from worldly sorrows, sparks deep intuition, and acts as a shield against black magic."
  },
  {
    id: "blue_sapphire",
    name: "Blue Sapphire",
    sanskritName: "Neelam",
    planet: "Saturn",
    planetHindi: "Shani",
    color: "Royal Blue",
    benefits: ["Discipline", "Justice", "Massive Success", "Removing Obstacles"],
    mantra: "Om Shanaye Namah",
    metal: "Silver or Platinum",
    finger: "Middle Finger",
    dayToWear: "Saturday Morning",
    chakra: "Ajna (Third Eye)",
    zodiacSigns: ["Capricorn", "Aquarius"],
    numerologyNumbers: [8],
    compatibility: {
      friendly: ["Diamond", "Emerald"],
      inimical: ["Ruby", "Pearl", "Red Coral"]
    },
    description: "The fastest-acting gemstone. It can bring overnight success, immense wealth, and supreme discipline. Must be worn with care."
  },
  {
    id: "red_coral",
    name: "Red Coral",
    sanskritName: "Moonga",
    planet: "Mars",
    planetHindi: "Mangal",
    color: "Bright Red",
    benefits: ["Courage", "Physical Strength", "Overcoming Debts", "Property Gain"],
    mantra: "Om Mangalaya Namah",
    metal: "Gold or Copper",
    finger: "Ring Finger",
    dayToWear: "Tuesday Morning",
    chakra: "Muladhara (Root)",
    zodiacSigns: ["Aries", "Scorpio"],
    numerologyNumbers: [9],
    compatibility: {
      friendly: ["Ruby", "Pearl", "Yellow Sapphire"],
      inimical: ["Emerald", "Blue Sapphire", "Diamond"]
    },
    description: "The stone of warriors. It injects immense vitality, cures blood-related issues, and helps in acquiring real estate and defeating enemies."
  }
];

export const getGemstoneById = (id: string): Gemstone | undefined => {
  return navaratna.find(gem => gem.id === id);
};
