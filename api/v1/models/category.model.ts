import mongoose from 'mongoose'
import slug from 'mongoose-slug-updater'
mongoose.plugin(slug)

const categorySchema = new mongoose.Schema(
  {
    title: String,
    image: String, // Thêm để khớp dữ liệu
    description: String,
    status: String,
    position: Number,
    slug: { type: String, slug: 'title', unique: true, slugPaddingSize: 4 },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }, // sửa deleteAt → deletedAt
    parent_id: { type: String, default: '' }, // Tùy bạn có cần hay không
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model('Category', categorySchema, 'categories')
export default Category
