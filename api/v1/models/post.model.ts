import mongoose from 'mongoose'
import slug from 'mongoose-slug-updater'
mongoose.plugin(slug)

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
    reactions: {
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
    },
    views: { type: Number, default: 0 },
    userId: { type: Number, required: true },
    news: { type: Boolean, default: false },
    related: [{ type: String }],
    slug: { type: String, required: true, unique: true },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema, 'posts')

export default Post
