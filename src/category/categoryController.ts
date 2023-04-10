import { Request, Response } from 'express';
import Category, { Category as CategoryModel } from './categoryModel';
import { validationResult } from 'express-validator';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories: CategoryModel[] = await Category.find();
    res.json(categories);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, parent } = req.body;

  try {
    const category: CategoryModel = new Category({ name, parent });
    const result: CategoryModel = await category.save();
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: CategoryModel | null = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const updateCategoryById = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, parent } = req.body;

  try {
    const category: CategoryModel | null = await Category.findByIdAndUpdate(req.params.id, { name, parent }, { new: true });
    if (category) {
      res.json(category);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const deleteCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: CategoryModel | null = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
};