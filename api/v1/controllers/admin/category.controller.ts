import { Request, Response } from 'express'
import Category from '../../models/category.model'

export const index = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ deleted: false })
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

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
