'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Users, Package, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();
    const { logout } = useAuth();
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: Home, href: '/admin/' },
        { name: 'Users', icon: Users, href: '/admin/users' },
        { name: 'Products', icon: Package, href: '/admin/products' },
        { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    ];

    return (
        <div className="bg-orange-600 text-white w-64 min-h-screen p-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-center">Commercify</h1>
            </div>
            <div className="border-b border-orange-700 mb-4" />
            <nav>
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center p-2 mb-2 rounded hover:bg-orange-700 ${pathname === item.href ? 'bg-orange-700' : ''
                            }`}
                    >
                        <item.icon className="mr-2" size={20} />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>
            <div className="absolute bottom-4">
                <button
                    onClick={() => logout()}
                    className="flex items-center p-2 rounded hover:bg-orange-700"
                >
                    <LogOut className="mr-2" size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}