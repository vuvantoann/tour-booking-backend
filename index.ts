import dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'
import * as database from './config/database'
import cors from 'cors'
import routesV1 from './api/v1/routes/client/index.route'
import routesV1Admin from './api/v1/routes/admin/index.route'
import cookieParser from 'cookie-parser'
import path from 'path'

database.connect()

const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser()) // để đọc cookie ở BE

// // Serve static uploads (public images)
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

routesV1(app)
routesV1Admin(app)
app.listen(port, () => {
  console.log('lắng nghe thành công ')
})
