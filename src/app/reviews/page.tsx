"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ReviewCard from "../components/ReviewCard";

// Define the Review type
type Review = {
  id: number;
  _id?: string;
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

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          // Sort reviews by date descending (newest first)
          const sortedReviews = data.reviews.sort(
            (a: Review, b: Review) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          // Take the top 10 reviews
          const top10Reviews = sortedReviews.slice(0, 10);
          setReviews(top10Reviews);
        } else {
          console.error("Failed to fetch reviews", await res.json());
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading reviews...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Reviews</h1>
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard
              key={String(review.id || review._id)}
              id={String(review.id || review._id)}
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
        <p className="text-gray-500">No reviews available.</p>
      )}
      {/* Bottom Return Home Button */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#8B6E4E] text-white font-medium rounded-md shadow hover:bg-[#654E3E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6E4E]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
