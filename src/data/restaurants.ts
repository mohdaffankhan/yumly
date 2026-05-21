export type Restaurant = {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  rating: number;
  eta: string;
  price: number;
  emoji: string;
  color: string;
};

export const restaurants: Restaurant[] = [
  {
    id: '123',
    name: 'Burger Republic',
    tagline: 'Smashed patties, melty cheese',
    cuisine: 'American · Burgers',
    rating: 4.7,
    eta: '20-30 min',
    price: 12,
    emoji: '🍔',
    color: '#FFE4D2',
  },
  {
    id: '124',
    name: 'Sakura Sushi',
    tagline: 'Hand-rolled, ocean-fresh',
    cuisine: 'Japanese · Sushi',
    rating: 4.8,
    eta: '25-35 min',
    price: 22,
    emoji: '🍣',
    color: '#FFE0E6',
  },
  {
    id: '125',
    name: 'Pasta Bella',
    tagline: 'Slow-cooked Italian classics',
    cuisine: 'Italian · Pasta',
    rating: 4.6,
    eta: '30-40 min',
    price: 16,
    emoji: '🍝',
    color: '#FFF4D2',
  },
  {
    id: '126',
    name: 'Taco Loco',
    tagline: 'Street tacos, big flavor',
    cuisine: 'Mexican · Tacos',
    rating: 4.5,
    eta: '15-25 min',
    price: 10,
    emoji: '🌮',
    color: '#FFEAD2',
  },
  {
    id: '127',
    name: 'Green Bowl',
    tagline: 'Fresh, healthy, fast',
    cuisine: 'Salads · Bowls',
    rating: 4.4,
    eta: '15-20 min',
    price: 14,
    emoji: '🥗',
    color: '#E1F4DA',
  },
  {
    id: '128',
    name: 'Pizza Forno',
    tagline: 'Wood-fired Neapolitan',
    cuisine: 'Italian · Pizza',
    rating: 4.7,
    eta: '25-35 min',
    price: 18,
    emoji: '🍕',
    color: '#FFE2D9',
  },
];

export const findRestaurant = (id: string) =>
  restaurants.find((r) => r.id === id);
