import { Request, Response } from 'express'

export const upload = async (req: Request, res: Response) => {
  try {
    if (!req.body.images || req.body.images.length === 0)
      return res.status(400).json({ message: 'No image uploaded' })

    // Trả về tất cả URL ảnh vừa upload
    return res.json({
      code: 200,
      message: 'Tạo sản phẩm thành công!',
      urls: req.body.images,
    })
  } catch (error) {
    console.error('Lỗi changeStatus:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}
