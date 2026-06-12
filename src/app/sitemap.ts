import { MetadataRoute } from 'next';
import { getAllCards } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tarot-bpjs.vercel.app'; // Ganti dengan domain asli nanti
  const cards = getAllCards();
  const cardUrls = Object.keys(cards).map((slug) => ({
    url: `${baseUrl}/kartu/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/daily-reading`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spread`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kartu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...cardUrls,
  ];
}
