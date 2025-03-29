"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface ReviewFormProps {
  productId: number;
  productName: string;
  onSubmit: (review: {
    rating: number;
    title: string;
    content: string;
    productId: number;
    productName: string;
  }) => void;
  onCancel?: () => void;
}

const ReviewForm = ({
  productId,
  productName,
  onSubmit,
  onCancel,
}: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (rating === 0) {
      setError("Please select a rating");
      toast.error("Please select a rating");
      return;
    }

    if (title.trim() === "") {
      setError("Please enter a review title");
      toast.error("Please enter a review title");
      return;
    }

    if (content.trim() === "") {
      setError("Please enter review content");
      toast.error("Please enter review content");
      return;
    }

    // Submit the review
    onSubmit({
      rating,
      title,
      content,
      productId,
      productName,
    });

    // Show success toast
    toast.success("Review submitted successfully!");

    // Reset form
    setRating(0);
    setTitle("");
    setContent("");
    setError(null);
  };

  const getRatingLabel = (value: number) => {
    return (
      ["Poor", "Fair", "Good", "Very Good", "Excellent"][value - 1] ||
      "Select a rating"
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        {productName && (
          <CardDescription>
            You are reviewing:{" "}
            <span className="font-medium">{productName}</span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="rating">
                Rating <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {hoveredRating > 0
                    ? getRatingLabel(hoveredRating)
                    : getRatingLabel(rating)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-title">
                Review Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="review-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-content">
                Review <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="review-content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your experience with this product. What did you like or dislike? Would you recommend it to others?"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
        )}
        <Button type="submit" onClick={handleSubmit}>
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewForm;
