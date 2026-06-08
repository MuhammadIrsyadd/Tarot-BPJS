export interface SpreadType {
  id: string;
  name: string;
  description: string;
  cardsCount: number;
  positions: string[];
}

export const SPREADS: SpreadType[] = [
  {
    id: "five-mystic",
    name: "Mystic Five (Standard)",
    description: "Spread 5 kartu dengan Atap (Masa Depan/Tujuan) dan Alas (Fondasi).",
    cardsCount: 5,
    positions: ["Fondasi (Bawah)", "Masa Lalu", "Masa Kini", "Masa Depan", "Tujuan Akhir (Atas)"]
  },
  {
    id: "single",
    name: "Satu Kartu",
    description: "Jawaban cepat untuk pertanyaan yang spesifik.",
    cardsCount: 1,
    positions: ["Jawaban"]
  },
  {
    id: "three-cards",
    name: "Tiga Kartu",
    description: "Masa Lalu, Sekarang, dan Masa Depan.",
    cardsCount: 3,
    positions: ["Masa Lalu", "Masa Kini", "Masa Depan"]
  },
  {
    id: "love",
    name: "Spread Cinta",
    description: "Memahami dinamika hubungan asmara.",
    cardsCount: 3,
    positions: ["Diri Sendiri", "Pasangan / Gebetan", "Dinamika Hubungan"]
  },
  {
    id: "career",
    name: "Spread Karir",
    description: "Panduan untuk pekerjaan dan tujuan profesional.",
    cardsCount: 3,
    positions: ["Posisi Saat Ini", "Tantangan", "Langkah Selanjutnya"]
  }
];
