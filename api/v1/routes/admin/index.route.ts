import { Express } from 'express'
import { tourRoutes } from './tour.route'

const routesV1Admin = (app: Express) => {
  const version = '/api/v1/admin'

  app.use(version + '/tours', tourRoutes)
}

export default routesV1Admin
