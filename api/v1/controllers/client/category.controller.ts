import { Request, Response } from 'express'
import Category from '../../models/category.model'

export const index = async (req: Request, res: Response) => {
  const categories = await Category.find({
    deleted: false,
  })
  res.json(categories)
}
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id
  const category = await Category.findOne({
    _id: id,
    deleted: false,
  })
  res.json(category)
}
