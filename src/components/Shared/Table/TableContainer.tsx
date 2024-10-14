import React, { ReactNode } from 'react';

interface TableContainerProps {
    title: string;
    children: ReactNode;
}

export default function TableContainer({ title, children }: TableContainerProps) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-orange-500 text-white p-4">
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    );
}