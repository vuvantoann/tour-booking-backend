import { Router } from 'express'

import * as controller from '../../controllers/admin/tour.controller'

const router: Router = Router()

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

router.post('/create', controller.create)

router.patch('/edit/:id', controller.edit)

router.delete('/delete/:id', controller.deleteTour)

export const tourRoutes: Router = router
