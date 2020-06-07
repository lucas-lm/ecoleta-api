import { Request, Response } from 'express'
import connection from '../database/connection'

class ItemController {
  async index(req: Request, res: Response) {
    const items = await connection('items').select('*')
    const host = req.get('Host')
    const serializedItems = items.map((item) => ({
      ...item,
      image_url: `${host}/static/${item.image}`,
    }))
    return res.json(serializedItems)
  }
}

export default new ItemController()
