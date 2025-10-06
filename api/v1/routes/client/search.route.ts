import { Router } from 'express'

import * as controller from '../../controllers/client/search.controller'

const router: Router = Router()

router.get('/', controller.search)

export const searchRoutes: Router = router
