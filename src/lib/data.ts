
import type { Resort } from './types';

export const placeholderResorts: Resort[] = [
  {
    id: '1',
    name: 'Azure Haven Resort',
    description: 'A tranquil paradise perfect for romantic getaways, featuring private beaches and world-class spa services. Enjoy breathtaking ocean views from your luxurious villa.',
    images: ['https://placehold.co/800x600.png?txt=Azure+Haven+Resort+Image+1&resort=azure&img=1', 'https://placehold.co/800x600.png?txt=Azure+Haven+Resort+Image+2&resort=azure&img=2', 'https://placehold.co/800x600.png?txt=Azure+Haven+Resort+Image+3&resort=azure&img=3'],
    amenities: ['Private Beach', 'Spa', 'Fine Dining', 'Infinity Pool', 'WiFi', 'Fitness Center'],
    priceRange: 'Luxury',
    suitableFor: ['Honeymoon', 'Couples', 'Relaxation', 'Luxury Travel'],
    location: 'Maldives',
    rating: 4.8,
    virtualTourUrl: '#',
    defaultImageAiHint: 'tropical beach sunset'
  },
  {
    id: '2',
    name: 'Pine Peak Lodge',
    description: 'Nestled in the mountains, this cozy lodge offers stunning views and outdoor activities like hiking and skiing. Perfect for family adventures and nature lovers.',
    images: ['https://placehold.co/800x600.png?txt=Pine+Peak+Lodge+Image+1&resort=pinepeak&img=1', 'https://placehold.co/800x600.png?txt=Pine+Peak+Lodge+Image+2&resort=pinepeak&img=2', 'https://placehold.co/800x600.png?txt=Pine+Peak+Lodge+Image+3&resort=pinepeak&img=3'],
    amenities: ['Mountain Views', 'Hiking Trails', 'Ski Access', 'Fireplace Lounge', 'Restaurant', 'Pet-friendly'],
    priceRange: 'Mid-range',
    suitableFor: ['Family Vacation', 'Adventure', 'Nature Lovers', 'Ski Trip'],
    location: 'Aspen, Colorado',
    rating: 4.5,
    defaultImageAiHint: 'snowy mountain cabin'
  },
  {
    id: '3',
    name: 'Urban Oasis Suites',
    description: 'Experience the city in style at Urban Oasis Suites. Located downtown, with easy access to attractions, shopping, and nightlife. Rooftop pool and bar.',
    images: ['https://placehold.co/800x600.png?txt=Urban+Oasis+Suites+Image+1&resort=urbanoasis&img=1', 'https://placehold.co/800x600.png?txt=Urban+Oasis+Suites+Image+2&resort=urbanoasis&img=2', 'https://placehold.co/800x600.png?txt=Urban+Oasis+Suites+Image+3&resort=urbanoasis&img=3'],
    amenities: ['Rooftop Pool', 'City Views', 'Bar', 'Gym', 'Concierge', 'Business Center'],
    priceRange: 'Mid-range',
    suitableFor: ['Business Travel', 'City Break', 'Nightlife', 'Shopping'],
    location: 'New York City',
    rating: 4.2,
    defaultImageAiHint: 'modern city building'
  },
  {
    id: '4',
    name: 'Coral Cove Inn',
    description: 'A charming beachfront inn offering a relaxed atmosphere, vibrant coral reefs for snorkeling, and fresh local seafood. Ideal for a laid-back tropical escape.',
    images: ['https://placehold.co/800x600.png?txt=Coral+Cove+Inn+1&resort=coralcove&img=1', 'https://placehold.co/800x600.png?txt=Coral+Cove+Inn+2&resort=coralcove&img=2'],
    amenities: ['Beach Access', 'Snorkeling', 'Restaurant', 'Hammocks', 'WiFi'],
    priceRange: 'Budget',
    suitableFor: ['Beach Lovers', 'Snorkeling', 'Budget Travel', 'Relaxation'],
    location: 'Belize',
    rating: 4.3,
    virtualTourUrl: '#',
    defaultImageAiHint: 'coral reef underwater'
  },
  {
    id: '5',
    name: 'Emerald Forest Retreat',
    description: 'Secluded cabins deep in the rainforest, offering tranquility, wildlife spotting, and guided nature walks. An immersive eco-friendly experience.',
    images: ['https://placehold.co/800x600.png?txt=Emerald+Forest+1&resort=emerald&img=1', 'https://placehold.co/800x600.png?txt=Emerald+Forest+2&resort=emerald&img=2'],
    amenities: ['Rainforest Setting', 'Wildlife Tours', 'Eco-Friendly', 'Private Cabins', 'Yoga Deck'],
    priceRange: 'Mid-range',
    suitableFor: ['Nature Lovers', 'Eco-Tourism', 'Wellness', 'Adventure', 'Digital Detox'],
    location: 'Costa Rica',
    rating: 4.7,
    defaultImageAiHint: 'lush rainforest canopy'
  },
  {
    id: '6',
    name: 'Desert Mirage Resort & Spa',
    description: 'An opulent oasis in the heart of the desert. Features expansive pools, a luxurious spa, gourmet dining, and stargazing tours.',
    images: ['https://placehold.co/800x600.png?txt=Desert+Mirage+1&resort=desertmirage&img=1', 'https://placehold.co/800x600.png?txt=Desert+Mirage+2&resort=desertmirage&img=2'],
    amenities: ['Desert Landscape', 'Luxury Spa', 'Multiple Pools', 'Gourmet Restaurants', 'Stargazing', 'Golf Course Access'],
    priceRange: 'Luxury',
    suitableFor: ['Luxury Travel', 'Spa Getaway', 'Relaxation', 'Golfers'],
    location: 'Dubai, UAE',
    rating: 4.9,
    virtualTourUrl: '#',
    defaultImageAiHint: 'desert oasis night'
  },
  {
    id: '7',
    name: 'The Cozy Corner B&B',
    description: 'A delightful bed and breakfast in a historic town, known for its homemade breakfasts, charming rooms, and friendly hosts. Explore antique shops and local history.',
    images: ['https://placehold.co/800x600.png?txt=Cozy+Corner+1&resort=cozycorner&img=1'],
    amenities: ['Historic Building', 'Homemade Breakfast', 'Garden', 'Free WiFi', 'Personalized Service'],
    priceRange: 'Budget',
    suitableFor: ['Couples', 'Historic Exploration', 'Weekend Getaway', 'Quiet Retreat'],
    location: 'Savannah, Georgia',
    rating: 4.6,
    defaultImageAiHint: 'historic town street'
  },
  {
    id: '8',
    name: 'Arctic Aurora Lodge',
    description: 'Experience the magic of the Northern Lights from this unique lodge. Offers glass-roofed igloos, husky sledding, and snowmobiling adventures.',
    images: ['https://placehold.co/800x600.png?txt=Arctic+Aurora+1&resort=arctic&img=1', 'https://placehold.co/800x600.png?txt=Arctic+Aurora+2&resort=arctic&img=2'],
    amenities: ['Aurora Viewing', 'Glass Igloos', 'Husky Sledding', 'Snowmobiling', 'Sauna', 'Restaurant'],
    priceRange: 'Luxury',
    suitableFor: ['Adventure Travel', 'Northern Lights', 'Unique Experience', 'Winter Holiday'],
    location: 'Lapland, Finland',
    rating: 4.8,
    virtualTourUrl: '#',
    defaultImageAiHint: 'northern lights sky'
  }
];

export const occasions: string[] = ["Honeymoon", "Family Vacation", "Business Trip", "Adventure Travel", "Relaxation Getaway", "Weekend Break", "Cultural Exploration", "Luxury Escape", "Budget Holiday"];
export const preferencesList: string[] = ["Beachfront", "Spa", "All-inclusive", "Kid-friendly activities", "Adults-only", "Pet-friendly", "Hiking trails", "Ski-in/ski-out", "City center", "Quiet and secluded", "Pool", "Gym", "Fine dining", "Good WiFi"];
export const budgetOptions: string[] = ["Budget-friendly", "Mid-range", "Luxury"];

export function getResortById(id: string): Resort | undefined {
  return placeholderResorts.find(resort => resort.id === id);
}
