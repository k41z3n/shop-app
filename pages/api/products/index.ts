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
            return getProducts(req, res)

        // case 'POST':
        //     return postProducts(req, res)

        default:
            return res.status(400).json({ message: 'method not fount' })
    }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender = 'all' } = req.query

    // console.log(gender)

    const keyParams = {
        'kid': { gender: 'kid' },
        'men': { gender: 'men' },
        'women': { gender: 'women' },
        'unisex': { gender: 'unisex' },
    }

    const params = keyParams[gender as keyof typeof keyParams] || null

    // console.log(params)

    await db.connect()

    const products = await Product.find( params)
        .select('title images price inStock slug -_id')
        .lean()
        .sort({ createAt: 'ascending' })
    
    // console.log(products.length)

    await db.disconnect()

    res.status(200).json(products)

}

