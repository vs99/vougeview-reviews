"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CategoryCard from "../components/CategoryCard";

type Category = {
  id: string;
  name: string;
  image: string;
  productCount: number;
  description: string;
};

const CategoriesPage = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
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
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center">Loading categories...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          All Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              productCount={category.productCount}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
