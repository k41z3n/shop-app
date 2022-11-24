// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDB } from '../../database';
import { Product ,User} from '../../models';

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
    console.log('START SEED');
    console.log('SEED USERS');
    await User.deleteMany()
    await User.insertMany(seedDB.initialData.users)
    
    console.log('SEED PRODUCTS');
    await Product.deleteMany()
    await Product.insertMany(seedDB.initialData.products)
    
    console.log('END SEED');

    //! *****************
    await db.disconnect()


    res.status(200).json({
        message: 'OK data',
    });
}
