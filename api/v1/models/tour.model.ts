const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    images: [{ type: String }],
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    information: { type: String },
    schedule: { type: String },
    timeStart: { type: Date },
    stock: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
    position: { type: Number },
    slug: { type: String, slug: 'title', unique: true, slugPaddingSize: 4 },

    // Optional metadata (like product model)
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
    timestamps: true,
  }
)

const Tour = mongoose.model('Tour', tourSchema, 'tours')

export default Tour
