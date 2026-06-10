export interface CardInterpretation {
  general: string;
  love: string;
  career: string;
}

export interface TarotCardData {
  name: string;
  name_en?: string;
  number: number;
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'pentacles' | 'swords' | 'wands' | null;
  element: string;
  element_en?: string;
  keywords: string[];
  keywords_en?: string[];
  upright: CardInterpretation;
  upright_en?: CardInterpretation;
  reversed: CardInterpretation;
  reversed_en?: CardInterpretation;
}

export interface CardState {
  slug: string;
  isReversed: boolean;
  isRevealed: boolean;
}
