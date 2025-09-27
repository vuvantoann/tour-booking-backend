import { NextFunction, Request, Response } from 'express'
import Account from '../models/account.model'

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Lấy token từ cookie
    const token = req.cookies?.token

    if (!token) {
      res.status(400).json({
        code: 400,
        message: 'Bạn cần đăng nhập',
      })
      return
    }

    const infoUser = await Account.findOne({
      token: token,
      deleted: false,
    }).select('-password')

    if (!infoUser) {
      res.status(400).json({
        code: 4000,
        message: 'Tài khoản không hợp lệ',
      })
      return
    }

    // Gắn thông tin user vào req để controller khác dùng
    req['user'] = infoUser
    next()
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Lỗi server',
    })
  }
}
