import { User, Product, Order, OrderDetails } from "@/types";
import { ServiceStatus, SystemOverview } from '@/types';
import axios from "axios";

const ordersApiUri = process.env.NEXT_PUBLIC_ORDERS_API_URL;
const productsApiUri = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;
const usersApiUri = process.env.NEXT_PUBLIC_USERS_API_URL;

export async function fetchUsers(page: number): Promise<{ users: User[], totalPages: number }> {
    page = page - 1;

    try {
        const response = await axios.get(`${usersApiUri}/users`, {
            params: {
                page
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const users = response.data._embedded?.userDTOes ?? [];
        const totalPages = users.length ? response.data.page.totalPages : 1;

        return { users, totalPages };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch users');
    }
}

export async function fetchProducts(page: number): Promise<{ products: Product[], totalPages: number }> {
    page = page - 1;

    try {
        const response = await axios.get(`${productsApiUri}/products`, {
            params: {
                page
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const products = response.data._embedded?.productDTOes ?? [];
        const totalPages = products.length ? response.data.page.totalPages : 1;

        return { products, totalPages };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch products');
    }
}

export async function fetchOrders(page: number): Promise<{ orders: Order[], totalPages: number }> {
    page = page - 1;

    try {
        const response = await axios.get(`${ordersApiUri}/orders`, {
            params: {
                page
            },
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

export async function fetchServiceStatuses(): Promise<ServiceStatus[]> {
    return [
        {
            id: '1',
            name: 'User Service',
            status: 'up',
            uptime: '99.9%',
            cpu: 25,
            memory: 60,
            requests: 1000
        },
        {
            id: '2',
            name: 'Product Service',
            status: 'up',
            uptime: '99.8%',
            cpu: 30,
            memory: 70,
            requests: 1500
        },
        {
            id: '3',
            name: 'Order Service',
            status: 'warning',
            uptime: '99.5%',
            cpu: 80,
            memory: 85,
            requests: 2000
        },
        // Add more services as needed
    ];
}

export async function fetchSystemOverview(): Promise<SystemOverview> {
    // Implement API call to fetch system overview
    // This is a placeholder implementation
    return {
        totalUsers: 10000,
        activeUsers: 2500,
        totalOrders: 5000,
        pendingOrders: 150,
        totalRevenue: 500000
    };
}

interface AuthLoginResponse {
    token: string;
    user: User;
}

export async function loginUser(email: string, password: string): Promise<AuthLoginResponse> {
    try {
        const response = await axios.post(`${usersApiUri}/auth/signin`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Login failed');
    }
}

export async function authorizeUser(token: string): Promise<User> {
    try {
        const response = await axios.get(`${usersApiUri}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Authorization failed');
    }
}