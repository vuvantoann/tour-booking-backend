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
exports.deleteCategory = exports.edit = exports.create = exports.detail = exports.index = void 0;
const category_model_1 = __importDefault(require("../../models/category.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.default.find({ deleted: false });
        res.json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield category_model_1.default.findOne({ _id: id, deleted: false });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    }
    catch (error) {
        console.error('Error fetching category detail:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.detail = detail;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let position;
        if (req.body.position === undefined ||
            req.body.position === null ||
            req.body.position === '') {
            const countCategory = yield category_model_1.default.countDocuments();
            position = countCategory + 1;
        }
        else {
            position = Number(req.body.position);
            if (isNaN(position)) {
                position = (yield category_model_1.default.countDocuments()) + 1;
            }
        }
        req.body.position = position;
        const newCategory = new category_model_1.default(req.body);
        const data = yield newCategory.save();
        return res.json({
            code: 200,
            message: 'Tạo sản phẩm thành công!',
            data: data,
        });
    }
    catch (error) {
        console.error('Lỗi khi tạo category:', error);
        return res.status(400).json({
            code: 400,
            message: 'Có lỗi xảy ra!',
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (req.body.position !== undefined &&
            req.body.position !== null &&
            req.body.position !== '') {
            req.body.position = Number(req.body.position);
        }
        else {
            delete req.body.position;
        }
        yield category_model_1.default.updateOne({ _id: id }, { $set: req.body });
        res.json({
            code: 200,
            message: 'Cập nhật category thành công',
        });
    }
    catch (error) {
        console.error('Lỗi edit category:', error);
        return res.status(400).json({
            code: 400,
            message: 'Không tồn tại!',
        });
    }
});
exports.edit = edit;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield category_model_1.default.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: new Date(),
        });
        res.json({
            code: 200,
            message: 'xóa danh mục thành công',
        });
    }
    catch (error) {
        console.error('Lỗi changeStatus:', error);
        return res.status(400).json({
            code: 400,
            message: 'Không tồn tại!',
        });
    }
});
exports.deleteCategory = deleteCategory;
