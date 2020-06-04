import { Request, Response } from 'express'
import connection from '../database/connection'

class PointController {
  async create(req: Request, res: Response) {
    const data = req.body
    const { items, ...rest } = data

    const trx = await connection.transaction()

    const [point_id] = await trx('points').insert({
      image: 'fake-image',
      ...rest,
    })

    const pointsItems = items.map((item_id: number) => ({ item_id, point_id }))

    await trx('point_items').insert(pointsItems)

    return res.sendStatus(204)
  }
}

export default new PointController()
