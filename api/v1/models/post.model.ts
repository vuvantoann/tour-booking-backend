import mongoose from 'mongoose'
import slug from 'mongoose-slug-updater'
mongoose.plugin(slug)

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, slug: 'title', unique: true, slugPaddingSize: 4 },

    excerpt: { type: String },
    content: { type: String, required: true }, // nội dung HTML (TinyMCE / CKEditor)

    images: [{ type: String }],
    topic_id: { type: String, default: '' },
    author_id: { type: String },

    status: { type: String, default: 'draft' },
    publishedAt: { type: Date }, // ngày publish
    position: { type: Number },

    // Metadata quản lý
    createdBy: {
      account_id: String,
      createdAt: { type: Date, default: Date.now },
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // tự động thêm createdAt, updatedAt
  }
)

const Post = mongoose.model('Post', postSchema, 'posts')

export default Post
