import Image from "next/image";
import Link from "next/link";
import RatingStars from "@/components/RatingStars";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  brand?: string;
  size?: string;
  bestFor?: string[];
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  rating,
  reviewCount,
  imageUrl,
  category,
  brand,
  size,
  bestFor,
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${id}`}>
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-pink-600 font-medium">
              {category}
            </span>
            {brand && <span className="text-sm text-gray-500">by {brand}</span>}
          </div>
          <span className="text-sm text-gray-500">{reviewCount} reviews</span>
        </div>

        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-pink-600">
            {name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        {bestFor && bestFor.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Best for:</p>
            <div className="flex flex-wrap gap-1">
              {bestFor.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RatingStars rating={rating} />
            <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>

          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            {size && <p className="text-xs text-gray-500">{size}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
