import { Request, Response } from 'express'
import connection from '../database/connection'

class PointController {
  async show(req: Request, res: Response) {
    const { pointId } = req.params
    const point = await connection('points').where('id', pointId).first()
    if (!point) return res.sendStatus(404)

    const items = await connection('items').join(
      'point_items',
      'items.id',
      '=',
      'point_items.item_id'
    )

    return res.json({ ...point, items: items.map((item) => item.title) })
  }

  async index(req: Request, res: Response) {
    const { city, uf, items: i } = req.query
    const items = String(i)
      .split(',')
      .map((item) => Number(item.trim()))

    const points = await connection('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', items)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    return res.json(points)
  }

  async create(req: Request, res: Response) {
    const data = req.body
    const { items, ...rest } = data // TODO: middleware to validate data and put on req.data

    const file = req.file as Express.MulterS3.File
    const { location: image } = file

    const trx = await connection.transaction()

    const [point_id] = await trx('points').insert({ image, ...rest })

    const pointItems = items
      .split(',')
      .map((item_id: string) => Number(item_id.trim()))
      .map((item_id: number) => ({
        item_id,
        point_id,
      }))

    await trx('point_items').insert(pointItems)
    await trx.commit()

    return res.sendStatus(201)
  }
}

export default new PointController()
