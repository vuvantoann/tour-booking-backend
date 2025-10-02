"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const postSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    slug: { type: String, slug: 'title', unique: true, slugPaddingSize: 4 },
    excerpt: { type: String },
    content: { type: String, required: true },
    images: [{ type: String }],
    topic_id: { type: String, default: '' },
    author_id: { type: String },
    status: { type: String, default: 'draft' },
    publishedAt: { type: Date },
    position: { type: Number },
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
}, {
    timestamps: true,
});
const Post = mongoose_1.default.model('Post', postSchema, 'posts');
exports.default = Post;
