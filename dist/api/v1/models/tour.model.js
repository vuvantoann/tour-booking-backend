"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const tourSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    tour_category_id: {
        type: String,
        default: '',
    },
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
const Tour = mongoose_1.default.model('Tour', tourSchema, 'tours');
exports.default = Tour;
