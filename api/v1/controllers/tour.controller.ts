import { Request, Response } from 'express'
import Tour from '../models/tour.model'

export const index = async (req: Request, res: Response) => {
  const tours = await Tour.find({
    deleted: false,
  })
  res.json(tours)
}
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id
  const tour = await Tour.findOne({
    _id: id,
    deleted: false,
  })
  res.json(tour)
}

// [POST]/api/v1/tours/create
export const create = async (req: Request, res: Response) => {
  try {
    req.body.price = parseInt(req.body.price)
    req.body.discount = parseInt(req.body.discount)
    req.body.stock = parseInt(req.body.stock)

    if (req.body.position === '') {
      const countTour = await Tour.countDocuments()
      req.body.position = countTour + 1
    } else {
      req.body.position = parseInt(req.body.position)
    }

    //  Kiểm tra trùng mã code
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

//[PATCH]/api/v1/tours/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const numericFields = ['price', 'discount', 'stock', 'position']

    numericFields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== '') {
        req.body[field] = parseInt(req.body[field])
      }
    })

    await Tour.updateOne({ _id: id }, req.body)
    res.json({
      code: 200,
      message: 'chỉnh sửa sản phẩm thành công',
    })
  } catch (error) {
    console.error('Lỗi changeStatus:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}
