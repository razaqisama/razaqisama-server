import { ErrorHandle } from '../middlewares/errorHandler';
import UserModel from '../models/User';
import { hash, compareHash } from '../utils/bcrypt';
import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../utils/jwt';

class Controllers {
  static async getAll (_req: Request, res: Response, next: NextFunction) {
    try {
      const articles = await UserModel.find();
      res.status(200).json(articles);
    } catch (error) {
      return next();
    }
  };

  static async register (req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (!username || !email || !password) {
      const err = new ErrorHandle('Validation Error, please check your input', 400);
      return next(err);
    }

    if (existingUser) {
      const err = new ErrorHandle('Email already in use', 400);
      return next(err);
    }

    try {
      const hashedPassword = await hash(password);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.log(error);
      return next();
    }
  }

  static async login (req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        const err = new ErrorHandle('Validation Error, please check your input', 401);
        return next(err);
      }
  
      const passwordMatch = await compareHash(password, user.password);
      if (!passwordMatch) {
        const err = new ErrorHandle('Validation Error, please check your input', 401);
        return next(err);
      }

      const token = generateToken({ userId: user.id}, {expiresIn: '1h'});

      res.status(200).json({ token });
    } catch (error) {
      next();
    }
  }
}

export default Controllers;