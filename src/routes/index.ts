import express from 'express'
import pointController from '../controllers/PointController'
import itemController from '../controllers/ItemController'

const routes = express.Router()

routes.post('/points', pointController.create)
routes.get('/items', itemController.index)

export default routes
