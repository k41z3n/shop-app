import { IProduct } from '../interfaces'
import { Product } from '../models'
import { db } from '.'

export const getProductBySlug = async (slug: string):Promise<IProduct | null> => {
    db.connect()
    const product = await Product.findOne({slug}).lean()
    db.disconnect()

    if (!product) return null
    

    return JSON.parse(JSON.stringify(product))
}

interface ProductSlug {
    slug:string
}

export const getAllProductSlug = async ():Promise<ProductSlug[]> => {
    await db.connect()

    const slugs = await Product.find().select('slug -_id').lean()

    await db.disconnect()

    return slugs
}

export const getProductsByTerm = async (term:string):Promise<ProductSlug[]> => {
    await db.connect()

    const product = await Product
        .find({
            $text:{$search:term}
        })
        .select('title images price inStock slug -_id')
        .lean()

    await db.disconnect()

    return product
}


export const getAllProducts = async (): Promise<IProduct[]> => {
    
    await db.connect()

    const products = await Product.find({}).lean()

    await db.disconnect()
    
    return JSON.parse(JSON.stringify(products))
    
}