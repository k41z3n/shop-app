import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces/products';


type Data =
    | { message: string }
    | IProduct[]
    | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res)

        // case 'POST':
        //     return postProducts(req, res)

        default:
            return res.status(400).json({ message: 'method not fount' })
    }

}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

     await db.connect()

    const { slug } = req.query

    try {
        const product = await Product.findOne({ slug }).lean()
        
        await db.disconnect()

        if (!product) {
            return res.status(200).json({ message: "product not found !!" })
        }

        return res.status(200).json(product!)

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(400).json({ message: "error product: "  })
    }

}

