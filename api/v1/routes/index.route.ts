import { Express } from 'express'
import { tourRoutes } from './tour.route'

const routesV1 = (app: Express) => {
  const version = '/api/v1'

  app.use(version + '/tours', tourRoutes)
}

export default routesV1
