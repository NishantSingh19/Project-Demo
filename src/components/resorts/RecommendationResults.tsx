
import type { Resort } from "@/lib/types";
import ResortList from "./ResortList"; // Import ResortList
import { ThumbsUp } from "lucide-react";

type RecommendationResultsProps = {
  resorts: Resort[]; // Changed from AIRecommendation[] to Resort[]
};

export default function RecommendationResults({ resorts }: RecommendationResultsProps) {
  if (!resorts || resorts.length === 0) {
    return null; 
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        <ThumbsUp className="inline-block mr-2 mb-1" size={30}/>
        Our Top Picks For You!
      </h2>
      {/* Use ResortList to display the AI-recommended resorts */}
      <ResortList resorts={resorts} title="" /> 
      {/* Pass empty title or no title prop if ResortList handles it, 
          or remove title from ResortList if this h2 is sufficient */}
    </div>
  );
}
