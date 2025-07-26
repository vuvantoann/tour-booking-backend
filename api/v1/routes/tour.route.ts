import { Router, Request, Response } from 'express'
import Tour from '../models/tour.model'

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  const tours = await Tour.find({
    deleted: false,
  })
  res.json(tours)
})

router.get('/detail/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const tour = await Tour.findOne({
    _id: id,
    deleted: false,
  })
  res.json(tour)
})
export const tourRoutes: Router = router
