"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.index = void 0;
const category_model_1 = __importDefault(require("../../models/category.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.default.find({ deleted: false });
        res.json(categories);
    }
    catch (error) {
        console.error('Lỗi khi lấy danh sách categories:', error);
        res.status(500).json({ error: 'Không lấy được danh sách categories' });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'ID không hợp lệ' });
        }
        const category = yield category_model_1.default.findOne({ _id: id, deleted: false });
        if (!category) {
            return res.status(404).json({ error: 'Category không tồn tại' });
        }
        res.json(category);
    }
    catch (error) {
        console.error('Lỗi khi lấy chi tiết category:', error);
        res.status(500).json({ error: 'Không lấy được chi tiết category' });
    }
});
exports.detail = detail;
