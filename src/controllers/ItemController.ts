import { Request, Response } from 'express'
import connection from '../database/connection'

class ItemController {
  async index(req: Request, res: Response) {
    const items = await connection('items').select('*')
    const { BASE_URL } = process.env
    const serializedItems = items.map((item) => ({
      ...item,
      image_url: `${BASE_URL}/static/${item.image}`,
    }))
    return res.json(serializedItems)
  }
}

export default new ItemController()
