import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import ReviewCard from "./components/ReviewCard";

// Mock data for categories
const categories = [
  {
    id: "beauty",
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 120,
  },
  {
    id: "cars",
    name: "Cars",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 75,
  },
  {
    id: "electronics",
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 200,
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 150,
  },
];

// Mock data for products
const products = [
  {
    id: 1,
    title: "Advanced Night Repair Serum",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 352,
    description:
      "Advanced Night Repair Synchronized Multi-Recovery Complex. Reduces multiple signs of aging caused by modern life.",
    price: "$75.00",
  },
  {
    id: 2,
    title: "Pro Display XDR Monitor",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 127,
    description:
      "A professional display with Retina 6K resolution, amazing color accuracy, and incredible HDR performance.",
    price: "$4,999.00",
  },
  {
    id: 3,
    title: "Luxury Down Comforter",
    category: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 208,
    description:
      "Premium all-season down comforter with cotton shell, baffle box construction for maximum loft and warmth.",
    price: "$199.00",
  },
  {
    id: 4,
    title: "Model X SUV",
    category: "Cars",
    image:
      "https://images.unsplash.com/photo-1633240188018-1100c307e445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewCount: 95,
    description:
      "All-electric SUV with long range, room for up to seven, and Falcon Wing doors for easy access to the second and third row seats.",
    price: "$79,990",
  },
];

// Mock data for reviews
const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      reviews: 28,
    },
    rating: 5,
    title: "Absolutely beautiful results!",
    content:
      "I've been using this serum for a month and the results are incredible. My skin looks more radiant, and fine lines are noticeably reduced. I apply it every night before bed and wake up to glowing skin. Would highly recommend to anyone looking to improve their skincare routine.",
    date: "2023-11-15T12:00:00Z",
    helpfulCount: 42,
    productId: 1,
    productName: "Advanced Night Repair Serum",
    verified: true,
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      reviews: 14,
    },
    rating: 4.5,
    title: "Great display, but expensive",
    content:
      "The Pro Display XDR is stunning to look at and works perfectly for my design work. Colors are incredibly accurate, and the 6K resolution makes everything look crisp. The only drawback is the price, especially when you add the stand. If you're a professional who needs color accuracy though, it's worth the investment.",
    date: "2023-10-22T15:30:00Z",
    helpfulCount: 28,
    productId: 2,
    productName: "Pro Display XDR Monitor",
    verified: true,
  },
];

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover the best products with trusted reviews
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
              VougeView provides honest, comprehensive reviews to help you make
              informed purchase decisions.
            </p>
            <div className="mt-10 flex space-x-4">
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Categories
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Latest Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Top Categories</h2>
          <Link
            href="/categories"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All Categories
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              productCount={category.productCount}
            />
          ))}
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Trending Products
            </h2>
            <Link
              href="/products"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View All Products
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Latest Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Reviews</h2>
          <Link
            href="/reviews"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All Reviews
          </Link>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              user={review.user}
              rating={review.rating}
              title={review.title}
              content={review.content}
              date={review.date}
              helpfulCount={review.helpfulCount}
              productId={review.productId}
              productName={review.productName}
              verified={review.verified}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to share your experience?</span>
            <span className="block text-indigo-200">
              Write a review and help others decide.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get Started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
