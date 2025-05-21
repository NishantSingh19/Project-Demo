"use client";

import ResortList from '@/components/resorts/ResortList';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeartCrack, ShoppingBag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function WishlistPage() {
  const { wishlistItems, isWishlistLoaded } = useWishlist();

  if (!isWishlistLoaded) {
    return (
      <div className="py-8">
        <h1 className="text-4xl font-bold text-center mb-10 text-primary">My Wishlist</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20">
        <HeartCrack size={64} className="mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-3xl font-semibold mb-4">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any resorts to your wishlist yet.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/">
            <ShoppingBag size={20} className="mr-2" /> Explore Resorts
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ResortList resorts={wishlistItems} title="My Wishlist" />
    </div>
  );
}
