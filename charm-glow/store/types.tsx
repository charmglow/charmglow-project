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
    // Add other user properties here
}


