import { Express } from 'express'
import { tourRoutes } from './tour.route'
import { categoryRoutes } from './category.route'

const routesV1Admin = (app: Express) => {
  const version = '/api/v1/admin'

  app.use(version + '/tours', tourRoutes)

  app.use(version + '/categories', categoryRoutes)
}

export default routesV1Admin
