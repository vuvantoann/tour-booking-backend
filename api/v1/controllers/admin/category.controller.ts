import { Request, Response } from 'express'
import Category from '../../models/category.model'

// interface custom để có req.files
interface MulterRequest extends Request {
  files?: Express.Multer.File[]
}

// [GET]/api/v1/admin/categories
export const index = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ deleted: false })
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// [GET]/api/v1/admin/categories/detail/:id
export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const category = await Category.findOne({ _id: id, deleted: false })

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.json(category)
  } catch (error) {
    console.error('Error fetching category detail:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// [POST]/api/v1/admin/categories/create
export const create = async (req: Request, res: Response) => {
  try {
    let position: number
    if (
      req.body.position === undefined ||
      req.body.position === null ||
      req.body.position === ''
    ) {
      const countCategory = await Category.countDocuments()
      position = countCategory + 1
    } else {
      position = Number(req.body.position)
      if (isNaN(position)) {
        position = (await Category.countDocuments()) + 1
      }
    }

    req.body.position = position // đảm bảo là Number

    const newCategory = new Category(req.body)
    const data = await newCategory.save()

    return res.json({
      code: 200,
      message: 'Tạo sản phẩm thành công!',
      data: data,
    })
  } catch (error) {
    console.error('Lỗi khi tạo category:', error)
    return res.status(400).json({
      code: 400,
      message: 'Có lỗi xảy ra!',
    })
  }
}

// [PATCH] /api/v1/admin/categories/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    // ép kiểu số cho field position
    if (
      req.body.position !== undefined &&
      req.body.position !== null &&
      req.body.position !== ''
    ) {
      req.body.position = Number(req.body.position)
    } else {
      delete req.body.position // nếu không nhập gì thì bỏ qua
    }

    await Category.updateOne({ _id: id }, { $set: req.body })

    res.json({
      code: 200,
      message: 'Cập nhật category thành công',
    })
  } catch (error) {
    console.error('Lỗi edit category:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}

//[delete]/api/v1/admin/tours/delete/:id
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    await Category.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    )
    res.json({
      code: 200,
      message: 'xóa danh mục thành công',
    })
  } catch (error) {
    console.error('Lỗi changeStatus:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}
