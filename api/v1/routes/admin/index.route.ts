import { Express } from 'express'
import { tourRoutes } from './tour.route'
import { categoryRoutes } from './category.route'
import { authRoutes } from './auth.route'

const routesV1Admin = (app: Express) => {
  const version = '/api/v1/admin'

  app.use(version + '/tours', tourRoutes)

  app.use(version + '/categories', categoryRoutes)

  app.use(version + '/auth', authRoutes)
}

export default routesV1Admin
