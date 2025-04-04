"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

type Product = {
  id: string; // ObjectId as string
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  price: string;
};

const ProductsPage = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          // Map _id to id
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
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#F9F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#333333]">All Products</h1>
          <Link
            href="/"
            className="text-[#8B6E4E] hover:text-[#654E3E] font-medium"
          >
            Return Home
          </Link>
        </div>
        {loading ? (
          <div className="text-[#5A5A5A]">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id} // Pass as string
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
    </div>
  );
};

export default ProductsPage;
