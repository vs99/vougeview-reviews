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

const CategoryCard = ({ id, name, image, productCount }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/categories/${id}`}>
      <div
        className="relative rounded-lg overflow-hidden shadow-md group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm mt-1">{productCount} products</p>
        </div>
        <div
          className={`absolute inset-0 bg-indigo-600 bg-opacity-0 transition-opacity duration-300 ${
            isHovered ? "bg-opacity-20" : ""
          }`}
        />
      </div>
    </Link>
  );
};

export default CategoryCard;
