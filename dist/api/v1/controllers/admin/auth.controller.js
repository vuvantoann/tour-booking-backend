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
exports.check = exports.logout = exports.login = void 0;
const md5_1 = __importDefault(require("md5"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = (0, md5_1.default)(req.body.password);
        const user = yield account_model_1.default.findOne({
            email: email,
            deleted: false,
        });
        if (!user) {
            res.json({
                code: 400,
                message: 'Email không tồn tại',
            });
            return;
        }
        if (password != user.password) {
            res.json({
                code: 400,
                message: 'Sai mật khẩu',
            });
            return;
        }
        if (user.status === 'inactive') {
            res.json({
                code: 400,
                message: 'Tài khoản đã bị khóa',
            });
            return;
        }
        const token = user.token;
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
            code: 200,
            message: 'Đăng nhập thành công',
            token: token,
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
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token');
        res.json({
            code: 200,
            message: 'Đăng xuất thành công',
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
exports.logout = logout;
const check = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            code: 200,
            message: 'Đã đăng nhập',
            user: req['user'],
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
exports.check = check;
