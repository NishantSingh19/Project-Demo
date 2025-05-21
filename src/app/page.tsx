
"use client";

import { useState, useEffect } from 'react';
import RecommendationForm from '@/components/resorts/RecommendationForm';
import RecommendationResults from '@/components/resorts/RecommendationResults';
import ResortList from '@/components/resorts/ResortList';
import { placeholderResorts } from '@/lib/data';
import type { AIRecommendation, Resort } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

// Helper function to slugify resort names for IDs
const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

// Helper function to map AI price category to Resort priceRange
const mapPriceCategoryToPriceRange = (priceCategory: AIRecommendation['priceCategory']): Resort['priceRange'] => {
  switch (priceCategory) {
    case "Luxury":
      return "Luxury";
    case "Mid-range":
      return "Mid-range";
    case "Budget":
    case "Budget-friendly":
      return "Budget";
    default:
      return "Mid-range"; // Fallback
  }
};

export default function HomePage() {
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[] | null>(null);
  const [transformedAiResorts, setTransformedAiResorts] = useState<Resort[] | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  useEffect(() => {
    if (aiRecommendations) {
      const transformed = aiRecommendations.map((rec, index): Resort => ({
        id: `ai-rec-${index}-${slugify(rec.resortName)}`,
        name: rec.resortName,
        description: rec.description,
        images: [`https://placehold.co/800x600.png?text=${encodeURIComponent(rec.resortName)}`], // Placeholder, ResortCard will use hint
        amenities: rec.keyAmenities,
        priceRange: mapPriceCategoryToPriceRange(rec.priceCategory),
        suitableFor: rec.suitableForSuggestions,
        location: rec.location,
        rating: rec.estimatedRating,
        virtualTourUrl: '#', // AI doesn't provide this
        defaultImageAiHint: rec.imagePromptHint,
      }));
      setTransformedAiResorts(transformed);
    } else {
      setTransformedAiResorts(null);
    }
  }, [aiRecommendations]);

  return (
    <div className="space-y-12">
      <section id="ai-recommender" className="py-8">
        <RecommendationForm 
          onRecommendations={setAiRecommendations} // Sets AIRecommendation[]
          setLoading={setIsLoadingRecommendations} 
        />
      </section>

      {isLoadingRecommendations && (
        <div className="flex flex-col items-center justify-center text-center my-10 p-6 bg-card rounded-lg shadow-md">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-semibold text-foreground">Finding your perfect stay...</p>
          <p className="text-muted-foreground">Our AI is working its magic!</p>
        </div>
      )}

      {transformedAiResorts && transformedAiResorts.length > 0 && (
        <section id="ai-results">
          {/* RecommendationResults now expects Resort[] */}
          <RecommendationResults resorts={transformedAiResorts} />
        </section>
      )}
      
      {aiRecommendations && aiRecommendations.length === 0 && !isLoadingRecommendations && (
         <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No specific AI recommendations found. Try adjusting your criteria.</p>
         </div>
      )}

      <Separator className="my-12" />

      <section id="all-resorts">
        <ResortList resorts={placeholderResorts} />
      </section>
    </div>
  );
}
