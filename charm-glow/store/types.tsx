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
export interface OrderProduct {
    _id: string;
    quantity: number;
    total: number;
    price: number;
    title: string;
    productImage: string[];
}
export interface Order {
    _id: {
        $oid: string;
    };
    userId: string;
    customerId: string;
    paymentIntentId: string;
    products: OrderProduct[];
    subtotal: number;
    total: number;
    shipping: {
        address: {
            postal_code: string;
            line1: string;
            line2: string | null;
            city: string;
            state: string;
            country: string;
        };
        email: string;
        name: string;
        phone: string;
        tax_exempt: string;
        tax_ids: string[];
    };
    delivery_status: string;
    payment_status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface Analytics {
    customerCount: number,
    productCount: number,
    orderCount: number
}

export interface Cart {
    _id: string,
    quantity: number,
    total: number,
    price: number,
    title: string,
    productImage: string[],
}
