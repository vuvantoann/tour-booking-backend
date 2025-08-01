import { Request, Response } from 'express'
import Tour from '../../models/tour.model'

//[GET]/api/v1/tours
export const index = async (req: Request, res: Response) => {
  const tours = await Tour.find({
    deleted: false,
  })
  res.json(tours)
}
