"use client";

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { getResortById } from '@/lib/data';
import type { Resort } from '@/lib/types';
import ResortImageGallery from '@/components/resorts/ResortImageGallery';
import { MapPin, Star, CheckCircle, DollarSign, Tag, CalendarCheck, Heart, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export default function ResortDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [resort, setResort] = useState<Resort | null | undefined>(undefined); // undefined for loading state

  const { addToWishlist, removeFromWishlist, isWishlisted, isWishlistLoaded } = useWishlist();

  useEffect(() => {
    if (id) {
      const foundResort = getResortById(id);
      setResort(foundResort);
    }
  }, [id]);

  if (resort === undefined) { // Loading state
    return (
      <div className="space-y-8">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!resort) {
    notFound();
  }

  const wishlisted = isWishlisted(resort.id);

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(resort.id);
    } else {
      addToWishlist(resort);
    }
  };

  return (
    <div className="space-y-8">
      <ResortImageGallery images={resort.images} resortName={resort.name} virtualTourUrl={resort.virtualTourUrl} />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">{resort.name}</h1>
            <div className="flex items-center text-lg text-muted-foreground mb-4">
              <MapPin size={20} className="mr-2" /> {resort.location}
              <Star size={20} className="ml-4 mr-1 text-yellow-500" fill="currentColor" /> {resort.rating}/5
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>About {resort.name}</AlertTitle>
            <AlertDescription className="text-base leading-relaxed">
              {resort.description}
            </AlertDescription>
          </Alert>
          
          <Separator />

          <div>
            <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-foreground">
              {resort.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center">
                  <CheckCircle size={18} className="mr-2 text-green-500" />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold mb-3">Good to Know</h2>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <DollarSign size={20} className="text-green-600" />
                    <span className="font-medium">Price Range:</span>
                    <Badge variant={resort.priceRange === 'Luxury' ? 'destructive' : resort.priceRange === 'Mid-range' ? 'secondary' : 'outline'}>
                        {resort.priceRange}
                    </Badge>
                </div>
                {resort.suitableFor.length > 0 && (
                <div className="flex items-start gap-2">
                    <Tag size={20} className="text-primary mt-1" />
                    <div>
                        <span className="font-medium">Perfect For:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                        {resort.suitableFor.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                        </div>
                    </div>
                </div>
                )}
            </div>
          </div>

        </div>

        <div className="md:col-span-1 space-y-4 sticky top-24 self-start">
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Ready for your stay?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`/booking/${resort.id}`}>
                <CalendarCheck size={20} className="mr-2" /> Book Now
                </Link>
            </Button>
            {isWishlistLoaded && (
                <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleWishlistToggle}
                >
                <Heart size={20} className="mr-2" fill={wishlisted ? "currentColor" : "none"} />
                {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
            )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
