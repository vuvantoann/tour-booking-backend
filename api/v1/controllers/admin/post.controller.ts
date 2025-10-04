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

//[GET]/api/v1/admin/posts/detail/:id
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
    // Nếu người dùng không nhập position (null, undefined, NaN, hoặc chuỗi rỗng)
    if (!req.body.position && req.body.position !== 0) {
      const countPost = await Post.countDocuments()
      req.body.position = countPost + 1
    } else {
      req.body.position = parseInt(req.body.position, 10)
    }

    const newPost = new Post(req.body)
    const data = await newPost.save()

    return res.json({
      code: 200,
      message: 'Tạo bài viết thành công!',
      data,
    })
  } catch (error) {
    console.error('Lỗi khi tạo bài viết:', error)
    return res.status(400).json({
      code: 400,
      message: 'Có lỗi xảy ra!',
    })
  }
}

// [PATCH] /api/v1/admin/posts/:id
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

    await Post.updateOne({ _id: id }, { $set: req.body })

    res.json({
      code: 200,
      message: 'Cập nhật Bài viết thành công',
    })
  } catch (error) {
    console.error('Lỗi edit post:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}

//[delete]/api/v1/admin/tours/delete/:id
export const deletePost = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    await Post.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    )
    res.json({
      code: 200,
      message: 'xóa bài viết thành công',
    })
  } catch (error) {
    console.error('Lỗi changeStatus:', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}
