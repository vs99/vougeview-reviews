import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
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
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  details: {
    type: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    default: [],
  },
  variants: { type: Array, default: [] },
  longDescription: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
