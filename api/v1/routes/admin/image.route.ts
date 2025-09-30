import { Router } from 'express'
import {
  upload,
  uploadToCloudinary,
} from '../../middlewares/uploadCloud.middleware'
const router: Router = Router()
import * as controller from '../../controllers/admin/image.controller'

router.post(
  '/upload',
  upload.array('images', 10),
  uploadToCloudinary,
  controller.upload
)

export const uploadImageRoutes: Router = router
