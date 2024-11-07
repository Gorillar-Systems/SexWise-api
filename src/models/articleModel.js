import { Schema, model } from "mongoose";

const articleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String }, // Could be a reference if professionals create artic les 
    category: { type: String },
    type: { type: String, enum: ['Free', 'Paid'], default: 'Free' },
    views: { type: Number, default:0 },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date }
});

export const ArticleModel = model("Article", articleSchema)
  