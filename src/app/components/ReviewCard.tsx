"use client";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
  id?: string;
  user: {
    name: string;
    image?: string;
    reviews: number;
    email?: string;
  };
  rating: number;
  title: string;
  content: string;
  date: string;
  helpfulCount: number;
  productId: number;
  productName: string;
  verified: boolean;
}

const ReviewCard = ({
  id,
  user,
  rating,
  title,
  content,
  date,
  helpfulCount,
  productId,
  productName,
  verified,
}: ReviewCardProps) => {
  // Use local state for optimistic UI updates.
  const [helpful, setHelpful] = useState(helpfulCount);
  const dateObj = new Date(date);
  const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true });

  // Get initials from the user name.
  const getInitials = (name: string) => {
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  // Format the reviews count text.
  const reviewsCountText =
    user.reviews === 1 ? "1 review" : `${user.reviews} reviews`;

  // Render star rating icons.
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
                <stop offset="50%" stopColor="#CBD5E0" />
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
            className="h-5 w-5 text-[#E0D4C7]"
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

  // When the Helpful button is clicked, update locally and via API.
  const handleHelpfulClick = async () => {
    // Optimistically update the UI.
    setHelpful(helpful + 1);

    try {
      const res = await fetch(`/api/reviews/${id}/helpful`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        console.error("Failed to update helpful count");
        // Optionally: revert the optimistic update if needed.
      }
    } catch (error) {
      console.error("Error updating helpful count:", error);
      // Optionally: revert the update here.
    }
  };

  return (
    <div className="bg-[#F9F5F0] p-6 rounded-lg shadow-md mb-4">
      <div className="flex items-start">
        {/* Avatar using user initials */}
        <div className="relative h-10 w-10 mr-4">
          <div className="h-full w-full rounded-full bg-[#8B6E4E] flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {getInitials(user.name)}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h4 className="font-medium text-[#333333]">{user.name}</h4>
                {verified && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E0D4C7] text-[#8B6E4E]">
                    Verified Purchase
                  </span>
                )}
              </div>
              <p className="text-sm text-[#5A5A5A]">{reviewsCountText}</p>
            </div>
            <p className="text-sm text-[#5A5A5A]">{timeAgo}</p>
          </div>
          <div className="mt-2">
            <div className="flex items-center">
              <div className="flex">{renderStars(rating)}</div>
              <h3 className="ml-2 text-lg font-medium text-[#333333]">
                {title}
              </h3>
            </div>
            <p className="mt-2 text-[#5A5A5A]">{content}</p>
          </div>
          <div className="mt-4 text-sm">
            <p className="text-[#5A5A5A]">
              Review for{" "}
              <a
                href={`/products/${productId}`}
                className="text-[#8B6E4E] hover:text-[#654E3E]"
              >
                {productName}
              </a>
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <button
              onClick={handleHelpfulClick}
              className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-[#F3ECE1] bg-[#8B6E4E] hover:bg-[#654E3E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6E4E]"
            >
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              Helpful ({helpful})
            </button>
            <button className="ml-4 text-sm text-[#5A5A5A] hover:text-[#333333]">
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
