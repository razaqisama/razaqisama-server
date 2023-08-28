import mongoose, { Document, Schema } from 'mongoose';

export interface Article extends Document {
  title: string;
  content: string;
}

const ArticleSchema = new Schema<Article>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model<Article>('Article', ArticleSchema);