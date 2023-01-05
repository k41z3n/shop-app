import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { Order, Product } from "../../../models";

import { IOrder } from "../../../interfaces";

type Data =
    | { message: string }
    | IOrder


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res)

        default:
            return res.status(400).json({ message: 'invalid method' })
    }

}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderItems, total } = req.body as IOrder

    const session: any = await getSession({ req })

    if (!session) return res.status(200).json({ message: 'Unautorized!!!' })

    const producsIds = orderItems.map(p => p._id)

    try {
        await db.connect()
        const dbProducts = await Product.find({ _id: { $in: producsIds } })

        const subTotal = orderItems.reduce((prev, current) => {

            const dbProductPrice = dbProducts.find(prod => prod.id === current._id)!.price
            if (!dbProductPrice) throw new Error("error price!!");

            return (dbProductPrice * current.quantity) + prev
        }, 0)


        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const backendTotal = subTotal * (taxRate + 1)

        if (total !== backendTotal) throw new Error("error total calc!!");


        const userId = session.user._id

        const newOrder = new Order({ ...req.body, isPaid: false, user: userId })

        await newOrder.save()

        return res.status(201).json(newOrder)

    } catch (error: any) {

        return res.status(400).json({ message: error.message || 'Error valid cart' })
    }
    finally {
        await db.disconnect()
    }



}