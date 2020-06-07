import express from 'express'
import upload from '../middlewares/upload'
import pointController from '../controllers/PointController'
import itemController from '../controllers/ItemController'
import { celebrate, Joi } from 'celebrate'

const routes = express.Router()

routes.post(
  '/points',
  upload.single('photo'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  pointController.create
)
routes.get('/points/:pointId', pointController.show)
routes.get('/points', pointController.index)
routes.get('/items', itemController.index)

export default routes
