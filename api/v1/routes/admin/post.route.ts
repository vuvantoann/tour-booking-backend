import { Router } from 'express'
import * as controller from '../../controllers/admin/post.controller'
import {
  upload,
  uploadToCloudinary,
} from '../../middlewares/uploadCloud.middleware'

const router: Router = Router()

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

router.post(
  '/create',
  upload.array('images', 10),
  uploadToCloudinary,
  controller.create
)

router.patch(
  '/edit/:id',
  upload.single('image'),
  uploadToCloudinary,
  controller.edit
)

router.delete('/delete/:id', controller.deletePost)

export const postRoutes: Router = router
