"use client";

import React, { useEffect, useState } from 'react';
import SystemOverviewCard from '@/components/Dashboard/SystemOverviewCard';
import ServiceCard from '@/components/Dashboard/ServiceCard';
import { fetchServiceStatuses, fetchSystemOverview } from '@/lib/api';
import { ServiceStatus, SystemOverview } from '@/types';

export default function Dashboard() {
    const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([]);
    const [systemOverview, setSystemOverview] = useState<SystemOverview>();

    useEffect(() => {
        async function fetchData() {
            const serviceStatuses = await fetchServiceStatuses();
            const systemOverview = await fetchSystemOverview();

            setServiceStatuses(serviceStatuses);
            setSystemOverview(systemOverview);
        }

        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="md:col-span-2">
                    <SystemOverviewCard data={systemOverview ?? {
                        totalUsers: 0,
                        activeUsers: 0,
                        totalOrders: 0,
                        pendingOrders: 0,
                        totalRevenue: 0,
                    }} />
                </div>
                <div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/users" className="text-orange-500 hover:underline">Manage Users</a></li>
                            <li><a href="/products" className="text-orange-500 hover:underline">Manage Products</a></li>
                            <li><a href="/orders" className="text-orange-500 hover:underline">Manage Orders</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">Service Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceStatuses.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
}