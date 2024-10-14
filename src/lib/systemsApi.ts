import { ServiceStatus, SystemOverview } from '@/types';

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
    ];
}

export async function fetchSystemOverview(): Promise<SystemOverview> {
    return {
        totalUsers: 10000,
        activeUsers: 2500,
        totalOrders: 5000,
        pendingOrders: 150,
        totalRevenue: 500000
    };
}