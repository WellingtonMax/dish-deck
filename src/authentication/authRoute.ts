import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User, { User as UserModel } from '../authentication/userModel';

const router: Router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, role } = req.body;
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user: UserModel = new User({ email, password: hashedPassword, name, role });
    const result: UserModel = await user.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserModel | null = await User.findOne({ email: req.body.email });
    if (user) {
      const match: boolean = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token: string = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '');
        res.json({ token });
      } else {
        res.status(401).send('Invalid email or password');
      }
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    next(err);
  }
});

export default router;