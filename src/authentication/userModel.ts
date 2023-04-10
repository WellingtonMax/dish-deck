import { model, Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

export default model<User>('User', UserSchema);