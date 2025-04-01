// models/Review.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  user: {
    name: string;
    image?: string;
    reviews?: number;
  };
  rating: number;
  title: string;
  content: string;
  date: Date;
  helpfulCount: number;
  productId: number;
  productName: string;
  verified: boolean;
}

const ReviewSchema: Schema = new Schema({
  user: {
    name: { type: String, required: true },
    image: {
      type: String,
      required: false,
      default: "https://via.placeholder.com/150",
    },
    reviews: { type: Number, required: false, default: 0 },
  },
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  helpfulCount: { type: Number, default: 0 },
  productId: { type: Number, required: true },
  productName: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
