'use client'

import { useAuth } from '@/context/AuthContext';

export default function Logout() {
    const { logout } = useAuth();

    return (
        <button onClick={logout} className="text-white bg-red-500 px-4 py-2 rounded">
            Logout
        </button>
    );
}