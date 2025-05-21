
export interface Resort {
  id: string;
  name: string;
  description: string;
  images: string[]; // URLs
  amenities: string[];
  priceRange: 'Budget' | 'Mid-range' | 'Luxury';
  suitableFor: string[]; // e.g., "Honeymoon", "Family Vacation", "Adventure"
  location: string;
  rating: number; // 1-5
  virtualTourUrl?: string;
}

export interface AIRecommendation {
  resortName: string;
  description: string;
}

// Add type for wishlist item if it differs from Resort, e.g. if only ID is stored
export type WishlistItem = Resort;
