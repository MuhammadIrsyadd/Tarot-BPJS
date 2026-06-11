# Product Requirements Document (PRD): Arcana Mystica

**Versi:** 1.0  
**Status:** Draft / Research-based  
**Platform:** Web (Responsive Desktop & Mobile)  
**Teknologi:** Next.js 15, React 19, Tailwind CSS 4, Framer Motion

---

## 1. Pendahuluan
### 1.1 Visi Produk
Arcana Mystica adalah platform ramalan digital modern yang menggabungkan kebijaksanaan kuno Tarot dengan antarmuka pengguna yang imersif, elegan, dan menenangkan. Tujuannya adalah memberikan alat refleksi diri yang dapat diakses siapa saja, kapan saja, dengan fokus pada privasi pengguna.

### 1.2 Masalah yang Diselesaikan
*   **Aksesibilitas:** Membawa pengalaman Tarot fisik ke ruang digital tanpa kehilangan sisi magisnya.
*   **Edukasi:** Membantu pemula mempelajari makna simbolis kartu Tarot melalui ensiklopedia terintegrasi.
*   **Privasi:** Menghilangkan kekhawatiran data pribadi dengan menyimpan semua catatan bacaan secara lokal di perangkat pengguna.

---

## 2. Target Pengguna
1.  **Praktisi Tarot Pemula:** Orang yang tertarik belajar Tarot dan mencari panduan makna kartu yang mudah dipahami.
2.  **Pencari Refleksi Diri:** Individu yang menggunakan Tarot sebagai alat meditasi atau perencanaan harian.
3.  **Penyuka Estetika Esoteris:** Pengguna yang menghargai desain visual imersif dan pengalaman interaktif bertema kosmik.

---

## 3. Fitur Utama (Core Features)

### 3.1 Daily Reading (Bacaan Harian)
*   **Deskripsi:** Fitur utama untuk mendapatkan panduan harian.
*   **Fungsi:**
    *   Sistem tebaran 6 kartu khusus (Atas, 4 Utama, Bawah).
    *   Animasi mengocok kartu (shuffle) yang interaktif.
    *   Interpretasi otomatis untuk posisi kartu (Fokus, Pagi, Tantangan, Peluang, Aksi, Pesan Tersembunyi).
    *   Ringkasan kesimpulan (vibe, summary, final advice).

### 3.2 Tarot Spreads (Berbagai Tebaran)
*   **Deskripsi:** Pilihan tebaran kartu berdasarkan kebutuhan spesifik pengguna.
*   **Daftar Tebaran:**
    *   **Single Card:** Jawaban cepat.
    *   **Three Cards:** Masa Lalu, Sekarang, Masa Depan.
    *   **Love Spread:** Dinamika hubungan asmara.
    *   **Career Spread:** Panduan profesional.
    *   **Mystic Five:** Panduan mendalam tentang fondasi dan tujuan.

### 3.3 Personal Journal (Jurnal Bacaan)
*   **Deskripsi:** Riwayat bacaan yang disimpan untuk ditinjau kembali.
*   **Fungsi:**
    *   Menyimpan hasil tebaran, kartu yang muncul, dan tanggal bacaan.
    *   Fitur untuk menghapus riwayat atau membersihkan data.

### 3.4 Card Encyclopedia (Ensiklopedia Kartu)
*   **Deskripsi:** Perpustakaan digital untuk 78 kartu Tarot (Major & Minor Arcana).
*   **Fungsi:**
    *   Daftar kartu berdasarkan kategori (Suit: Wands, Cups, Swords, Pentacles).
    *   Detail kartu: Keywords, Element, Interpretasi Upright (Tegak) dan Reversed (Terbalik) untuk aspek General, Love, dan Career.

### 3.5 Learning Hub (Pusat Belajar)
*   **Deskripsi:** Bagian edukasi untuk mempelajari dasar-dasar Tarot.

---

## 4. Pengalaman Pengguna (User Experience)

### 4.1 Desain Visual & Atmosfer
*   **Tema:** "Modern Magic" & "Celestial Journey".
*   **Elemen Visual:**
    *   Latar belakang gradien gelap (Cosmic Blue/Purple).
    *   Animasi partikel bintang dan benda langit (orbit planet, rasi bintang zodiak).
    *   Kartu dengan efek hover dan transisi halus menggunakan Framer Motion.

### 4.2 Interaktivitas
*   **Micro-interactions:** Efek kartu bergetar saat dikocok, kartu membesar saat dipilih, dan transisi antar halaman yang mulus.
*   **Multibahasa:** Mendukung Bahasa Indonesia dan Bahasa Inggris secara penuh (UI & Interpretasi).

---

## 5. Persyaratan Teknis & Keamanan

### 5.1 Tech Stack
*   **Frontend:** Next.js (App Router), TypeScript.
*   **Styling:** Tailwind CSS 4.0.
*   **Animation:** Framer Motion.
*   **Icons:** Lucide React.

### 5.2 Manajemen Data
*   **Storage:** Menggunakan `localStorage` browser.
*   **Privacy by Design:** Tidak ada server backend; data pengguna (jurnal) tidak pernah meninggalkan perangkat mereka.

---

## 6. Roadmap Pengembangan Masa Depan
1.  **AI Interpretation:** Integrasi AI untuk memberikan interpretasi yang lebih personal berdasarkan pertanyaan spesifik pengguna.
2.  **Custom Deck Themes:** Pilihan visual kartu yang berbeda (Classic, Minimalist, Modern).
3.  **Moon Phase Integration:** Menampilkan fase bulan saat ini yang mempengaruhi "energi" bacaan.
4.  **Export Journal:** Fitur untuk mengekspor jurnal ke format PDF atau Markdown.
