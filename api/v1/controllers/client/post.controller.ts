import { Request, Response } from 'express'
import Post from '../../models/post.model'
import Topic from '../../models/topic.model'

//[GET]/api/v1/posts
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

//[GET]/api/v1/posts/:slugTopic
export const postsByTopic = async (req: Request, res: Response) => {
  try {
    const slugTopic: string = req.params.slugTopic

    const topic = await Topic.findOne({
      slug: slugTopic,
      deleted: false,
    })

    const posts = await Post.find({
      topic_id: topic._id,
      deleted: false,
    })

    return res.json(posts)
  } catch (error) {
    console.error('Lỗi :', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}

//[GET]/api/v1/posts/detail/:slugPost
export const detail = async (req: Request, res: Response) => {
  try {
    const slugPost: string = req.params.slugPost
    const PostDetail = await Post.findOne({
      slug: slugPost,
      deleted: false,
    })

    if (!PostDetail) return res.status(404).send('Không tìm thấy bài đăng')

    return res.json(PostDetail)
  } catch (error) {
    console.error('Lỗi :', error)
    return res.status(400).json({
      code: 400,
      message: 'Không tồn tại!',
    })
  }
}
