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

// Define seed data for 10 categories (each with 10 products)
const categories = [
  {
    name: "Beauty",
    image: "/images/categories/beauty.jpg",
    productCount: 10,
    description: "Discover top-rated beauty products to enhance your natural glow."
  },
  {
    name: "Cars",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 10,
    description: "Explore our extensive collection of vehicles and automotive reviews."
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 10,
    description: "Stay updated with the latest gadgets and electronics innovations."
  },
  {
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 10,
    description: "Transform your living spaces with our home and garden essentials."
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 10,
    description: "Discover the latest trends in clothing, shoes, and accessories."
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 10,
    description: "Gear up with top-rated sports equipment and apparel."
  },
  {
    name: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 10,
    description: "Immerse yourself in a world of literature with our curated book selection."
  },
  {
    name: "Toys",
    image: "/images/categories/toys.jpg",
    productCount: 10,
    description: "Fun and educational toys for children of all ages."
  },
  {
    name: "Grocery",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 10,
    description: "Quality groceries and everyday essentials at your fingertips."
  },
  {
    name: "Health",
    image: "/images/categories/health.jpg",
    productCount: 10,
    description: "Health and wellness products to keep you feeling your best."
  }
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
