
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
  defaultImageAiHint?: string; // Added for AI image generation hint
}

export interface AIRecommendation {
  resortName: string;
  description: string;
  location: string;
  priceCategory: "Luxury" | "Mid-range" | "Budget" | "Budget-friendly";
  estimatedRating: number; // e.g., 4.5
  keyAmenities: string[]; // e.g., ["Pool", "Spa"]
  suitableForSuggestions: string[]; // e.g., ["Honeymoon", "Family"]
  imagePromptHint: string; // e.g., "tropical beach sunset view"
}

// Add type for wishlist item if it differs from Resort, e.g. if only ID is stored
export type WishlistItem = Resort;
