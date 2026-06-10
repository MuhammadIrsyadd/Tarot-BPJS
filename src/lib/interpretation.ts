import { TarotCardData } from "./types";
import { getLang } from "./storage";

export function generateConclusion(cards: { card: TarotCardData; isReversed: boolean; positionName: string }[]) {
  // Use storage helper to get current language
  const lang = getLang();

  // Filter out any undefined or null cards to prevent crashes
  const validCards = cards.filter(c => c && c.card);
  
  const majorArcanaCount = validCards.filter(c => c.card.arcana === 'major').length;
  const reversedCount = validCards.filter(c => c.isReversed).length;
  
  // High-level analysis
  let vibe = "";
  if (majorArcanaCount >= 3) {
    vibe = lang === 'id' 
      ? "Sesi ini membawa pesan-pesan dari tingkat kesadaran yang sangat tinggi. Kehadiran banyak Major Arcana menunjukkan bahwa Anda sedang berada di persimpangan jalan besar dalam hidup."
      : "This session carries messages from a very high level of consciousness. The presence of many Major Arcana indicates that you are at a major crossroads in life.";
  } else if (reversedCount >= 3) {
    vibe = lang === 'id'
      ? "Ada banyak energi yang saat ini bersifat internal atau terhambat. Kartu-kartu yang muncul terbalik menunjukkan perlunya refleksi diri yang mendalam."
      : "There is much energy currently internal or blocked. Cards appearing reversed indicate a need for deep self-reflection.";
  } else {
    vibe = lang === 'id'
      ? "Energi dalam bacaan ini sangat dinamis dan membumi. Anda sedang berhadapan dengan aspek-aspek praktis dari kehidupan sehari-hari."
      : "The energy in this reading is very dynamic and grounded. You are dealing with practical aspects of everyday life.";
  }

  // Detailed Card Analysis
  const cardDetails = validCards.map(c => {
    const name = (lang === 'en' && c.card.name_en) ? c.card.name_en : c.card.name;
    const meaning = c.isReversed 
      ? (lang === 'en' && c.card.reversed_en ? c.card.reversed_en.general : c.card.reversed.general)
      : (lang === 'en' && c.card.upright_en ? c.card.upright_en.general : c.card.upright.general);
    
    const keywords = (lang === 'en' && c.card.keywords_en) ? c.card.keywords_en : c.card.keywords;
    const suitInfo = c.card.suit ? (lang === 'id' ? ` Unsur ini berkaitan dengan ${getSuitMeaning(c.card.suit, 'id')}.` : ` This element relates to ${getSuitMeaning(c.card.suit, 'en')}.`) : "";
    
    const posLabel = lang === 'id' ? 'Dalam posisi ini, kartu menekankan pentingnya' : 'In this position, the card emphasizes the importance of';
    const navigationKey = lang === 'id' ? 'sebagai kunci navigasi Anda saat ini.' : 'as your current navigation keys.';
    const reversedLabel = lang === 'id' ? '(Terbalik)' : '(Reversed)';

    return `**${c.positionName}: ${name} ${c.isReversed ? reversedLabel : ''}**
    ${meaning} ${suitInfo} ${posLabel} ${keywords.slice(0,2).join(lang === 'id' ? " dan " : " and ")} ${navigationKey}`;
  });

  // Structural Narrative
  const firstCard = validCards[0];
  const lastCard = validCards[validCards.length - 1];
  const narrativeTitle = lang === 'id' ? '### Analisis Mendalam' : '### Deep Analysis';
  
  const firstName = firstCard ? ((lang === 'en' && firstCard.card.name_en) ? firstCard.card.name_en : firstCard.card.name) : "";
  const lastName = lastCard ? ((lang === 'en' && lastCard.card.name_en) ? lastCard.card.name_en : lastCard.card.name) : "";

  const narrativeText = lang === 'id' 
    ? `Alur energi dimulai dari **${firstCard?.positionName}**, di mana ${firstName} memberi nada awal bacaan. Pesan kemudian ditutup oleh **${lastCard?.positionName}**, saat ${lastName} memperlihatkan lapisan refleksi yang perlu dibawa setelah sesi ini.`
    : `The energy flow starts from **${firstCard?.positionName}**, where ${firstName} sets the initial tone of the reading. The message is then closed by **${lastCard?.positionName}**, as ${lastName} reveals the layer of reflection to be carried after this session.`;

  const narrativeSummary = validCards.length >= 3 && firstCard && lastCard ? `
${narrativeTitle}
${narrativeText}
  ` : "";

  const finalAdvice = lang === 'id'
    ? "Ingatlah bahwa Tarot bukan untuk mendikte masa depan Anda, melainkan untuk memberikan cermin agar Anda bisa melihat diri dengan lebih jelas. Kekuatan untuk memilih tetap ada di tangan Anda. Gunakan wawasan ini untuk melangkah dengan lebih bijaksana dan penuh keberanian."
    : "Remember that Tarot is not to dictate your future, but to provide a mirror so you can see yourself more clearly. The power to choose remains in your hands. Use these insights to move forward more wisely and courageously.";

  return {
    vibe,
    summary: cardDetails.join("\n\n") + "\n\n" + narrativeSummary,
    finalAdvice
  };
}

function getSuitMeaning(suit: string, lang: 'id' | 'en'): string {
  if (lang === 'id') {
    switch (suit) {
      case 'cups': return 'emosi, hubungan, dan intuisi (Elemen Air)';
      case 'wands': return 'semangat, inspirasi, dan aksi (Elemen Api)';
      case 'swords': return 'pikiran, komunikasi, dan tantangan (Elemen Udara)';
      case 'pentacles': return 'kekayaan fisik, pekerjaan, dan stabilitas (Elemen Tanah)';
      default: return 'aspek kehidupan Anda';
    }
  } else {
    switch (suit) {
      case 'cups': return 'emotions, relationships, and intuition (Water Element)';
      case 'wands': return 'spirit, inspiration, and action (Fire Element)';
      case 'swords': return 'thoughts, communication, and challenges (Air Element)';
      case 'pentacles': return 'physical wealth, work, and stability (Earth Element)';
      default: return 'aspects of your life';
    }
  }
}
