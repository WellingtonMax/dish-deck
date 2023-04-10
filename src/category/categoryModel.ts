import { model, Schema, Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  parent: Category | null;
}

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
});

export default model<Category>('Category', CategorySchema);