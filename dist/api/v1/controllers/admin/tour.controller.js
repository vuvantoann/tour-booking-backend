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
exports.deleteTour = exports.edit = exports.create = exports.detail = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tours = yield tour_model_1.default.find({
        deleted: false,
    });
    res.json(tours);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tour = yield tour_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    res.json(tour);
});
exports.detail = detail;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.price = parseInt(req.body.price);
        req.body.discount = parseInt(req.body.discount);
        req.body.stock = parseInt(req.body.stock);
        if (req.body.position === '') {
            const countTour = yield tour_model_1.default.countDocuments();
            req.body.position = countTour + 1;
        }
        else {
            req.body.position = parseInt(req.body.position);
        }
        const existingTour = yield tour_model_1.default.findOne({ code: req.body.code });
        if (existingTour) {
            return res.status(400).json({
                code: 400,
                message: `Code "${req.body.code}" đã tồn tại!`,
            });
        }
        const newTour = new tour_model_1.default(req.body);
        const data = yield newTour.save();
        return res.json({
            code: 200,
            message: 'Tạo sản phẩm thành công!',
            data: data,
        });
    }
    catch (error) {
        console.error('Lỗi khi tạo tour:', error);
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
        const numericFields = ['price', 'discount', 'stock', 'position'];
        numericFields.forEach((field) => {
            if (req.body[field] !== undefined && req.body[field] !== '') {
                req.body[field] = parseInt(req.body[field]);
            }
        });
        yield tour_model_1.default.updateOne({ _id: id }, req.body);
        res.json({
            code: 200,
            message: 'chỉnh sửa sản phẩm thành công',
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
exports.edit = edit;
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield tour_model_1.default.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: new Date(),
        });
        res.json({
            code: 200,
            message: 'xóa sảm phẩm thành công',
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
exports.deleteTour = deleteTour;
