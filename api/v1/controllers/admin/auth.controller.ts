import { Request, Response } from 'express'

import md5 from 'md5'
import Account from '../../models/account.model'

//[POST]/api/v1/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email
    const password: string = md5(req.body.password)
    const user = await Account.findOne({
      email: email,
      deleted: false,
    })
    if (!user) {
      res.json({
        code: 400,
        message: 'Email không tồn tại',
      })
      return
    }

    if (password != user.password) {
      res.json({
        code: 400,
        message: 'Sai mật khẩu',
      })
      return
    }

    if (user.status === 'inactive') {
      res.json({
        code: 400,
        message: 'Tài khoản đã bị khóa',
      })
      return
    }

    const token = user.token
    res.cookie('token', token)

    res.json({
      code: 200,
      message: 'Đăng nhập thành công',
      token: token,
    })
  } catch (error) {
    console.error('Lỗi changeStatus:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}

//[GET]/api/v1/auth/logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token')
    res.json({
      code: 200,
      message: 'Đăng xuất thành công',
    })
  } catch (error) {
    console.error('Lỗi changeStatus:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}

//[GET]/api/v1/auth/check
export const check = async (req: Request, res: Response) => {
  try {
    res.json({
      code: 200,
      message: 'Đã đăng nhập',
      user: req['user'],
    })
  } catch (error) {
    console.error('Lỗi changeStatus:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}
