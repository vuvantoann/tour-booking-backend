import { Request, Response } from 'express'
import Post from '../../models/post.model'

//[GET]/api/v1/admin/posts
export const index = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({
      deleted: false,
    })
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//[GET]/api/v1/admin/posts/
export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const post = await Post.findOne({
      _id: id,
      deleted: false,
    })
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// [POST]/api/v1/admin/posts/create
export const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.position || req.body.position === '') {
      const countPost = await Post.countDocuments()
      req.body.position = countPost + 1
    } else {
      req.body.position = parseInt(req.body.position)
    }

    const newPost = new Post(req.body)
    const data = await newPost.save()

    return res.json({
      code: 200,
      message: 'Tạo bài viết thành công!',
      data: data,
    })
  } catch (error) {
    console.error('Lỗi khi tạo bài viết:', error)
    return res.status(400).json({
      code: 400,
      message: 'Có lỗi xảy ra!',
    })
  }
}
