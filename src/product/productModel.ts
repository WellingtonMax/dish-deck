
import { model, Schema, Document } from 'mongoose';
import { Category } from '../category/categoryModel';

export interface Product extends Document {
  name: string;
  categories: Category[];
  qty: number;
  price: number;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }],
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default model<Product>('Product', ProductSchema);