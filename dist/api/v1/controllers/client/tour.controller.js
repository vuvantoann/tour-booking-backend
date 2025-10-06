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
exports.detail = exports.ToursByCategory = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tours = yield tour_model_1.default.find({ deleted: false });
        res.json(tours);
    }
    catch (error) {
        console.error('Lỗi khi lấy danh sách tours:', error);
        res.status(500).json({ error: 'Không lấy được danh sách tours' });
    }
});
exports.index = index;
const ToursByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugCategory = req.params.slugCategory;
        const category = yield category_model_1.default.findOne({
            slug: slugCategory,
            deleted: false,
        });
        const tours = yield tour_model_1.default.find({
            tour_category_id: category._id,
            deleted: false,
        });
        return res.json(tours);
    }
    catch (error) {
        console.error('Lỗi :', error);
        return res.status(400).json({
            code: 400,
            message: 'Không tồn tại!',
        });
    }
});
exports.ToursByCategory = ToursByCategory;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugProduct = req.params.slugProduct;
        const tourDetail = yield tour_model_1.default.findOne({
            slug: slugProduct,
            deleted: false,
        });
        if (!tourDetail)
            return res.status(404).send('Không tìm thấy tour');
        return res.json(tourDetail);
    }
    catch (error) {
        console.error('Lỗi :', error);
        return res.status(400).json({
            code: 400,
            message: 'Không tồn tại!',
        });
    }
});
exports.detail = detail;
