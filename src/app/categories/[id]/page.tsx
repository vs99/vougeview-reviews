"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import ProductCard from "../../../components/ProductCard";

// Mock categories data
const categories = [
  {
    id: "beauty",
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 120,
    description:
      "Discover top-rated beauty products from skincare to makeup. Our experts test and review the latest in beauty to help you look and feel your best.",
  },
  {
    id: "cars",
    name: "Cars",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 75,
    description:
      "Expert reviews on the latest vehicles, from economy cars to luxury SUVs. We test drive and analyze performance, comfort, technology, and value.",
  },
  {
    id: "electronics",
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 200,
    description:
      "Stay up-to-date with reviews of the latest smartphones, laptops, TVs, and other tech gadgets. Our experts evaluate performance, features, and usability.",
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 150,
    description:
      "Transform your living spaces with our reviews of furniture, appliances, gardening tools, and home decor. Find quality products for every part of your home.",
  },
  {
    id: "fashion",
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 180,
    description:
      "Stay stylish with reviews of the latest clothing, shoes, and accessories. Our fashion experts evaluate quality, fit, comfort, and value.",
  },
];

// Mock products data
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
  {
    id: 5,
    title: "Hydrating Face Moisturizer",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1614859529896-355979970303?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviewCount: 189,
    description:
      "Oil-free, lightweight moisturizer that delivers 24-hour hydration. Suitable for all skin types.",
    price: "$38.00",
  },
  {
    id: 6,
    title: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 246,
    description:
      "Premium wireless over-ear headphones with industry-leading noise cancellation and up to 30 hours of battery life.",
    price: "$349.00",
  },
  {
    id: 7,
    title: "Vintage Persian Rug",
    category: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1595516029561-1fc5e672bb8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 73,
    description:
      "Hand-knotted vintage Persian rug with timeless design. Made from natural wool and vegetable dyes.",
    price: "$1,250.00",
  },
  {
    id: 8,
    title: "Electric City Bike",
    category: "Cars",
    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviewCount: 112,
    description:
      "Modern electric bike with a range of up to 80 miles per charge. Features integrated lights and a lightweight aluminum frame.",
    price: "$1,999.00",
  },
  {
    id: 9,
    title: "Designer Leather Handbag",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1590739293931-7b01759574c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewCount: 87,
    description:
      "Luxurious genuine leather handbag with timeless design. Features multiple compartments and an adjustable shoulder strap.",
    price: "$450.00",
  },
  {
    id: 10,
    title: "Premium Wool Coat",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 154,
    description:
      "Classic wool coat with a tailored fit. Made from premium Italian wool and fully lined for comfort and warmth.",
    price: "$325.00",
  },
];

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("featured"); // featured, rating, newest, priceAsc, priceDesc
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch category details and products
    const fetchData = async () => {
      // In a real app, you'd fetch data from a server
      const categoryId = id as string;
      const foundCategory = categories.find((c) => c.id === categoryId);

      let filteredProducts = products.filter(
        (p) => p.category.toLowerCase() === foundCategory?.name.toLowerCase()
      );

      // Sort products
      switch (sortBy) {
        case "rating":
          filteredProducts = filteredProducts.sort(
            (a, b) => b.rating - a.rating
          );
          break;
        case "newest":
          // In a real app, you'd sort by date
          filteredProducts = filteredProducts.sort((a, b) => b.id - a.id);
          break;
        case "priceAsc":
          filteredProducts = filteredProducts.sort(
            (a, b) =>
              parseFloat(a.price.replace(/[^0-9.]/g, "")) -
              parseFloat(b.price.replace(/[^0-9.]/g, ""))
          );
          break;
        case "priceDesc":
          filteredProducts = filteredProducts.sort(
            (a, b) =>
              parseFloat(b.price.replace(/[^0-9.]/g, "")) -
              parseFloat(a.price.replace(/[^0-9.]/g, ""))
          );
          break;
        default:
          // featured - no need to sort
          break;
      }

      setCategory(foundCategory || null);
      setCategoryProducts(filteredProducts || []);
      setLoading(false);
    };

    fetchData();
  }, [id, sortBy]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Category not found
          </h2>
          <p className="mt-4 text-gray-500">
            The category you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="relative h-80 bg-gray-900">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {category.name}
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sorting and filtering */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-gray-500">
              {categoryProducts.length}{" "}
              {categoryProducts.length === 1 ? "product" : "products"}
            </span>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="sort-by"
              className="text-sm font-medium text-gray-700 mr-2"
            >
              Sort by
            </label>
            <select
              id="sort-by"
              name="sort-by"
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="newest">Newest</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
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
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900">
              No products found
            </h2>
            <p className="mt-4 text-gray-500">
              No products are currently available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
