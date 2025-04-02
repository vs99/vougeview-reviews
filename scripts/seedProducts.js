// scripts/seedProducts.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined in .env.local");
  process.exit(1);
}

// Connect to MongoDB
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

// Create the model
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Define the seed data without the _id property
const products = [
  {
    title: "Advanced Night Repair Serum",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 352,
    description:
      "Advanced Night Repair Synchronized Multi-Recovery Complex. Reduces multiple signs of aging.",
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
    longDescription:
      "Advanced Night Repair Synchronized Multi-Recovery Complex is a revolutionary anti-aging serum that works at night when your skin naturally renews. It dramatically reduces the look of lines and wrinkles and improves skin radiance.",
  },
  {
    title: "Pro Display XDR Monitor",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 127,
    description:
      "A professional display with Retina 6K resolution, amazing color accuracy, and incredible HDR performance.",
    price: "$4,999.00",
    features: [
      "6K Retina display",
      "Incredible HDR performance",
      "Professional-grade color accuracy",
    ],
    details: [
      { label: "Screen Size", value: "32 inches" },
      { label: "Resolution", value: "6016 x 3384" },
      { label: "Connectivity", value: "Thunderbolt 3" },
    ],
    variants: [],
    longDescription:
      "Experience breathtaking visuals with a professional-grade display featuring Retina 6K resolution and incredible HDR performance. Perfect for creative professionals.",
  },
  {
    title: "Luxury Down Comforter",
    category: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 208,
    description:
      "Premium all-season down comforter with cotton shell, baffle box construction for maximum loft and warmth.",
    price: "$199.00",
    features: [
      "Premium down fill",
      "Cotton shell",
      "All-season comfort",
    ],
    details: [
      { label: "Size", value: "Queen" },
      { label: "Material", value: "Down and cotton" },
    ],
    variants: [],
    longDescription:
      "Stay warm in style with our premium all-season down comforter, designed for maximum loft and cozy comfort. Perfect for any bedroom.",
  },
  // You can add additional products here.
];

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
