import { Request, Response } from 'express'
import Post from '../../models/post.model'

export const index = async (req: Request, res: Response) => {
  const posts = await Post.find({
    deleted: false,
  })
  res.json(posts)
}
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id
  const post = await Post.findOne({
    _id: id,
    deleted: false,
  })
  res.json(post)
}
