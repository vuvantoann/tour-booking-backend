import { Request, Response } from 'express'
import Tour from '../../models/tour.model'

// interface custom để có req.files
interface MulterRequest extends Request {
  files?: Express.Multer.File[]
}

// [GET]/api/v1/admin/tours
export const index = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find({
      deleted: false,
    })
    return res.status(200).json(tours)
  } catch (error) {
    return res.status(400).json({
      message: 'Lỗi khi lấy danh sách tours',
      error: error instanceof Error ? error.message : error,
    })
  }
}

// [GET]/api/v1/admin/tours/detail/:id
export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const tour = await Tour.findOne({
      _id: id,
      deleted: false,
    })

    if (!tour) {
      return res.status(404).json({ message: 'Tour không tồn tại' })
    }

    return res.status(200).json(tour)
  } catch (error) {
    return res.status(400).json({
      message: 'Lỗi khi lấy chi tiết tour',
      error: error instanceof Error ? error.message : error,
    })
  }
}

// [POST]/api/v1/admin/tours/create
export const create = async (req: Request, res: Response) => {
  try {
    req.body.price = parseInt(req.body.price)
    req.body.discount = parseInt(req.body.discount || '0')
    req.body.stock = parseInt(req.body.stock)

    if (!req.body.position || req.body.position === '') {
      const countTour = await Tour.countDocuments()
      req.body.position = countTour + 1
    } else {
      req.body.position = parseInt(req.body.position)
    }

    // Không cần xử lý ảnh nữa, vì req.body.images đã có URL Cloudinary
    const existingTour = await Tour.findOne({ code: req.body.code })
    if (existingTour) {
      return res.status(400).json({
        code: 400,
        message: `Code "${req.body.code}" đã tồn tại!`,
      })
    }

    const newTour = new Tour(req.body)
    const data = await newTour.save()

    return res.json({
      code: 200,
      message: 'Tạo sản phẩm thành công!',
      data: data,
    })
  } catch (error) {
    console.error('Lỗi khi tạo tour:', error)
    return res.status(400).json({
      code: 400,
      message: 'Có lỗi xảy ra!',
    })
  }
}

// [PATCH]/api/v1/admin/tours/edit/:id
export const edit = async (req: MulterRequest, res: Response) => {
  try {
    const id: string = req.params.id

    // ép kiểu số cho các field numeric
    const numericFields = ['price', 'discount', 'stock', 'position']
    numericFields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== '') {
        req.body[field] = parseInt(req.body[field])
      }
    })

    await Tour.updateOne({ _id: id }, req.body)

    res.json({
      code: 200,
      message: 'Chỉnh sửa sản phẩm thành công',
    })
  } catch (error) {
    console.error('Lỗi edit tour:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}

//[delete]/api/v1/admin/tours/delete/:id
export const deleteTour = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    await Tour.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    )
    res.json({
      code: 200,
      message: 'xóa sảm phẩm thành công',
    })
  } catch (error) {
    console.error('Lỗi changeStatus:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}
