import { Request, Response } from 'express';
import User from './userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

        const token = jwt.sign({ id: newUser._id }, config.secret, {
        expiresIn: 86400, // 24 hours
        });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};
