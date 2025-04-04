"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const CategoryCard = ({ id, name, image }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/categories/${id}`}>
      <div
        className="relative w-64 h-40 rounded-lg overflow-hidden shadow-md group bg-[#F9F5F0]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <Image
          src={image || "/fallback.jpg"} // Fallback image
          alt={name}
          fill
          className={`object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#654E3E]/60 via-[#654E3E]/30 to-transparent" />

        {/* Category Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-[#F3ECE1]">
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
