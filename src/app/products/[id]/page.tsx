"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "../../components/RatingStars";
import ReviewCard from "@/app/components/ReviewCard";
import ReviewForm, { Review, User } from "@/app/components/ReviewForm";

// Updated Product type: id is a string
type Product = {
  id: string;
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

const ProductDetailPage = () => {
  const { id } = useParams(); // product id from URL (as string)
  const [product, setProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const reviewFormRef = useRef<HTMLDivElement>(null);

  // Retrieve authenticated user info from localStorage.
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const fullName = `${parsedUser.firstName || ""} ${
        parsedUser.lastName || ""
      }`.trim();
      setUser({
        name: fullName || "Anonymous",
        image: parsedUser.image || "",
        reviews: parsedUser.reviews ?? 0,
      });
      console.log("Retrieved user for reviews:", { fullName, ...parsedUser });
    }
  }, []);

  // Fetch product details from the DB
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
        } else {
          const errorText = await res.text();
          console.error("Failed to fetch product", errorText);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Function to fetch reviews for the current product from the DB
  const fetchReviews = async () => {
    try {
      if (!id) return;
      const res = await fetch(`/api/reviews?productId=${id}`);
      if (res.ok) {
        const data = await res.json();
        console.log("Fetched reviews data:", data);
        setProductReviews(data.reviews || []);
      } else {
        const errorText = await res.text();
        console.error("Failed to fetch reviews", errorText);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Fetch reviews on mount (and when id changes)
  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  // Compute aggregate rating from reviews.
  const totalReviews = productReviews.length;
  const averageRating =
    totalReviews > 0
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
        totalReviews
      : 0;

  // Compute star breakdown counts.
  const starCounts = [0, 0, 0, 0, 0]; // index 0 => 1 star, index 4 => 5 star
  productReviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      starCounts[review.rating - 1]++;
    }
  });
  // Reverse so that index 0 corresponds to 5-star reviews.
  const reversedStarCounts = [...starCounts].reverse();

  // Compute Review Highlights:
  const highlights = productReviews
    .filter((review) => review.rating >= 3)
    .sort((a, b) => {
      if (b.rating === a.rating) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.rating - a.rating;
    })
    .slice(0, 3);

  // Scroll to review form.
  const scrollToReviewForm = () => {
    setShowReviewForm(true);
    setTimeout(() => {
      if (reviewFormRef.current) {
        const yOffset = -80;
        const y =
          reviewFormRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  // Handle review submission.
  const handleReviewSubmit = async (
    newReview: Omit<Review, "_id" | "id" | "date" | "helpfulCount" | "verified">
  ) => {
    try {
      // Use the id from useParams (which is a string) as productId.
      const reviewData = {
        ...newReview,
        productId: id,
      };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("New review added:", data.review);
        // Re-fetch reviews so the new one appears immediately.
        await fetchReviews();
        setShowReviewForm(false);
      } else {
        const errorData = await res.json();
        console.error("Failed to submit review", errorData);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-[#F3ECE1] rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-[#F3ECE1] rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-[#F3ECE1] rounded w-3/4"></div>
              <div className="h-4 bg-[#F3ECE1] rounded w-1/4"></div>
              <div className="h-4 bg-[#F3ECE1] rounded"></div>
              <div className="h-4 bg-[#F3ECE1] rounded"></div>
              <div className="h-4 bg-[#F3ECE1] rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl font-bold text-[#333333]">Product not found</h2>
        <p className="mt-4 text-[#5A5A5A]">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#8B6E4E] hover:bg-[#654E3E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6E4E]"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-[#5A5A5A] hover:text-[#8B6E4E]">
                Home
              </Link>
            </li>
            <li>
              <span className="text-[#E0D4C7] mx-2">/</span>
              <Link
                href={`/categories/${product.category.toLowerCase()}`}
                className="text-[#5A5A5A] hover:text-[#8B6E4E]"
              >
                {product.category}
              </Link>
            </li>
            <li>
              <span className="text-[#E0D4C7] mx-2">/</span>
              <span className="text-[#333333]">{product.title}</span>
            </li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.image || "https://via.placeholder.com/800x600"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">
              {product.title}
            </h1>
            <div className="mt-2 flex items-center">
              <RatingStars rating={averageRating} />
              <div className="ml-2 text-[#5A5A5A]">
                {averageRating.toFixed(1)} ({totalReviews} reviews)
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#333333]">
                Description
              </h3>
              <p className="mt-2 text-[#5A5A5A]">{product.description}</p>
            </div>

            {/* Variants (if any) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-[#333333]">Options</h3>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  {product.variants.map((variant: any, index: number) => (
                    <button
                      key={`${variant.id}-${index}`}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border rounded-md py-2 px-3 text-sm font-medium ${
                        selectedVariant?.id === variant.id
                          ? "border-[#8B6E4E] text-[#8B6E4E]"
                          : "border-[#E0D4C7] text-[#333333] hover:bg-[#F3ECE1]"
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
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#8B6E4E] hover:bg-[#654E3E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6E4E]"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#333333]">
            Product Description
          </h2>
          <div className="mt-6 prose prose-lg text-[#5A5A5A] mx-auto">
            <p>{product.longDescription}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t border-[#E0D4C7]">
          <h2 className="text-2xl font-bold text-[#333333]">
            Customer Reviews
          </h2>

          {/* Top Section: Average Rating */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center">
              <RatingStars rating={averageRating} size="lg" />
              <p className="ml-3 text-lg font-medium text-[#333333]">
                {averageRating.toFixed(1)} out of 5 stars
              </p>
            </div>
            <button
              onClick={scrollToReviewForm}
              className="px-4 py-2 bg-[#8B6E4E] text-white rounded-md hover:bg-[#654E3E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6E4E]"
            >
              Write a Review
            </button>
          </div>

          {/* Second Section: Rating Breakdown and Review Highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rating Breakdown */}
            <div>
              <h3 className="text-lg font-medium text-[#333333]">
                Rating Breakdown
              </h3>
              <div className="mt-3 space-y-2">
                {[5, 4, 3, 2, 1].map((star, index) => {
                  const count = reversedStarCounts[index];
                  const percentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center">
                      <span className="w-10 text-sm font-medium text-[#5A5A5A]">
                        {star} star
                      </span>
                      <div className="flex-1 mx-2 h-3 bg-[#E0D4C7] rounded">
                        <div
                          className="h-3 bg-yellow-400 rounded"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-sm text-[#5A5A5A] text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review Highlights */}
            <div>
              <h3 className="text-lg font-medium text-[#333333]">
                Review Highlights
              </h3>
              <div className="mt-3 space-y-2">
                {highlights.map((review, index) => (
                  <div
                    key={String(
                      review.id || (review as any)._id || `highlight-${index}`
                    )}
                    className="border border-[#E0D4C7] rounded-md p-3"
                  >
                    <div className="flex items-center">
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="ml-2 text-sm font-medium text-[#333333]">
                        {review.title}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#5A5A5A]">
                      Reviewed on {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Form with scroll-to behavior */}
          {showReviewForm && user && (
            <div ref={reviewFormRef} className="mt-8">
              <ReviewForm
                productId={product.id}
                productName={product.title}
                user={user}
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {/* Recent Reviews */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#333333] mb-4">
              Recent Reviews
            </h3>
            {totalReviews > 0 ? (
              <div className="space-y-6">
                {productReviews.map((review, index) => (
                  <ReviewCard
                    key={String(
                      review.id || (review as any)._id || `review-${index}`
                    )}
                    id={String(
                      review.id || (review as any)._id || `review-${index}`
                    )}
                    user={{
                      name: review.user?.name || "Anonymous User",
                      image:
                        review.user?.image || "https://via.placeholder.com/150",
                      reviews: review.user?.reviews || 0,
                    }}
                    rating={review.rating}
                    title={review.title || ""}
                    content={review.content || ""}
                    date={review.date || new Date().toISOString()}
                    helpfulCount={review.helpfulCount || 0}
                    productId={review.productId}
                    productName={review.productName || product.title}
                    verified={review.verified || false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#5A5A5A]">
                  No reviews yet for this product.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
