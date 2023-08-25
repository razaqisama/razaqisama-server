import { Request, Response } from 'express';
import ArticleModel, { Article } from '../models/Article';

class Controllers {
  static async getAll (_req: Request, res: Response) {
    try {
      const articles = await ArticleModel.find();
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static async createOne (req: Request, res: Response) {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
      const newArticle: Article = new ArticleModel({
        title,
        content,
      });
  
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static async updateOne(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
      const updatedArticle = await ArticleModel.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );

      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }

      res.status(200).json(updatedArticle);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedArticle = await ArticleModel.findByIdAndDelete(id);

      if (!deletedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }

      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default Controllers;