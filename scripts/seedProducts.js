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

  // ========================
  // --- Fashion Products ---
  // ========================
  {
    title: "Elegant Evening Gown",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542060744-1b2f09a08d72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1580281657521-7a3e0fae22a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1581091215367-0f9ea7d48d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products.");

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
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
