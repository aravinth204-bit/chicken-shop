import { v4 as uuidv4 } from 'uuid';

export const categories = [
  { id: 'chicken', name: 'Chicken', emoji: '🐔', color: 'bg-fire-red' },
  { id: 'goat', name: 'Goat/Mutton', emoji: '🐐', color: 'bg-red-700' },
  { id: 'duck', name: 'Duck', emoji: '🦆', color: 'bg-red-600' },
  { id: 'eggs', name: 'Eggs', emoji: '🥚', color: 'bg-red-800' }
];

export const defaultProducts = [
  // CHICKEN CATEGORY
  {
    id: uuidv4(),
    name: "Naatu Koli (Desi)",
    category: "chicken",
    description: "Farm fresh native chicken, traditional taste",
    price: 450,
    unit: "kg",
    weightOptions: [0.5, 1, 1.5, 2, 2.5, 3],
    defaultWeight: 1,
    image: "/products/country-chicken.png",
    emoji: "🐔",
    inStock: true,
    stock: 50,
    spiceLevel: 1,
    popular: true
  },
  {
    id: uuidv4(),
    name: "Broiler Chicken",
    category: "chicken",
    description: "Juicy tender broiler chicken, perfect for fry/curry",
    price: 180,
    unit: "kg",
    weightOptions: [0.5, 1, 1.5, 2, 2.5, 3],
    defaultWeight: 1,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
    emoji: "🐔",
    inStock: true,
    stock: 100,
    spiceLevel: 0
  },
  {
    id: uuidv4(),
    name: "Kili Raja (Rooster)",
    category: "chicken",
    description: "Healthy rooster, good for soup and gravies",
    price: 350,
    unit: "kg",
    weightOptions: [0.5, 1, 1.5, 2, 2.5],
    defaultWeight: 1,
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&h=300&fit=crop",
    emoji: "🐓",
    inStock: true,
    stock: 20,
    spiceLevel: 1
  },
  {
    id: uuidv4(),
    name: "Cross Koli",
    category: "chicken",
    description: "Hybrid breed, good growth and taste",
    price: 220,
    unit: "kg",
    weightOptions: [0.5, 1, 1.5, 2, 2.5, 3],
    defaultWeight: 1,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
    emoji: "🐔",
    inStock: true,
    stock: 40,
    spiceLevel: 0
  },
  {
    id: uuidv4(),
    name: "Layer Chicken",
    category: "chicken",
    description: "Old hen, rich flavor for traditional recipes",
    price: 280,
    unit: "kg",
    weightOptions: [0.5, 1, 1.5, 2],
    defaultWeight: 1,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    emoji: "🐔",
    inStock: false,
    stock: 0,
    spiceLevel: 1
  },

  // GOAT/MUTTON CATEGORY
  {
    id: uuidv4(),
    name: "Goat Meat (Cheembhore)",
    category: "goat",
    description: "Fresh country goat meat, no smell",
    price: 750,
    unit: "kg",
    weightOptions: [0.25, 0.5, 1, 1.5, 2],
    defaultWeight: 0.5,
    image: "/products/goat-meat.png",
    emoji: "🐐",
    inStock: true,
    stock: 30,
    spiceLevel: 2,
    popular: true
  },
  {
    id: uuidv4(),
    name: "Mutton Curry Cut",
    category: "goat",
    description: "Pre-cut pieces for easy cooking",
    price: 800,
    unit: "kg",
    weightOptions: [0.25, 0.5, 1, 1.5],
    defaultWeight: 0.5,
    image: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=400&h=300&fit=crop",
    emoji: "🥩",
    inStock: true,
    stock: 25,
    spiceLevel: 2
  },

  // DUCK CATEGORY
  {
    id: uuidv4(),
    name: "Duck (Live)",
    category: "duck",
    description: "Farm raised duck, tender meat",
    price: 400,
    unit: "kg",
    weightOptions: [1, 1.5, 2, 2.5],
    defaultWeight: 1.5,
    image: "https://images.unsplash.com/photo-1569127959161-2b1297b2d9a6?w=400&h=300&fit=crop",
    emoji: "🦆",
    inStock: true,
    stock: 15,
    spiceLevel: 1
  },
  {
    id: uuidv4(),
    name: "Duck Meat",
    category: "duck",
    description: "Cleaned duck meat, ready to cook",
    price: 500,
    unit: "kg",
    weightOptions: [0.5, 1, 1.5, 2],
    defaultWeight: 0.5,
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=300&fit=crop",
    emoji: "🦆",
    inStock: true,
    stock: 20,
    spiceLevel: 1
  },

  // EGGS CATEGORY
  {
    id: uuidv4(),
    name: "Farm Fresh Eggs",
    category: "eggs",
    description: "Desi chicken eggs, protein rich",
    price: 60,
    unit: "dozen",
    unitOptions: [1, 2, 3, 6, 12],
    defaultUnit: 1,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop",
    emoji: "🥚",
    inStock: true,
    stock: 200,
    spiceLevel: 0
  },
  {
    id: uuidv4(),
    name: "Duck Eggs",
    category: "eggs",
    description: "Large duck eggs, creamy yolk",
    price: 90,
    unit: "dozen",
    unitOptions: [1, 2, 3, 6, 12],
    defaultUnit: 1,
    image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=400&h=300&fit=crop",
    emoji: "🥚",
    inStock: true,
    stock: 50,
    spiceLevel: 0
  },
  {
    id: uuidv4(),
    name: "Quail Eggs",
    category: "eggs",
    description: "Small nutritious quail eggs",
    price: 25,
    unit: "piece",
    unitOptions: [6, 12, 18, 24, 30],
    defaultUnit: 12,
    image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400&h=300&fit=crop",
    emoji: "🥚",
    inStock: true,
    stock: 100,
    spiceLevel: 0
  }
];

export const spiceLabels = {
  0: { label: "No Spice", color: "text-green-400" },
  1: { label: "Less Spice", color: "text-green-300" },
  2: { label: "Medium Spice", color: "text-yellow-400" },
  3: { label: "Spicy", color: "text-orange-400" },
  4: { label: "Very Spicy", color: "text-red-400" },
  5: { label: "Extra Spicy 🔥", color: "text-red-500" }
};
