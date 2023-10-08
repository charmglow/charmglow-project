// types.ts
export interface ShippingAddress {
    street: string;
    city: string;
    country: string;
    state: string;
}

export interface User {
    msgStatus: string;
    token: string;
    shippingAddress: ShippingAddress;
    _id: string;
    name: string;
    username: string;
    email: string;
    __v: number;
    isAdmin: boolean
    // Add other user properties here
}

export interface Product {
    _id: string,
    title: string,
    price: number,
    category: string,
    productImage?: string,
    createdAt?: string,
    __v?: number
}