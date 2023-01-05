import { IGender, IUser } from './';

export interface IOrder {
    _id?: string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    paymentMethod?: string;
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    isPaid: boolean
    paidAt?: string
}

export interface IShippingAddress {
    firstName: string;
    lastName: string;
    direction: string;
    direction2?: string;
    code: string;
    city: string;
    phone: string;
}

export interface IOrderItem {
    _id: string
    title: string
    size: string
    quantity: number
    slug: string
    image: string
    gender: IGender
    price: number
}