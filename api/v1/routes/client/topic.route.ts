import { Router } from 'express'

import * as controller from '../../controllers/client/topic.controller'

const router: Router = Router()

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

export const topicRoutes: Router = router
