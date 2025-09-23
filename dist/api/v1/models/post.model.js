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
}, {
    timestamps: true,
});
const Post = mongoose_1.default.model('Post', postSchema, 'posts');
exports.default = Post;
