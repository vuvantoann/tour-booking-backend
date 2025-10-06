import { Router } from 'express'

import * as controller from '../../controllers/client/membership.controller'

const router: Router = Router()

router.post('/register', controller.register)

export const membershipRoutes: Router = router
