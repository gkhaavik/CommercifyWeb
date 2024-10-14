export type Order = {
    orderId: string;
    userId: string;
    orderLines: OrderLine[];
    orderStatus: string; // new, processing, completed, cancelled
    createdAt: Date;
    updatedAt: Date;
};

export type OrderLine = {
    orderlineId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
};

export type Product = {
    productId: string;
    name: string;
    description: string;
    currency: string;
    unitPrice: number;
    stock: number;
};