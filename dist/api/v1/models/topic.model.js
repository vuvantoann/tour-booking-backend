"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const topicSchema = new mongoose_1.default.Schema({
    title: String,
    image: String,
    description: String,
    status: String,
    position: Number,
    slug: { type: String, slug: 'title', unique: true, slugPaddingSize: 4 },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    parent_id: { type: String, default: '' },
}, {
    timestamps: true,
});
const Topic = mongoose_1.default.model('Topic', topicSchema, 'topics');
exports.default = Topic;
