import { Request, Response } from 'express';
import Product, { Product as ProductModel } from './productModel';
import { validationResult } from 'express-validator';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products: ProductModel[] = await Product.find();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const product: ProductModel | null = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    const { name, description, price, category } = req.body;
  
    try {
      const product: ProductModel = new Product({ name, description, price, category });
      const result: ProductModel = await product.save();
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const updateProductById = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    const { name, description, price, category } = req.body;
  
    try {
      const product: ProductModel | null = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, category },
        { new: true }
      );
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const product: ProductModel | null = await Product.findByIdAndDelete(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };