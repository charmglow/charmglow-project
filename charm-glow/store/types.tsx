// types.ts
export interface ShippingAddress {
    street: string;
    city: string;
    country: string;
    state: string;
}

export interface User {
    message: string;
    token: string;
    shippingAddress: ShippingAddress;
    _id: string;
    name: string;
    username: string;
    email: string;
    __v: number;
}
export interface Admin {
    message: string;
    token: string;
    _id: string;
    name: string;
    email: string;
    __v: number;
}
export interface Product {
    _id: string,
    title: string,
    price: number,
    finalPrice: number,
    discount?: number,
    category: string,
    description: string,
    productImage: string[],
    createdAt?: string,
    __v?: number
}


export interface Analytics {
    customerCount: number,
    productCount: number,
}