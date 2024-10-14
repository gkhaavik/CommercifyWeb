"use client";

import React, { } from 'react';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import AuthenticatedLayout from '@/components/shared/AuthenticatedLayout';
import UsersTable from '@/components/Users/UsersTable';

export default function Users() {
    return (
        <ProtectedRoute>
            <AuthenticatedLayout>
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <UsersTable />
            </AuthenticatedLayout>
        </ProtectedRoute>
    );
}