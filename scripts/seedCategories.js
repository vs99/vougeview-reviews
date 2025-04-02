// scripts/seedCategories.js

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

// Define the category schema directly in this script
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  productCount: { type: Number, required: true },
  description: { type: String, required: true },
});

// Create the model (if already defined, use the existing one)
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// Define seed data (without the _id property)
const categories = [
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 120,
    description:
      "Discover top-rated beauty products from skincare to makeup. Our experts test and review the latest in beauty to help you look and feel your best.",
  },
  {
    name: "Cars",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 75,
    description:
      "Expert reviews on the latest vehicles, from economy cars to luxury SUVs. We test drive and analyze performance, comfort, technology, and value.",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 200,
    description:
      "Stay up-to-date with reviews of the latest smartphones, laptops, TVs, and other tech gadgets. Our experts evaluate performance, features, and usability.",
  },
  {
    name: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 150,
    description:
      "Transform your living spaces with our reviews of furniture, appliances, gardening tools, and home decor. Find quality products for every part of your home.",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 180,
    description:
      "Stay stylish with reviews of the latest clothing, shoes, and accessories. Our fashion experts evaluate quality, fit, comfort, and value.",
  },
];

async function seedCategories() {
  try {
    // Optionally, clear existing categories
    await Category.deleteMany({});
    console.log("Cleared existing categories.");

    // Insert the new categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Inserted ${insertedCategories.length} categories.`);
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log("Database connection closed.");
    process.exit(0);
  }
}

seedCategories();
