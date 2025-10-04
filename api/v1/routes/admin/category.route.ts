import { Router } from 'express'
import {
  upload,
  uploadToCloudinary,
} from '../../middlewares/uploadCloud.middleware'

import * as controller from '../../controllers/admin/category.controller'

const router: Router = Router()

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

router.post(
  '/create',
  upload.single('image'),
  uploadToCloudinary,
  controller.create
)

router.patch(
  '/edit/:id',
  upload.single('image'),
  uploadToCloudinary,
  controller.edit
)
export const categoryRoutes: Router = router
