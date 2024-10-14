import React from 'react';
import { SystemOverview } from '@/types';

interface SystemOverviewCardProps {
    data: SystemOverview;
}

export default function SystemOverviewCard({ data }: SystemOverviewCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">System Overview</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="font-semibold">Total Users</p>
                    <p>{data.totalUsers}</p>
                </div>
                <div>
                    <p className="font-semibold">Active Users</p>
                    <p>{data.activeUsers}</p>
                </div>
                <div>
                    <p className="font-semibold">Total Orders</p>
                    <p>{data.totalOrders}</p>
                </div>
                <div>
                    <p className="font-semibold">Pending Orders</p>
                    <p>{data.pendingOrders}</p>
                </div>
                <div className="col-span-2">
                    <p className="font-semibold">Total Revenue</p>
                    <p>${data.totalRevenue.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}