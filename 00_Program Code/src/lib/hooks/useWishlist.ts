
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Resort } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const WISHLIST_STORAGE_KEY = 'occasionStaysWishlist';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<Resort[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage", error);
      // Fallback to empty list if localStorage is corrupt or inaccessible
      setWishlistItems([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
      } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
        setTimeout(() => {
          toast({
            title: "Storage Error",
            description: "Could not save your wishlist. Your browser's local storage might be full or disabled.",
            variant: "destructive",
          });
        }, 0);
      }
    }
  }, [wishlistItems, isLoaded, toast]);

  const addToWishlist = useCallback((resort: Resort) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find(item => item.id === resort.id)) {
        setTimeout(() => {
          toast({
            title: "Already in Wishlist",
            description: `${resort.name} is already in your wishlist.`,
          });
        }, 0);
        return prevItems;
      }
      setTimeout(() => {
        toast({
          title: "Added to Wishlist!",
          description: `${resort.name} has been added to your wishlist.`,
        });
      }, 0);
      return [...prevItems, resort];
    });
  }, [toast]);

  const removeFromWishlist = useCallback((resortId: string) => {
    setWishlistItems((prevItems) => {
      const resortToRemove = prevItems.find(item => item.id === resortId);
      if (resortToRemove) {
        setTimeout(() => {
          toast({
            title: "Removed from Wishlist",
            description: `${resortToRemove.name} has been removed from your wishlist.`,
          });
        }, 0);
      }
      return prevItems.filter(item => item.id !== resortId);
    });
  }, [toast]);

  const isWishlisted = useCallback((resortId: string) => {
    return wishlistItems.some(item => item.id === resortId);
  }, [wishlistItems]);

  return { wishlistItems, addToWishlist, removeFromWishlist, isWishlisted, isWishlistLoaded: isLoaded };
}
