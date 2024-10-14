import React from 'react';
import { ServiceStatus } from '@/types';

interface ServiceCardProps {
    service: ServiceStatus;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const getStatusColor = (status: ServiceStatus['status']) => {
        switch (status) {
            case 'up':
                return 'bg-green-500';
            case 'down':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-500';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <span className={`px-2 py-1 rounded-full text-white text-sm ${getStatusColor(service.status)}`}>
                    {service.status}
                </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Uptime: {service.uptime}</p>
            <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                    <p className="font-semibold">CPU</p>
                    <p>{service.cpu}%</p>
                </div>
                <div>
                    <p className="font-semibold">Memory</p>
                    <p>{service.memory}%</p>
                </div>
                <div>
                    <p className="font-semibold">Requests</p>
                    <p>{service.requests}/min</p>
                </div>
            </div>
        </div>
    );
}