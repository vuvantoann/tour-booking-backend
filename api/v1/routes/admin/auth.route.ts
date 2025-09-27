import { Router } from 'express'

const router: Router = Router()
import * as controller from '../../controllers/admin/auth.controller'
import * as authMiddleware from '../../middlewares/auth.middleware'

router.post('/login', controller.login)

router.get('/logout', authMiddleware.requireAuth, controller.logout)

router.get('/check', authMiddleware.requireAuth, controller.check)

export const authRoutes: Router = router
