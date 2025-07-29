import { Express } from 'express'
import { tourRoutes } from './tour.route'
import { postRoutes } from './post.route'
import { categoryRoutes } from './category.route'

const routesV1 = (app: Express) => {
  const version = '/api/v1'

  app.use(version + '/tours', tourRoutes)

  app.use(version + '/posts', postRoutes)

  app.use(version + '/categories', categoryRoutes)
}

export default routesV1
