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
