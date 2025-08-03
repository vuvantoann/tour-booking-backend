import { Router } from 'express'

import * as controller from '../../controllers/client/tour.controller'

const router: Router = Router()

router.get('/', controller.index)

router.get('/:slugCategory', controller.ToursByCategory)

router.get('/detail/:slugProduct', controller.detail)

export const tourRoutes: Router = router
