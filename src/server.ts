import express from 'express'
import path from 'path'
import routes from './routes'

const app = express()

app.use('/static', express.static(path.resolve(__dirname, 'assets')))
app.use(express.json())
app.use(routes)

const { PORT, NODE_ENV } = process.env
app.listen(PORT, () => {
  console.log(`Up and Running at port ${PORT} in ${NODE_ENV} mode`)
})
