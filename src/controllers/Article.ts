import { ErrorHandle, NotFoundError } from '../middlewares/errorHandler';
import { NextFunction, Request, Response } from 'express';
import { ArticleModel, Article } from '../models';

class Controllers {
  static async getAll (_req: Request, res: Response, next: NextFunction) {
    try {
      const articles = await ArticleModel.find();
      res.status(200).json(articles);
    } catch (error) {
      return next();
    }
  };

  static async createOne (req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body;

    if (!title || !content) {
      const err = new ErrorHandle('Title and content are required', 400);
      return next(err);
    }

    try {
      const newArticle: Article = new ArticleModel({
        title,
        content,
      });
  
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
    } catch (error) {
      return next();
    }
  };

  static async updateOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      const err = new ErrorHandle('Title and content are required', 400);
      next(err);
    }

    try {
      const updatedArticle = await ArticleModel.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );

      if (!updatedArticle) {
        const err = new NotFoundError('Article not found');
        return next(err);
      }

      res.status(200).json(updatedArticle);
    } catch (error) {
      next();
    }
  }

  static async deleteOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const deletedArticle = await ArticleModel.findByIdAndDelete(id);

      if (!deletedArticle) {
        const err = new NotFoundError('Article not found');
        return next(err);
      }

      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      return next();
    }
  }
}

export default Controllers;