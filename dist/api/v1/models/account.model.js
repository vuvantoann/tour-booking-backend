"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    avatar: String,
    status: {
        type: String,
        default: 'active',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deleteAt: Date,
}, {
    timestamps: true,
});
const Account = mongoose_1.default.model('Account', accountSchema, 'accounts');
exports.default = Account;
