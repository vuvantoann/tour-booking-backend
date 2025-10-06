import { Request, Response } from 'express'
import Category from '../../models/category.model'

// [GET] /api/v1/categories
export const index = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ deleted: false })
    res.json(categories)
  } catch (error) {
    console.error('Lỗi khi lấy danh sách categories:', error)
    res.status(500).json({ error: 'Không lấy được danh sách categories' })
  }
}

// [GET] /api/v1/categories/:id
export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(400).json({ error: 'ID không hợp lệ' })
    }

    const category = await Category.findOne({ _id: id, deleted: false })
    if (!category) {
      return res.status(404).json({ error: 'Category không tồn tại' })
    }

    res.json(category)
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết category:', error)
    res.status(500).json({ error: 'Không lấy được chi tiết category' })
  }
}
