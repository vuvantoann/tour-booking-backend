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
exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const sharp_1 = __importDefault(require("sharp"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
const uploadToCloudinary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return next();
        }
        const uploadPromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const resizedBuffer = yield (0, sharp_1.default)(file.buffer)
                .resize({ width: 800, height: 600 })
                .toBuffer();
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'tours', resource_type: 'auto' }, (err, result) => {
                    if (err)
                        return reject(err);
                    if (!result)
                        return reject(new Error('Cloudinary upload result undefined'));
                    resolve(result.secure_url);
                });
                streamifier_1.default.createReadStream(resizedBuffer).pipe(stream);
            });
        }));
        const urls = yield Promise.all(uploadPromises);
        req.body.images = urls;
        next();
    }
    catch (err) {
        console.error('Upload lỗi:', err);
        res.status(500).json({ code: 500, message: 'Upload ảnh thất bại' });
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
