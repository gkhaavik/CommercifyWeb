import { CartItem, Order, OrderDetails } from "@/types";
import axios from "axios";

const ordersApiUri = process.env.NEXT_PUBLIC_ORDERS_API_URL;

export async function fetchOrders(page: number): Promise<{ orders: Order[], totalPages: number }> {
    page = page - 1;

    try {
        const response = await axios.get(`${ordersApiUri}/orders`, {
            params: { page },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const orders = response.data._embedded?.orderDTOes ?? [];
        const totalPages = orders.length ? response.data.page.totalPages : 1;

        return { orders, totalPages };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch orders');
    }
}

export async function fetchOrderDetails(orderId: number): Promise<OrderDetails> {
    try {
        const response = await axios.get(`${ordersApiUri}/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data.orderDetails as OrderDetails;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch order details');
    }
}

export async function createOrder(userId: string, cartItems: CartItem[]): Promise<Order> {
    try {
        const response = await axios.post(`${ordersApiUri}/orders`, { userId, cartItems }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        return response.data as Order;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create order');
    }
}