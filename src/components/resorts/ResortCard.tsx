
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Resort } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Star, Eye, DollarSign, Tag, ImageOff } from 'lucide-react';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { useEffect, useState } from 'react';
import { generateResortImageAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';

type ResortCardProps = {
  resort: Resort;
};

const DEFAULT_AI_HINT = "resort building";

export default function ResortCard({ resort }: ResortCardProps) {
  const { addToWishlist, removeFromWishlist, isWishlisted, isWishlistLoaded } = useWishlist();
  const wishlisted = isWishlisted(resort.id);

  const initialImage = resort.images && resort.images.length > 0 ? resort.images[0] : `https://placehold.co/400x250.png?text=No+Image`;
  const [currentImageUrl, setCurrentImageUrl] = useState(initialImage);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generationFailed, setGenerationFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    if (initialImage.startsWith('https://placehold.co') || initialImage.includes('?text=')) { // Check if it's a placeholder
      setIsGeneratingImage(true);
      setGenerationFailed(false);

      const suitableForText = resort.suitableFor?.length > 0 ? `good for ${resort.suitableFor.slice(0,2).join(', ')}` : 'general travel';
      // Use resort.defaultImageAiHint if available, otherwise fallback to DEFAULT_AI_HINT
      const imageHint = resort.defaultImageAiHint || DEFAULT_AI_HINT;
      const prompt = `A vibrant, high-quality photograph of ${resort.name}, a ${resort.priceRange} resort in ${resort.location}, ${suitableForText}. Focus: ${imageHint}.`;

      generateResortImageAction({ prompt })
        .then(response => {
          if (isMounted && response.imageDataUri) {
            setCurrentImageUrl(response.imageDataUri);
          } else if (isMounted) {
            setGenerationFailed(true);
          }
        })
        .catch(error => {
          console.error(`Failed to generate image for ${resort.name}:`, error);
          if (isMounted) {
            setGenerationFailed(true);
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsGeneratingImage(false);
          }
        });
    } else {
      setCurrentImageUrl(initialImage);
      setIsGeneratingImage(false);
    }

    return () => {
      isMounted = false;
    };
  // Add resort.defaultImageAiHint to dependency array to re-trigger if it changes for some reason (e.g. AI rec updated)
  }, [resort.id, resort.name, resort.priceRange, resort.location, resort.suitableFor, initialImage, resort.defaultImageAiHint]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wishlisted) {
      removeFromWishlist(resort.id);
    } else {
      addToWishlist(resort);
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        {isGeneratingImage ? (
          <Skeleton className="w-full h-48" />
        ) : generationFailed ? (
          <div className="w-full h-48 bg-muted flex flex-col items-center justify-center text-muted-foreground">
            <ImageOff size={48} />
            <p className="mt-2 text-sm">Image unavailable</p>
          </div>
        ) : (
          <Image
            src={currentImageUrl}
            alt={resort.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            // Use the resort specific hint or default for the data-ai-hint attribute for semantic HTML / accessibility
            data-ai-hint={resort.defaultImageAiHint || DEFAULT_AI_HINT} 
            onError={() => {
              if (!generationFailed && isMounted) { // ensure component is still mounted
                 setGenerationFailed(true);
                 setCurrentImageUrl(`https://placehold.co/400x250.png?text=Load+Error`);
              }
            }}
          />
        )}
        {isWishlistLoaded && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/70 hover:bg-background/90 text-destructive rounded-full"
            onClick={handleWishlistToggle}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl mb-1 text-primary">{resort.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin size={14} className="mr-1" /> {resort.location}
          {typeof resort.rating === 'number' && <><Star size={14} className="ml-3 mr-1 text-yellow-500" fill="currentColor" /> {resort.rating.toFixed(1)}/5</>}
        </div>
        <CardDescription className="text-sm mb-3 line-clamp-3">{resort.description}</CardDescription>
        <div className="flex items-center gap-2 text-sm mb-3">
            <DollarSign size={16} className="text-green-600" />
            <Badge variant={resort.priceRange === 'Luxury' ? 'destructive' : resort.priceRange === 'Mid-range' ? 'secondary' : 'outline'}>
              {resort.priceRange}
            </Badge>
        </div>
        {resort.suitableFor?.length > 0 && (
           <div className="flex items-start gap-2 text-sm">
             <Tag size={16} className="text-primary mt-0.5" />
             <div className="flex flex-wrap gap-1">
                {resort.suitableFor.slice(0, 3).map(s => <Badge key={s} variant="outline">{s}</Badge>)}
             </div>
           </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/resorts/${resort.id}`}>
            <Eye size={16} className="mr-2" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
