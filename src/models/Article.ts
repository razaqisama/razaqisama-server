import mongoose, { Document, Schema } from 'mongoose';

export interface Article extends Document {
  title: string;
  content: string;
}

const ArticleSchema = new Schema<Article>({
  title: String,
  content: String,
});

export default mongoose.model<Article>('Article', ArticleSchema);