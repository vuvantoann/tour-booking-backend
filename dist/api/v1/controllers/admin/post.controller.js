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
exports.deletePost = exports.edit = exports.create = exports.detail = exports.index = void 0;
const post_model_1 = __importDefault(require("../../models/post.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find({
            deleted: false,
        });
        res.json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const post = yield post_model_1.default.findOne({
            _id: id,
            deleted: false,
        });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.detail = detail;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.position && req.body.position !== 0) {
            const countPost = yield post_model_1.default.countDocuments();
            req.body.position = countPost + 1;
        }
        else {
            req.body.position = parseInt(req.body.position, 10);
        }
        const newPost = new post_model_1.default(req.body);
        const data = yield newPost.save();
        return res.json({
            code: 200,
            message: 'Tạo bài viết thành công!',
            data,
        });
    }
    catch (error) {
        console.error('Lỗi khi tạo bài viết:', error);
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
        yield post_model_1.default.updateOne({ _id: id }, { $set: req.body });
        res.json({
            code: 200,
            message: 'Cập nhật Bài viết thành công',
        });
    }
    catch (error) {
        console.error('Lỗi edit post:', error);
        return res.status(400).json({
            code: 400,
            message: 'Không tồn tại!',
        });
    }
});
exports.edit = edit;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield post_model_1.default.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: new Date(),
        });
        res.json({
            code: 200,
            message: 'xóa bài viết thành công',
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
exports.deletePost = deletePost;
