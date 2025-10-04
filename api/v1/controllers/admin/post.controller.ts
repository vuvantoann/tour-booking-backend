import { Request, Response } from 'express'
import Post from '../../models/post.model'
import mongoose from 'mongoose'
import Topic from '../../models/topic.model'
import searchHelper from '../../helper/search'

//[GET]/api/v1/admin/posts
export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean
      status?: string
      title?: RegExp
      topic_id?: string | mongoose.Types.ObjectId
    }

    const find: Find = {
      deleted: false,
    }
    //Tính năng lọc theo trạng thái
    if (req.query.status) {
      find.status = req.query.status.toString()
    }
    // kết thúc tính năng lọc theo trạng thái

    // Tính năng lọc theo danh mục sản phẩm

    const slugTopic = req.query.slugTopic?.toString()
    if (slugTopic) {
      const topic = await Topic.findOne({
        slug: slugTopic,
        deleted: false,
      })
      if (topic) {
        find.topic_id = topic._id
      }
    }

    // Kết thúc

    // Tính sắp xếp theo tiêu chí
    let sort = {}
    if (req.query.sortKey && req.query.sortValue) {
      const sortKey = req.query.sortKey.toString()
      sort[sortKey] = req.query.sortValue
    }
    // kết thúc tính năng sắp xếp theo tiêu chí

    // Tính năng tìm kiếm
    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
      find.title = objectSearch.regex
    }
    // kết thúc Tính năng tìm kiếm

    const posts = await Post.find(find).sort(sort)
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
