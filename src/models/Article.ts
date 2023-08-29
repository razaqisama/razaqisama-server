import mongoose, { Document, Schema } from 'mongoose';

export interface Article extends Document {
  title: string;
  content: string;
  slug: string;
}

const ArticleSchema = new Schema<Article>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true },
});

export default mongoose.model<Article>('Article', ArticleSchema);