import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
  productCount: number;
  description: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  productCount: { type: Number, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
