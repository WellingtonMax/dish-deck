import express from 'express';
import { body } from 'express-validator';
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from './categoryController';
import { authMiddleware } from '../authentication/authMiddleware';

const router = express.Router();

router.get('/', getCategories);

router.post(
  '/',
  authMiddleware,
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 255 })
      .withMessage('Name must have at most 255 characters'),
    body('parent')
      .optional({ nullable: true })
      .isMongoId()
      .withMessage('Parent must be a valid MongoDB ObjectId'),
  ],
  createCategory,
);

router.get('/:id', getCategoryById);

router.put(
  '/:id',
  authMiddleware,
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 255 })
      .withMessage('Name must have at most 255 characters'),
    body('parent')
      .optional({ nullable: true })
      .isMongoId()
      .withMessage('Parent must be a valid MongoDB ObjectId'),
  ],
  updateCategoryById,
);

router.delete('/:id', authMiddleware, deleteCategoryById);

export default router;
