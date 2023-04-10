import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import dotenv from 'dotenv';
import connectToDatabase from './config/database';
import categoryRoute from './category/categoryRoute';
import productRoute from './product/productRoute';
import authRoute from './authentication/authRoute';
import { authMiddleware } from '../src/authentication/authMiddleware';
// import errorHandler from './utils/errorHandler';

dotenv.config();

(async () => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }

  const app: express.Application = express();

  app.use(cors());
  app.use(urlencoded({ extended: true }));
  app.use(json());

  app.use('/api/auth', authRoute);

  // Rotas públicas
  app.use('/api/categories', categoryRoute);

  // Rotas protegidas por autenticação
  app.use(authMiddleware);
  app.use('/api/categories', categoryRoute);
  app.use('/api/products', productRoute);

  // app.use(errorHandler);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();