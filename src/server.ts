import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes'
import { errors } from 'celebrate'

const app = express()

app.use(cors())
app.use('/static', express.static(path.resolve(__dirname, 'assets')))
app.use(express.json())
app.use(routes)
app.use(errors())

const { PORT, NODE_ENV } = process.env
app.listen(PORT, () => {
  console.log(`Up and Running at port ${PORT} in ${NODE_ENV} mode`)
})
