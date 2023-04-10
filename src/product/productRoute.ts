import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../product/productController';
import { authMiddleware } from '../authentication/authMiddleware';

const router = express.Router();

router.get('/', getProducts);

router.post(
  '/',
  authMiddleware,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isMongoId()
      .withMessage('Category must be a valid MongoDB ObjectId'),
  ],
  createProduct,
);

router.get('/:id', getProductById);

router.put(
  '/:id',
  authMiddleware,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isMongoId()
      .withMessage('Category must be a valid MongoDB ObjectId'),
  ],
  updateProductById,
);

router.delete('/:id', deleteProductById);

export default router;