import type { Resort } from './types';

export const placeholderResorts: Resort[] = [
  {
    id: '1',
    name: 'Azure Haven Resort',
    description: 'A tranquil paradise perfect for romantic getaways, featuring private beaches and world-class spa services. Enjoy breathtaking ocean views from your luxurious villa.',
    images: ['https://placehold.co/800x600.png?a=1', 'https://placehold.co/800x600.png?a=2', 'https://placehold.co/800x600.png?a=3'],
    amenities: ['Private Beach', 'Spa', 'Fine Dining', 'Infinity Pool', 'WiFi', 'Fitness Center'],
    priceRange: 'Luxury',
    suitableFor: ['Honeymoon', 'Couples', 'Relaxation', 'Luxury Travel'],
    location: 'Maldives',
    rating: 4.8,
    virtualTourUrl: '#', // Placeholder URL
  },
  {
    id: '2',
    name: 'Pine Peak Lodge',
    description: 'Nestled in the mountains, this cozy lodge offers stunning views and outdoor activities like hiking and skiing. Perfect for family adventures and nature lovers.',
    images: ['https://placehold.co/800x600.png?b=1', 'https://placehold.co/800x600.png?b=2', 'https://placehold.co/800x600.png?b=3'],
    amenities: ['Mountain Views', 'Hiking Trails', 'Ski Access', 'Fireplace Lounge', 'Restaurant', 'Pet-friendly'],
    priceRange: 'Mid-range',
    suitableFor: ['Family Vacation', 'Adventure', 'Nature Lovers', 'Ski Trip'],
    location: 'Aspen, Colorado',
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Urban Oasis Suites',
    description: 'Experience the city in style at Urban Oasis Suites. Located downtown, with easy access to attractions, shopping, and nightlife. Rooftop pool and bar.',
    images: ['https://placehold.co/800x600.png?c=1', 'https://placehold.co/800x600.png?c=2', 'https://placehold.co/800x600.png?c=3'],
    amenities: ['Rooftop Pool', 'City Views', 'Bar', 'Gym', 'Concierge', 'Business Center'],
    priceRange: 'Mid-range',
    suitableFor: ['Business Travel', 'City Break', 'Nightlife', 'Shopping'],
    location: 'New York City',
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Sandy Toes Beachfront Bungalows',
    description: 'Affordable and charming beachfront bungalows. Wake up to the sound of waves and enjoy simple, relaxed island life. Great for budget-conscious travelers.',
    images: ['https://placehold.co/800x600.png?d=1', 'https://placehold.co/800x600.png?d=2', 'https://placehold.co/800x600.png?d=3'],
    amenities: ['Beach Access', 'Hammocks', 'Snorkeling Gear', 'Cafe', 'Free WiFi in common areas'],
    priceRange: 'Budget',
    suitableFor: ['Solo Travelers', 'Backpackers', 'Budget Travel', 'Beach Lovers'],
    location: 'Thailand',
    rating: 3.9,
  },
];

export const occasions: string[] = ["Honeymoon", "Family Vacation", "Business Trip", "Adventure Travel", "Relaxation Getaway", "Weekend Break", "Cultural Exploration", "Luxury Escape", "Budget Holiday"];
export const preferencesList: string[] = ["Beachfront", "Spa", "All-inclusive", "Kid-friendly activities", "Adults-only", "Pet-friendly", "Hiking trails", "Ski-in/ski-out", "City center", "Quiet and secluded", "Pool", "Gym", "Fine dining", "Good WiFi"];
export const budgetOptions: string[] = ["Budget-friendly", "Mid-range", "Luxury"];

export function getResortById(id: string): Resort | undefined {
  return placeholderResorts.find(resort => resort.id === id);
}
