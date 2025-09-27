import { Express } from 'express'
import { tourRoutes } from './tour.route'
import { categoryRoutes } from './category.route'
import { authRoutes } from './auth.route'
import * as authMiddleware from '../../middlewares/auth.middleware'

const routesV1Admin = (app: Express) => {
  const version = '/api/v1/admin'

  app.use(version + '/tours', authMiddleware.requireAuth, tourRoutes)

  app.use(version + '/categories', authMiddleware.requireAuth, categoryRoutes)

  app.use(version + '/auth', authRoutes)
}

export default routesV1Admin
