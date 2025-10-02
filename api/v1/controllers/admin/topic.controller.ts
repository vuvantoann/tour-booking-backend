import { Request, Response } from 'express'
import Topic from '../../models/topic.model'

//[GET]/api/v1/admin/topics
export const index = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({
      deleted: false,
    })
    res.json(topics)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
//[GET]/api/v1/admin/topics/detail/:id
export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const topic = await Topic.findOne({
      _id: id,
      deleted: false,
    })
    if (!topic) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(topic)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
