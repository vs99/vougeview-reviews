import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Hydrating Face Serum",
    description:
      "Vitamin C enriched serum with hyaluronic acid for radiant, glowing skin.",
    price: 49.99,
    rating: 4.8,
    reviewCount: 128,
    imageUrl: "/images/serum.jpg",
    category: "Skincare",
    brand: "Glow Beauty",
    size: "30ml",
    bestFor: ["Dry Skin", "Brightening", "Anti-Aging"],
  },
  {
    id: "2",
    name: "Matte Lipstick",
    description:
      "Long-lasting matte lipstick with intense color payoff and comfortable wear.",
    price: 24.99,
    rating: 4.6,
    reviewCount: 89,
    imageUrl: "/images/lipstick.jpg",
    category: "Makeup",
    brand: "Beauty Basics",
    size: "3.5g",
    bestFor: ["Long Wear", "Matte Finish", "Rich Pigment"],
  },
  {
    id: "3",
    name: "Natural Hair Shampoo",
    description: "Sulfate-free shampoo with argan oil for healthy, shiny hair.",
    price: 29.99,
    rating: 4.7,
    reviewCount: 256,
    imageUrl: "/images/shampoo.jpg",
    category: "Hair Care",
    brand: "Pure Naturals",
    size: "250ml",
    bestFor: ["Damaged Hair", "Color-Treated", "Natural Hair"],
  },
  {
    id: "4",
    name: "Anti-Aging Eye Cream",
    description:
      "Retinol-infused eye cream to reduce fine lines and dark circles.",
    price: 79.99,
    rating: 4.5,
    reviewCount: 167,
    imageUrl: "/images/eye-cream.jpg",
    category: "Skincare",
    brand: "Youth Lab",
    size: "15ml",
    bestFor: ["Fine Lines", "Dark Circles", "Mature Skin"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Discover Your Beauty
              </h1>
              <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
                Read authentic reviews from beauty enthusiasts and make informed
                decisions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Explore Products
                </Link>
                <Link
                  href="/add-review"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  Share Your Experience
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trending Beauty Products
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our most-loved beauty products based on real user
                reviews
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our curated collection of beauty products
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Skincare", "Makeup", "Hair Care", "Fragrances"].map(
                (category) => (
                  <Link
                    key={category}
                    href={`/products/${category
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    className="group relative h-48 rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {category}
                      </h3>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Share Your Beauty Journey
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of beauty enthusiasts and help others discover
              their perfect products
            </p>
            <Link
              href="/add-review"
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Write a Review
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
