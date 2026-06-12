import { Metadata } from "next";
import { getCardBySlug } from "@/lib/utils";
import CardContent from "./CardContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    return {
      title: "Card Not Found | Arcana Mystica",
    };
  }

  const name = card.name_en || card.name;
  const keywords = (card.keywords_en || card.keywords).join(", ");

  return {
    title: `${name} - Tarot Card Meaning | Arcana Mystica`,
    description: `Learn the full meaning of ${name} tarot card. Keywords: ${keywords}. Discover upright and reversed interpretations for love, career, and general life guidance.`,
    openGraph: {
      title: `${name} Tarot Card Meaning | Arcana Mystica`,
      description: `Detailed interpretation of the ${name} tarot card.`,
      images: [`/cards/${slug}.jpg`], // Assuming you have card images
    },
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-primary mb-4">Card Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <CardContent card={card} slug={slug} />
    </main>
  );
}
