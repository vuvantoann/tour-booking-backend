import { Router } from 'express'

import * as controller from '../controllers/category.controller'

const router: Router = Router()

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

export const categoryRoutes: Router = router
