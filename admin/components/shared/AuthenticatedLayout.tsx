"use client";

import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return null; // or a loading spinner if needed
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}