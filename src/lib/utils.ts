import { TarotCardData } from "./types";
import cardsData from "@/data/cards.json";

const cards = cardsData as Record<string, TarotCardData>;
const cardKeys = Object.keys(cards);

export function getDailyCard(date: Date) {
  // Use date as seed
  const dateString = date.toISOString().split('T')[0];
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed += dateString.charCodeAt(i);
  }
  
  const index = seed % cardKeys.length;
  const slug = cardKeys[index];
  
  // Random position based on seed
  const isReversed = seed % 2 === 0;
  
  return {
    slug,
    card: cards[slug],
    isReversed
  };
}

export function getRandomCard() {
  const index = Math.floor(Math.random() * cardKeys.length);
  const slug = cardKeys[index];
  const isReversed = Math.random() > 0.7; // 30% chance for reversed
  
  return {
    slug,
    card: cards[slug],
    isReversed
  };
}

export function getAllCards() {
  return cards;
}

export function getCardBySlug(slug: string) {
  return cards[slug];
}
