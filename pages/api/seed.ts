// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDB } from '../../database';
import { Product } from '../../models';

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (process.env.NODE_ENV === 'production') {
        res.status(401).json({
            message: 'service not allowed',
        });
    }

    await db.connect()
    //! interact wicht mongo

    await Product.deleteMany()
    await Product.insertMany(seedDB.initialData.products)


    //! *****************
    await db.disconnect()


    res.status(200).json({
        message: 'OK data',
    });
}
