import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import * as database from './config/database'

import routesV1 from './api/v1/routes/index.route'

dotenv.config()
database.connect()
const app: Express = express()
const port: string | number = process.env.PORT || 3000

routesV1(app)

app.listen(port, () => {
  console.log('lắng nghe thành công ')
})
