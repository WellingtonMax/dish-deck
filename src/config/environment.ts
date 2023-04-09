import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/dish_deck',
  mongooseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};