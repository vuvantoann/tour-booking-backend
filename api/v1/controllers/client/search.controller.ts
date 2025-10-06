import { Request, Response } from 'express'
import searchHelper from '../../helper/search'
import Tour from '../../models/tour.model'

//[GET]/api/v1/admin/topics
export const search = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean
      title?: RegExp
    }

    const find: Find = {
      deleted: false,
    }
    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
      find.title = objectSearch.regex
    }
    const tours = await Tour.find(find)
    return res.status(200).json(tours)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
