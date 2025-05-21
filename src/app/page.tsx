"use client";

import { useState } from 'react';
import RecommendationForm from '@/components/resorts/RecommendationForm';
import RecommendationResults from '@/components/resorts/RecommendationResults';
import ResortList from '@/components/resorts/ResortList';
import { placeholderResorts } from '@/lib/data';
import type { AIRecommendation } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[] | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  return (
    <div className="space-y-12">
      <section id="ai-recommender" className="py-8">
        <RecommendationForm 
          onRecommendations={setRecommendations} 
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

      {recommendations && recommendations.length > 0 && (
        <section id="ai-results">
          <RecommendationResults recommendations={recommendations} />
        </section>
      )}
      
      {recommendations && recommendations.length === 0 && !isLoadingRecommendations && (
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
