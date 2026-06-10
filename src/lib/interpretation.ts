import { TarotCardData } from "./types";

export function generateConclusion(cards: { card: TarotCardData; isReversed: boolean; positionName: string }[]) {
  // Filter out any undefined or null cards to prevent crashes
  const validCards = cards.filter(c => c && c.card);
  
  const majorArcanaCount = validCards.filter(c => c.card.arcana === 'major').length;
  const reversedCount = validCards.filter(c => c.isReversed).length;
  
  // High-level analysis
  let vibe = "";
  if (majorArcanaCount >= 3) {
    vibe = "Sesi ini membawa pesan-pesan dari tingkat kesadaran yang sangat tinggi. Kehadiran banyak Major Arcana menunjukkan bahwa Anda sedang berada di persimpangan jalan besar dalam hidup.";
  } else if (reversedCount >= 3) {
    vibe = "Ada banyak energi yang saat ini bersifat internal atau terhambat. Kartu-kartu yang muncul terbalik menunjukkan perlunya refleksi diri yang mendalam.";
  } else {
    vibe = "Energi dalam bacaan ini sangat dinamis dan membumi. Anda sedang berhadapan dengan aspek-aspek praktis dari kehidupan sehari-hari.";
  }

  // Detailed Card Analysis
  const cardDetails = validCards.map(c => {
    const meaning = c.isReversed ? c.card.reversed.general : c.card.upright.general;
    const suitInfo = c.card.suit ? ` Unsur ini berkaitan dengan ${getSuitMeaning(c.card.suit)}.` : "";
    
    return `**${c.positionName}: ${c.card.name} ${c.isReversed ? '(Terbalik)' : ''}**
    ${meaning} ${suitInfo} Dalam posisi ini, kartu menekankan pentingnya ${c.card.keywords.slice(0,2).join(" dan ")} sebagai kunci navigasi Anda saat ini.`;
  });

  // Structural Narrative
  const firstCard = validCards[0];
  const lastCard = validCards[validCards.length - 1];
  const narrativeSummary = validCards.length >= 5 && firstCard && lastCard ? `
### Analisis Mendalam
Alur energi dimulai dari **${firstCard.positionName}**, di mana ${firstCard.card.name} memberi nada awal bacaan. Pesan kemudian ditutup oleh **${lastCard.positionName}**, saat ${lastCard.card.name} memperlihatkan lapisan refleksi yang perlu dibawa setelah sesi ini.
  ` : "";

  return {
    vibe,
    summary: cardDetails.join("\n\n") + "\n\n" + narrativeSummary,
    finalAdvice: "Ingatlah bahwa Tarot bukan untuk mendikte masa depan Anda, melainkan untuk memberikan cermin agar Anda bisa melihat diri dengan lebih jelas. Kekuatan untuk memilih tetap ada di tangan Anda. Gunakan wawasan ini untuk melangkah dengan lebih bijaksana dan penuh keberanian."
  };
}

function getSuitMeaning(suit: string): string {
  switch (suit) {
    case 'cups': return 'emosi, hubungan, dan intuisi (Elemen Air)';
    case 'wands': return 'semangat, inspirasi, dan aksi (Elemen Api)';
    case 'swords': return 'pikiran, komunikasi, dan tantangan (Elemen Udara)';
    case 'pentacles': return 'kekayaan fisik, pekerjaan, dan stabilitas (Elemen Tanah)';
    default: return 'aspek kehidupan Anda';
  }
}
