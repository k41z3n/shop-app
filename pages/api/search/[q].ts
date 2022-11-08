import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces/products';


type Data =
    | { message: string }
    | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return searchProducts(req, res)

        // case 'POST':
        //     return postProducts(req, res)

        default:
            return res.status(400).json({ message: 'method not fount' })
    }

}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

     await db.connect()

    let { q = '' } = req.query
    
    
    try {
        
        if (q.length === 0) {
            await db.disconnect()
            return res.status(400).json({ message: "valor vacio search "  })
        }

        q = q.toString().toLowerCase()
        
        const products = await Product.find({ $text: { $search: q } })
            .select('title images price inStock slug -_id')
            .lean()

        await db.disconnect()

        return res.status(200).json(products)

    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: "error search "  })
    }

}

