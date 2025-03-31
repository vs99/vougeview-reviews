// app/products/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "../../components/RatingStars";
import ReviewCard from "@/app/components/ReviewCard";
import ReviewForm from "@/app/components/ReviewForm";

// Define TypeScript types
type Product = {
  id: number;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  details: { label: string; value: string }[];
  variants?: any[];
  longDescription: string;
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

// Mock data for products
const products: Product[] = [
  {
    id: 1,
    title: "Advanced Night Repair Serum",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 352,
    description:
      "Advanced Night Repair Synchronized Multi-Recovery Complex. Reduces multiple signs of aging.",
    features: [
      "Patented synchronization technology",
      "Reduces fine lines and wrinkles",
      "Improves radiance",
      "Strengthens skin barrier",
      "Oil-free formula",
    ],
    details: [
      { label: "Size", value: "30ml" },
      { label: "Item Form", value: "Serum" },
      { label: "Skin Type", value: "All Skin Types" },
      { label: "Brand", value: "Estée Lauder" },
    ],
    variants: [
      { id: 101, size: "30ml", price: "$75.00" },
      { id: 102, size: "50ml", price: "$105.00" },
      { id: 103, size: "100ml", price: "$185.00" },
    ],
    longDescription:
      "Advanced Night Repair Synchronized Multi-Recovery Complex is a revolutionary anti-aging serum that works at night when your skin naturally renews. It dramatically reduces the look of lines and wrinkles and improves skin radiance.",
  },
  // Additional products can be added here.
];

// Mock data for reviews
const initialReviews: Review[] = [
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
      "I've been using this serum for a month and the results are incredible. My skin looks more radiant.",
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
    title: "Great product, but could be improved",
    content:
      "The serum works well, but I wish it came in a larger size. Still, my skin feels smoother and more radiant.",
    date: "2023-10-22T15:30:00Z",
    helpfulCount: 28,
    productId: 1,
    productName: "Advanced Night Repair Serum",
    verified: true,
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  // Create a ref for the review form container
  const reviewFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const productId = parseInt(id as string);
      const foundProduct = products.find((p) => p.id === productId) || null;
      const foundReviews = initialReviews.filter(
        (r) => r.productId === productId
      );
      setProduct(foundProduct);
      setProductReviews(foundReviews);
      if (foundProduct?.variants && foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0]);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // Scroll to the review form when "Write a Review" is clicked.
  const scrollToReviewForm = () => {
    setShowReviewForm(true);
    // Wait for the form to be rendered before scrolling.
    setTimeout(() => {
      reviewFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Handler for new review submission
  const handleReviewSubmit = (
    newReview: Omit<Review, "id" | "date" | "helpfulCount" | "verified">
  ) => {
    const reviewToAdd: Review = {
      ...newReview,
      id: Date.now(), // generate a unique id
      date: new Date().toISOString(),
      helpfulCount: 0,
      verified: false,
    };
    setProductReviews((prev) => [reviewToAdd, ...prev]);
    setShowReviewForm(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Product not found</h2>
        <p className="mt-4 text-gray-500">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-300 mx-2">/</span>
              <Link
                href={`/categories/${product.category.toLowerCase()}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {product.category}
              </Link>
            </li>
            <li>
              <span className="text-gray-300 mx-2">/</span>
              <span className="text-gray-900">{product.title}</span>
            </li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div className="mt-2 flex items-center">
              <RatingStars rating={product.rating} />
              <span className="ml-2 text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            {/* Variants (if any) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Options</h3>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border rounded-md py-2 px-3 text-sm font-medium ${
                        selectedVariant?.id === variant.id
                          ? "border-indigo-500 text-indigo-600"
                          : "border-gray-300 text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {variant.size || variant.finish || variant.model}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Write a Review Button */}
            <div className="mt-8">
              <button
                onClick={scrollToReviewForm}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Description
          </h2>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-600 mx-auto">
            <p>{product.longDescription}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center">
              <RatingStars rating={product.rating} size="lg" />
              <p className="ml-3 text-lg font-medium text-gray-900">
                {product.rating} out of 5 stars
              </p>
            </div>
          </div>

          {/* Review Form with scroll-to behavior */}
          {showReviewForm && (
            <div ref={reviewFormRef} className="mt-8">
              <ReviewForm
                productId={product.id}
                productName={product.title}
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {/* Existing Reviews */}
          <div className="mt-8">
            {productReviews.length > 0 ? (
              <div className="space-y-6">
                {productReviews.map((review) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No reviews yet for this product.
                </p>
                <button
                  onClick={scrollToReviewForm}
                  className="mt-4 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Be the first to review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
