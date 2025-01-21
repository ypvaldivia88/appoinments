import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
