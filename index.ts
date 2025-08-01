import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import * as database from './config/database'
import cors from 'cors'
import routesV1 from './api/v1/routes/client/index.route'
import routesV1Admin from './api/v1/routes/admin/index.route'

dotenv.config()
database.connect()
const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.use(cors())
app.use(express.json()) // Thêm dòng này

routesV1(app)
routesV1Admin(app)
app.listen(port, () => {
  console.log('lắng nghe thành công ')
})
