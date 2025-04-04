"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import ReviewCard from "./components/ReviewCard";

// Define TypeScript types
type Category = {
  id: string;
  name: string;
  image: string;
  productCount: number;
  description: string;
};

type Product = {
  id: string; // We'll convert _id to string
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  price: string;
};

type Review = {
  id: number;
  user: {
    name: string;
    image: string;
    reviews: number;
  };
  rating: number;
  title: string;
  content: string;
  date: string;
  helpfulCount: number;
  productId: number;
  productName: string;
  verified: boolean;
};

export default function Home() {
  // Products fetched from DB.
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Categories fetched from DB.
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Reviews (you can leave this as is or update similarly)
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Fetch products from DB via API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          // Map _id to id if needed
          const mappedProducts: Product[] = data.products.map((p: any) => ({
            id: p._id.toString(),
            title: p.title,
            category: p.category,
            image: p.image,
            rating: p.rating,
            reviewCount: p.reviewCount,
            description: p.description,
            price: p.price,
          }));
          setProductsData(mappedProducts);
        } else {
          console.error("Failed to fetch products", await res.json());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories from DB via API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          // Assuming your API returns { categories: [...] }
          const mappedCategories: Category[] = data.categories.map(
            (c: any) => ({
              id: c._id.toString(),
              name: c.name,
              image: c.image,
              productCount: c.productCount,
              description: c.description,
            })
          );
          setCategoriesData(mappedCategories);
        } else {
          console.error("Failed to fetch categories", await res.json());
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch reviews from DB via API on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          // Sort reviews by date descending (newest first) and take top 10
          const sortedReviews = data.reviews.sort(
            (a: Review, b: Review) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const top10Reviews = sortedReviews.slice(0, 10);
          setReviews(top10Reviews);
        } else {
          console.error("Failed to fetch reviews", await res.json());
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-[#F9F5F0]">
      {/* Hero Section */}
      <section className="relative bg-[#8B6E4E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Trusted Reviews & In-Depth Ratings
            </h1>
            <p className="mt-6 text-xl text-[#F3ECE1] max-w-3xl">
              Read honest reviews, explore top-rated products, and find the best
              recommendations to guide your purchasing decisions.
            </p>
            <div className="mt-10 flex space-x-4">
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-[#8B6E4E] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6E4E]"
              >
                Browse Categories
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#654E3E] hover:bg-[#5A4336] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#654E3E]"
              >
                Latest Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#333333]">Top Categories</h2>
          <Link
            href="/categories"
            className="text-[#8B6E4E] hover:text-[#654E3E] font-medium"
          >
            View All Categories
          </Link>
        </div>
        {loadingCategories ? (
          <div>Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData.slice(0, 4).map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image}
                productCount={category.productCount}
              />
            ))}
          </div>
        )}
      </section>

      {/* Trending Products Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#333333]">
              Trending Products
            </h2>
            <Link
              href="/products"
              className="text-[#8B6E4E] hover:text-[#654E3E] font-medium"
            >
              View All Products
            </Link>
          </div>
          {loadingProducts ? (
            <div>Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  category={product.category}
                  image={product.image}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  description={product.description}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Reviews Section */}
      {/* Latest Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Reviews</h2>
          <Link
            href="/reviews"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All Reviews
          </Link>
        </div>
        {loadingReviews ? (
          <div>Loading reviews...</div>
        ) : (
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews
                .slice(0, 3)
                .map((review) => (
                  <ReviewCard
                    key={String(review.id || (review as any)._id)}
                    id={String(review.id || (review as any)._id)}
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
                ))
            ) : (
              <p className="text-gray-500">No reviews available.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
