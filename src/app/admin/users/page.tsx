"use client";

import React, { } from 'react';
import { ProtectedRoute } from '@/components/Admin/Shared/ProtectedRoute';
import AuthenticatedLayout from '@/components/Admin/Shared/AuthenticatedLayout';
import UsersTable from '@/components/Admin/Users/UsersTable';

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