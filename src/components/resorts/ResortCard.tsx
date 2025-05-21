"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Resort } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Star, Eye, DollarSign, Tag } from 'lucide-react';
import { useWishlist } from '@/lib/hooks/useWishlist';

type ResortCardProps = {
  resort: Resort;
};

export default function ResortCard({ resort }: ResortCardProps) {
  const { addToWishlist, removeFromWishlist, isWishlisted, isWishlistLoaded } = useWishlist();
  const wishlisted = isWishlisted(resort.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if button is inside a link
    if (wishlisted) {
      removeFromWishlist(resort.id);
    } else {
      addToWishlist(resort);
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={resort.images[0]}
          alt={resort.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
          data-ai-hint="resort building"
        />
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
          <Star size={14} className="ml-3 mr-1 text-yellow-500" fill="currentColor" /> {resort.rating}/5
        </div>
        <CardDescription className="text-sm mb-3 line-clamp-3">{resort.description}</CardDescription>
        <div className="flex items-center gap-2 text-sm mb-3">
            <DollarSign size={16} className="text-green-600" />
            <Badge variant={resort.priceRange === 'Luxury' ? 'destructive' : resort.priceRange === 'Mid-range' ? 'secondary' : 'outline'}>
              {resort.priceRange}
            </Badge>
        </div>
        {resort.suitableFor.length > 0 && (
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
