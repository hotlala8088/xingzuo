
export type ZodiacSign = 
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' 
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' 
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface ZodiacData {
  id: ZodiacSign;
  symbol: string;
  dateRange: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: string;
  description: string;
  traits: string[];
  imageUrl: string;
}

export interface HoroscopeResponse {
  general: string;
  love: string;
  career: string;
  luckyNumber: number;
  luckyColor: string;
  mood: string;
}

export interface CompatibilityResponse {
  score: number;
  summary: string;
  strengths: string[];
  challenges: string[];
}

export interface UserProfile {
  name: string;
  birthDate: string;
  zodiacId: ZodiacSign;
}
