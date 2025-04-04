"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";

type Category = {
  _id: string;
  name: string;
  image: string;
  productCount: number;
  description: string;
};

type Product = {
  _id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  price: string;
};

const CategoriesPage = () => {
  const { id } = useParams(); // id is the category id from the URL
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("featured"); // featured, rating, newest, priceAsc, priceDesc
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories from the API
        const resCategories = await fetch("/api/categories");
        if (!resCategories.ok) {
          console.error(
            "Failed to fetch categories",
            await resCategories.json()
          );
          return;
        }
        const dataCategories = await resCategories.json();
        // Find the category that matches the id from the URL
        const foundCategory: Category | undefined =
          dataCategories.categories.find((c: any) => c._id.toString() === id);
        setCategory(foundCategory || null);

        // If the category is found, fetch products and filter by category name
        if (foundCategory) {
          const resProducts = await fetch("/api/products");
          if (!resProducts.ok) {
            console.error("Failed to fetch products", await resProducts.json());
            return;
          }
          const dataProducts = await resProducts.json();
          let filteredProducts: Product[] = dataProducts.products.filter(
            (p: any) =>
              p.category.toLowerCase() === foundCategory.name.toLowerCase()
          );

          // Sort products based on sortBy
          switch (sortBy) {
            case "rating":
              filteredProducts.sort((a, b) => b.rating - a.rating);
              break;
            case "newest":
              // Assuming _id can act as a rough proxy for recency
              filteredProducts.sort((a, b) => (b._id > a._id ? 1 : -1));
              break;
            case "priceAsc":
              filteredProducts.sort(
                (a, b) =>
                  parseFloat(a.price.replace(/[^0-9.]/g, "")) -
                  parseFloat(b.price.replace(/[^0-9.]/g, ""))
              );
              break;
            case "priceDesc":
              filteredProducts.sort(
                (a, b) =>
                  parseFloat(b.price.replace(/[^0-9.]/g, "")) -
                  parseFloat(a.price.replace(/[^0-9.]/g, ""))
              );
              break;
            default:
              // featured - no additional sorting
              break;
          }
          setCategoryProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, sortBy]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-[#F3ECE1] rounded w-1/4"></div>
          <div className="h-4 bg-[#F3ECE1] rounded w-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-64 bg-[#F3ECE1] rounded"></div>
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
          <h2 className="text-3xl font-bold text-[#333333]">
            Category not found
          </h2>
          <p className="mt-4 text-[#5A5A5A]">
            The category you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#8B6E4E] hover:bg-[#654E3E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6E4E]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F5F0]">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="relative h-80 bg-[#654E3E]">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#654E3E] to-transparent" />
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
            <span className="text-[#5A5A5A]">
              {categoryProducts.length}{" "}
              {categoryProducts.length === 1 ? "product" : "products"}
            </span>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="sort-by"
              className="text-sm font-medium text-[#333333] mr-2"
            >
              Sort by
            </label>
            <select
              id="sort-by"
              name="sort-by"
              className="rounded-md border-[#E0D4C7] py-2 pl-3 pr-10 text-base focus:border-[#8B6E4E] focus:outline-none focus:ring-[#8B6E4E] sm:text-sm text-[#333333]"
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
                key={product._id}
                id={product._id}
                title={product.title}
                category={product.category}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                description={product.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-[#333333]">
              No products found
            </h2>
            <p className="mt-4 text-[#5A5A5A]">
              No products are currently available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
