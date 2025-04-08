const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined in .env.local");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Define product schema directly in this script
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  description: { type: String, required: true },
  price: { type: String, required: true },
  features: { type: [String], default: [] },
  details: {
    type: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    default: [],
  },
  variants: { type: Array, default: [] },
  longDescription: { type: String, required: true },
});

// Create the model (if already defined, use the existing one)
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  // ========================
  // --- Beauty Products ---
  // ========================
  {
    title: "Advanced Night Repair Serum",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 352,
    description: "Advanced Night Repair Synchronized Multi-Recovery Complex. Reduces multiple signs of aging.",
    price: "$75.00",
    features: [
      "Patented synchronization technology",
      "Reduces fine lines and wrinkles",
      "Improves radiance",
      "Strengthens skin barrier",
      "Oil-free formula",
    ],
    details: [
      { label: "Size", value: "30ml" },
      { label: "Item Form", value: "Serum" },
      { label: "Skin Type", value: "All Skin Types" },
      { label: "Brand", value: "Estée Lauder" },
    ],
    variants: [
      { id: 101, size: "30ml", price: "$75.00" },
      { id: 102, size: "50ml", price: "$105.00" },
      { id: 103, size: "100ml", price: "$185.00" },
    ],
    longDescription: "Advanced Night Repair Synchronized Multi-Recovery Complex is a revolutionary anti-aging serum that dramatically reduces lines and wrinkles while boosting skin radiance.",
  },
  {
    title: "Radiant Glow Moisturizer",
    category: "Beauty",
    image: "/images/products/beauty/moisturiser.jpg",
    rating: 4.5,
    reviewCount: 210,
    description: "A lightweight moisturizer that hydrates and enhances your natural glow.",
    price: "$45.00",
    features: [
      "Hydrating formula",
      "Lightweight texture",
      "Non-greasy finish",
    ],
    details: [
      { label: "Size", value: "50ml" },
      { label: "Skin Type", value: "Normal to Dry" },
    ],
    variants: [],
    longDescription: "Radiant Glow Moisturizer is designed for daily use to provide long-lasting hydration and a luminous finish for all skin types.",
  },
  {
    title: "Hydrating Facial Cleanser",
    category: "Beauty",
    image: "/images/products/beauty/p2.jpg",
    rating: 4.6,
    reviewCount: 180,
    description: "Gentle cleanser that removes impurities while retaining moisture.",
    price: "$30.00",
    features: [
      "Gentle formula",
      "Suitable for sensitive skin",
      "Non-drying",
    ],
    details: [
      { label: "Volume", value: "150ml" },
      { label: "Type", value: "Foaming Cleanser" },
    ],
    variants: [],
    longDescription: "This Hydrating Facial Cleanser ensures clean and refreshed skin without stripping away natural oils.",
  },
  {
    title: "Rejuvenating Eye Cream",
    category: "Beauty",
    image: "/images/products/beauty/eyecream.jpg",
    rating: 4.7,
    reviewCount: 240,
    description: "Targeted eye cream that reduces puffiness and dark circles.",
    price: "$55.00",
    features: [
      "Reduces puffiness",
      "Minimizes dark circles",
      "Lightweight formula",
    ],
    details: [
      { label: "Size", value: "15ml" },
      { label: "Usage", value: "Daily" },
    ],
    variants: [],
    longDescription: "Rejuvenating Eye Cream brightens and smooths the delicate eye area for a refreshed look.",
  },
  {
    title: "Matte Lipstick Collection",
    category: "Beauty",
    image: "/images/products/beauty/lipstick.jpg",
    rating: 4.4,
    reviewCount: 300,
    description: "A collection of long-lasting matte lipsticks in various shades.",
    price: "$35.00",
    features: [
      "Long-lasting",
      "Vibrant colors",
      "Smooth application",
    ],
    details: [
      { label: "Set", value: "5 shades" },
    ],
    variants: [],
    longDescription: "Our Matte Lipstick Collection delivers bold, beautiful color that lasts all day.",
  },
  {
    title: "Volumizing Mascara",
    category: "Beauty",
    image: "/images/products/beauty/mascara.jpg",
    rating: 4.5,
    reviewCount: 275,
    description: "Mascara that adds volume and length for striking lashes.",
    price: "$28.00",
    features: [
      "Volume boosting",
      "Lengthening fibers",
      "Smudge-proof",
    ],
    details: [
      { label: "Size", value: "10ml" },
    ],
    variants: [],
    longDescription: "Volumizing Mascara provides fuller, longer lashes without clumping.",
  },
  
  // ====================
  // --- Cars Products ---
  // ====================
  {
    title: "2023 Luxury Sedan",
    category: "Cars",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewCount: 290,
    description: "Experience luxury and performance with our 2023 Luxury Sedan featuring advanced technology and superior comfort.",
    price: "$45,000.00",
    features: [
      "Sleek design",
      "Advanced safety features",
      "High fuel efficiency",
      "Premium interior materials",
    ],
    details: [
      { label: "Engine", value: "V6" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Gasoline" },
      { label: "Color", value: "Metallic Silver" },
    ],
    variants: [],
    longDescription: "Our 2023 Luxury Sedan offers an exquisite blend of performance, comfort, and state-of-the-art technology.",
  },
  {
    title: "Sporty Coupe 2023",
    category: "Cars",
    image: "/images/products/car/sporty copy.jpg",
    rating: 4.7,
    reviewCount: 310,
    description: "A dynamic and stylish coupe that combines speed with luxury.",
    price: "$55,000.00",
    features: [
      "Sporty design",
      "High performance",
      "Responsive handling",
    ],
    details: [
      { label: "Engine", value: "V8" },
      { label: "Transmission", value: "Manual" },
    ],
    variants: [],
    longDescription: "Sporty Coupe 2023 is engineered for those who crave performance and style on every drive.",
  },
  {
    title: "Eco-Friendly Hybrid",
    category: "Cars",
    image: "/images/products/car/ecofriend.jpg",
    rating: 4.5,
    reviewCount: 250,
    description: "A hybrid vehicle offering impressive efficiency without compromising performance.",
    price: "$35,000.00",
    features: [
      "Fuel efficient",
      "Low emissions",
      "Innovative technology",
    ],
    details: [
      { label: "Engine", value: "Hybrid" },
      { label: "Fuel Economy", value: "50 MPG" },
    ],
    variants: [],
    longDescription: "Eco-Friendly Hybrid combines modern innovation with exceptional fuel efficiency for the conscious driver.",
  },
  {
    title: "Compact City Car",
    category: "Cars",
    image: "/images/products/car/compact.jpg",
    rating: 4.4,
    reviewCount: 220,
    description: "A perfectly sized car for urban driving, offering ease of parking and excellent fuel efficiency.",
    price: "$20,000.00",
    features: [
      "Compact design",
      "Easy parking",
      "Efficient",
    ],
    details: [
      { label: "Engine", value: "I4" },
      { label: "Fuel Economy", value: "35 MPG" },
    ],
    variants: [],
    longDescription: "The Compact City Car is ideal for urban lifestyles, combining agility with practicality for daily commutes.",
  },
  {
    title: "Rugged Off-Road SUV",
    category: "Cars",
    image: "/images/products/car/suv.jpg",
    rating: 4.8,
    reviewCount: 330,
    description: "Built for adventure, this SUV excels on challenging terrains while providing superior comfort.",
    price: "$60,000.00",
    features: [
      "All-wheel drive",
      "Robust suspension",
      "Off-road capabilities",
    ],
    details: [
      { label: "Engine", value: "V6" },
      { label: "Transmission", value: "Automatic" },
    ],
    variants: [],
    longDescription: "Rugged Off-Road SUV is engineered to conquer the toughest landscapes while ensuring a smooth ride.",
  },
  {
    title: "Electric Future Model",
    category: "Cars",
    image: "/images/products/car/electric.jpg",
    rating: 4.9,
    reviewCount: 400,
    description: "A state-of-the-art electric car that epitomizes innovation and sustainable driving.",
    price: "$70,000.00",
    features: [
      "Electric powertrain",
      "Zero emissions",
      "Futuristic design",
    ],
    details: [
      { label: "Battery Range", value: "300 miles" },
      { label: "Charging Time", value: "1 hour (fast charge)" },
    ],
    variants: [],
    longDescription: "Electric Future Model redefines automotive technology with its efficient electric engine and modern design.",
  },
  {
    title: "Vintage Classic Car",
    category: "Cars",
    image: "/images/products/car/vintage.jpg",
    rating: 4.3,
    reviewCount: 180,
    description: "A timeless classic car that brings the charm of yesteryear to modern roads.",
    price: "$80,000.00",
    features: [
      "Classic design",
      "Restored interior",
      "Collector's item",
    ],
    details: [
      { label: "Year", value: "1965" },
      { label: "Mileage", value: "80,000 miles" },
    ],
    variants: [],
    longDescription: "Vintage Classic Car offers a unique blend of nostalgia and performance, ideal for collectors and enthusiasts alike.",
  },
  {
    title: "High-Performance Sports Car",
    category: "Cars",
    image: "/images/products/car/high.jpg",
    rating: 4.9,
    reviewCount: 350,
    description: "Experience the thrill of speed with our high-performance sports car, engineered for precision.",
    price: "$90,000.00",
    features: [
      "Rapid acceleration",
      "Precision handling",
      "Aerodynamic design",
    ],
    details: [
      { label: "Engine", value: "V8" },
      { label: "0-60 mph", value: "3.5 seconds" },
    ],
    variants: [],
    longDescription: "High-Performance Sports Car is designed for adrenaline junkies who crave both speed and luxury.",
  },

  // ==========================
  // --- Electronics Products ---
  // ==========================
  {
    title: "Pro Display XDR Monitor",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 127,
    description: "A professional display with Retina 6K resolution, incredible HDR performance, and outstanding color accuracy.",
    price: "$4,999.00",
    features: [
      "6K Retina display",
      "HDR support",
      "Professional-grade color accuracy",
    ],
    details: [
      { label: "Screen Size", value: "32 inches" },
      { label: "Resolution", value: "6016 x 3384" },
      { label: "Connectivity", value: "Thunderbolt 3" },
    ],
    variants: [],
    longDescription: "Experience stunning visuals and exceptional performance with the Pro Display XDR Monitor, ideal for creative professionals.",
  },
  {
    title: "Ultra HD Smart TV",
    category: "Electronics",
    image: "/images/products/electronic/smarttv.jpg",
    rating: 4.7,
    reviewCount: 200,
    description: "A 55-inch Ultra HD Smart TV with seamless streaming and immersive visuals.",
    price: "$1,299.00",
    features: [
      "4K Ultra HD",
      "Smart connectivity",
      "Built-in streaming apps",
    ],
    details: [
      { label: "Screen Size", value: "55 inches" },
      { label: "Resolution", value: "3840 x 2160" },
    ],
    variants: [],
    longDescription: "Ultra HD Smart TV provides an immersive viewing experience with brilliant color and clarity.",
  },
  {
    title: "Noise Cancelling Headphones",
    category: "Electronics",
    image: "/images/products/electronic/headphones.jpg",
    rating: 4.8,
    reviewCount: 320,
    description: "Premium noise cancelling headphones that block out distractions for an immersive audio experience.",
    price: "$299.00",
    features: [
      "Active noise cancellation",
      "Wireless connectivity",
      "Comfortable design",
    ],
    details: [
      { label: "Battery Life", value: "30 hours" },
    ],
    variants: [],
    longDescription: "Experience pure sound and minimal distractions with our Noise Cancelling Headphones, perfect for travel and work.",
  },
  {
    title: "Wireless Bluetooth Speaker",
    category: "Electronics",
    image: "/images/products/electronic/speaker.jpg",
    rating: 4.6,
    reviewCount: 250,
    description: "Portable Bluetooth speaker delivering powerful sound and extended battery life.",
    price: "$150.00",
    features: [
      "Portable design",
      "High-quality audio",
      "Long battery life",
    ],
    details: [
      { label: "Battery Life", value: "20 hours" },
    ],
    variants: [],
    longDescription: "The Wireless Bluetooth Speaker is your go-to device for on-the-go music and entertainment.",
  },

  // ===============================
  // --- Home & Garden Products ---
  // ===============================
  {
    title: "Luxury Down Comforter",
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 208,
    description: "Premium all-season down comforter with a cotton shell for maximum loft and warmth.",
    price: "$199.00",
    features: [
      "Premium down fill",
      "Cotton shell",
      "All-season comfort",
    ],
    details: [
      { label: "Size", value: "Queen" },
      { label: "Material", value: "Down & Cotton" },
    ],
    variants: [],
    longDescription: "Stay warm and stylish with our Luxury Down Comforter designed to provide optimal comfort all year round.",
  },
  {
    title: "Modern Sofa Set",
    category: "Home & Garden",
    image: "/images/products/decor/sofa.jpg",
    rating: 4.5,
    reviewCount: 175,
    description: "A comfortable and stylish sofa set that elevates your living room.",
    price: "$899.00",
    features: [
      "Ergonomic design",
      "High-quality fabric",
      "Sturdy construction",
    ],
    details: [
      { label: "Material", value: "Fabric" },
      { label: "Seating", value: "3+2" },
    ],
    variants: [],
    longDescription: "Modern Sofa Set combines style with comfort, making it the perfect centerpiece for your living area.",
  },
  {
    title: "Elegant Dining Table",
    category: "Home & Garden",
    image: "/images/products/decor/dining.jpg",
    rating: 4.6,
    reviewCount: 190,
    description: "A beautifully crafted dining table that brings elegance to your home.",
    price: "$650.00",
    features: [
      "Elegant design",
      "Durable material",
      "Spacious",
    ],
    details: [
      { label: "Dimensions", value: "200x100cm" },
    ],
    variants: [],
    longDescription: "Elegant Dining Table is ideal for family gatherings and special occasions, blending functionality with style.",
  },
  {
    title: "Indoor Plant Collection",
    category: "Home & Garden",
    image: "/images/products/decor/plant.jpg",
    rating: 4.8,
    reviewCount: 230,
    description: "A curated collection of indoor plants to bring freshness and life to your home.",
    price: "$80.00",
    features: [
      "Air purifying",
      "Low maintenance",
      "Aesthetic appeal",
    ],
    details: [
      { label: "Includes", value: "5 plants" },
    ],
    variants: [],
    longDescription: "Indoor Plant Collection enhances your living space with natural beauty and improved air quality.",
  },


  // ========================
  // --- Fashion Products ---
  // ========================
  {
    title: "Elegant Evening Gown",
    category: "Fashion",
    image: "/images/gown.jpg",
    rating: 4.5,
    reviewCount: 154,
    description: "An elegant evening gown that combines modern design with classic elegance.",
    price: "$250.00",
    features: [
      "Luxurious fabric",
      "Intricate detailing",
      "Flattering silhouette",
    ],
    details: [
      { label: "Size", value: "M" },
      { label: "Color", value: "Red" },
      { label: "Material", value: "Silk" },
      { label: "Brand", value: "Fashionista" },
    ],
    variants: [
      { id: 201, size: "S", price: "$230.00" },
      { id: 202, size: "M", price: "$250.00" },
      { id: 203, size: "L", price: "$270.00" },
    ],
    longDescription: "This elegant evening gown is perfect for formal events, offering a timeless style with luxurious silk and intricate details.",
  },
  
  // ======================
  // --- Sports Products ---
  // ======================
  {
    title: "Performance Running Shoes",
    category: "Sports",
    image: "/images/shoes.jpg",
    rating: 4.4,
    reviewCount: 322,
    description: "High-performance running shoes engineered for optimal support and comfort during workouts.",
    price: "$120.00",
    features: [
      "Lightweight design",
      "Enhanced cushioning",
      "Breathable mesh upper",
      "Durable outsole",
    ],
    details: [
      { label: "Size", value: "9-12" },
      { label: "Weight", value: "250g" },
    ],
    variants: [
      { id: 301, size: "9", price: "$115.00" },
      { id: 302, size: "10", price: "$120.00" },
      { id: 303, size: "11", price: "$125.00" },
    ],
    longDescription: "Performance Running Shoes are engineered for athletes seeking maximum support and durability during both training and races.",
  },
  
  // ====================
  // --- Books Products ---
  // ====================
  {
    title: "The Great Adventure",
    category: "Books",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 89,
    description: "An epic tale of adventure, courage, and discovery set in uncharted territories.",
    price: "$19.99",
    features: [
      "Captivating narrative",
      "Rich character development",
      "Stunning imagery",
      "Award-winning author",
    ],
    details: [
      { label: "Format", value: "Hardcover" },
      { label: "Pages", value: "350" },
      { label: "Language", value: "English" },
    ],
    variants: [],
    longDescription: "Dive into 'The Great Adventure'—a novel that combines action, drama, and mystery in an immersive reading experience.",
  },

  // ====================
  // --- Toys Products ---
  // ====================
  {
    title: "Interactive Robot Toy",
    category: "Toys",
    image: "/images/robot.jpg",
    rating: 4.3,
    reviewCount: 140,
    description: "A fun and interactive robot toy that encourages creativity and learning.",
    price: "$45.00",
    features: [
      "Voice recognition",
      "Interactive play modes",
      "Educational games",
      "Durable design",
    ],
    details: [
      { label: "Age Range", value: "5-10 years" },
      { label: "Battery Life", value: "5 hours" },
    ],
    variants: [],
    longDescription: "This interactive robot toy is designed to spark creativity and provide endless fun while encouraging learning.",
  },
  
  // ==========================
  // --- Grocery Products ---
  // ==========================
  {
    title: "Organic Extra Virgin Olive Oil",
    category: "Grocery",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 220,
    description: "Premium organic extra virgin olive oil, cold-pressed for maximum flavor and nutritional benefits.",
    price: "$18.00",
    features: [
      "Cold-pressed",
      "100% organic",
      "Rich in antioxidants",
      "Extra virgin quality",
    ],
    details: [
      { label: "Volume", value: "500ml" },
      { label: "Origin", value: "Italy" },
    ],
    variants: [],
    longDescription: "Our Organic Extra Virgin Olive Oil is ideal for cooking and dressings, offering rich flavor and health benefits.",
  },

  // ======================
  // --- Health Products ---
  // ======================
  {
    title: "Multivitamin Supplements",
    category: "Health",
    image: "/images/multivitamins.jpg",
    rating: 4.5,
    reviewCount: 310,
    description: "Daily multivitamin supplements designed to support overall health and wellness.",
    price: "$29.99",
    features: [
      "Comprehensive nutrient blend",
      "Supports immune health",
      "Easy-to-swallow tablets",
    ],
    details: [
      { label: "Count", value: "60 tablets" },
      { label: "Brand", value: "HealthPlus" },
    ],
    variants: [],
    longDescription: "Our Multivitamin Supplements provide essential vitamins and minerals to support your daily health and wellness.",
  },
  
];

// Seed function
// Seed function
async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products.");

    // Override the rating for each product to be 0
    const modifiedProducts = products.map(product => ({
      ...product,
      rating: 0,
      reviewCount: 0,
    }));

    // Insert new products with initial rating set to 0
    const insertedProducts = await Product.insertMany(modifiedProducts);
    console.log(`Inserted ${insertedProducts.length} products.`);
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    // Close MongoDB connection
    await mongoose.disconnect();
    console.log("Database connection closed.");
    process.exit(0);
  }
}


// Run the seed function
seedProducts();

