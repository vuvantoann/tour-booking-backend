import { Express } from 'express'
import { tourRoutes } from './tour.route'
import { postRoutes } from './post.route'

const routesV1 = (app: Express) => {
  const version = '/api/v1'

  app.use(version + '/tours', tourRoutes)

  app.use(version + '/posts', postRoutes)
}

export default routesV1
