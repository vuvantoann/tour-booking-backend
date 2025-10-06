import { Request, Response } from 'express'
import Tour from '../../models/tour.model'
import Category from '../../models/category.model'

// [GET] /api/v1/tours
export const index = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find({ deleted: false })
    res.json(tours)
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tours:', error)
    res.status(500).json({ error: 'Không lấy được danh sách tours' })
  }
}

//[GET]/api/v1/tours/:slugCategory
export const ToursByCategory = async (req: Request, res: Response) => {
  try {
    const slugCategory: string = req.params.slugCategory
    const category = await Category.findOne({
      slug: slugCategory,
      deleted: false,
    })

    const tours = await Tour.find({
      tour_category_id: category._id,
      deleted: false,
    })

    return res.json(tours)
  } catch (error) {
    console.error('Lỗi :', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}

//[GET]/api/v1/tours/detail/:slugProduct
export const detail = async (req: Request, res: Response) => {
  try {
    const slugProduct: string = req.params.slugProduct
    const tourDetail = await Tour.findOne({
      slug: slugProduct,
      deleted: false,
    })

    if (!tourDetail) return res.status(404).send('Không tìm thấy tour')

    return res.json(tourDetail)
  } catch (error) {
    console.error('Lỗi :', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}
