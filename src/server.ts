import express from 'express'
import path from 'path'
import routes from './routes'

const app = express()

app.use('/static', express.static(path.resolve(__dirname, 'assets')))
app.use(express.json())
app.use(routes)

app.listen(8080, () => {
  console.log('up and running')
})
