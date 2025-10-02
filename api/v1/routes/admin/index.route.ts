import { Express } from 'express'
import { tourRoutes } from './tour.route'
import { categoryRoutes } from './category.route'
import { authRoutes } from './auth.route'
import * as authMiddleware from '../../middlewares/auth.middleware'
import { uploadImageRoutes } from './image.route'
import { topicRoutes } from './topic.route'
import { postRoutes } from './post.route'

const routesV1Admin = (app: Express) => {
  const version = '/api/v1/admin'

  app.use(version + '/tours', authMiddleware.requireAuth, tourRoutes)

  app.use(version + '/categories', authMiddleware.requireAuth, categoryRoutes)

  app.use(version + '/auth', authRoutes)

  app.use(version + '/images', authMiddleware.requireAuth, uploadImageRoutes)

  app.use(version + '/topics', authMiddleware.requireAuth, topicRoutes)

  app.use(version + '/posts', authMiddleware.requireAuth, postRoutes)
}

export default routesV1Admin
