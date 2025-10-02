import { Router } from 'express'

import * as controller from '../../controllers/client/post.controller'

const router: Router = Router()

router.get('/', controller.index)

router.get('/:slugTopic', controller.postsByTopic)

router.get('/detail/:slugPost', controller.detail)

export const postRoutes: Router = router
