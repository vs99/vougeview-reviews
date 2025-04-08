"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Review } from "../../models/Review";

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
}

const ProductCard = ({
  id,
  title,
  category,
  image,
  rating,
  reviewCount,
  description,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const totalReviews = productReviews.length;
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={`star-${i}`}
            className="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={`star-half-${i}`}
            className="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="half-fill" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-fill)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={`star-empty-${i}`}
            className="h-5 w-5 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <Link href={`/products/${id}`}>
      <div
        className={`bg-white rounded-2xl overflow-hidden shadow-md transform transition duration-300 ${
          isHovered ? "scale-105 shadow-xl" : "hover:shadow-lg"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-56 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-transform duration-300 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
              {category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 truncate">{title}</h3>
          <div className="flex items-center mt-2">
            <div className="flex items-center">{renderStars(rating)}</div>
            <p className="ml-3 text-sm text-gray-600">{reviewCount} reviews</p>
          </div>
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#8B6E4E] hover:bg-[#654E3E] transition">
              Read Review
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
