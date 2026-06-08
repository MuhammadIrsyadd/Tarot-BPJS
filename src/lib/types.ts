export interface CardInterpretation {
  general: string;
  love: string;
  career: string;
}

export interface TarotCardData {
  name: string;
  number: number;
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'pentacles' | 'swords' | 'wands' | null;
  element: string;
  keywords: string[];
  upright: CardInterpretation;
  reversed: CardInterpretation;
}

export interface CardState {
  slug: string;
  isReversed: boolean;
  isRevealed: boolean;
}
