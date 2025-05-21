import type { AIRecommendation } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";

type RecommendationResultsProps = {
  recommendations: AIRecommendation[];
};

export default function RecommendationResults({ recommendations }: RecommendationResultsProps) {
  if (recommendations.length === 0) {
    return null; 
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        <ThumbsUp className="inline-block mr-2 mb-1" size={30}/>
        Our Top Picks For You!
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-primary">{rec.resortName}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{rec.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
