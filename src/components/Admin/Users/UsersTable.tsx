"use client";

import React, { useEffect, useState } from 'react'
import TableContainer from '../../Shared/Table/TableContainer'
import Table, { Column } from '../../Shared/Table/Table'
import Pagination from '../../Shared/Table/Pagination'
import { User } from '@/types'
import { fetchUsers } from '@/lib/userApi'

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers(currentPage).then((data) => {
            setUsers(data.users);
            setTotalPages(data.totalPages);
        });
    }, [currentPage]);

    const columns: Column<User>[] = [
        { key: 'userId', header: 'ID' },
        { key: 'firstName', header: 'First Name' },
        { key: 'lastName', header: 'Last Name' },
        { key: 'email', header: 'Email' },
        {
            key: 'createdAt',
            header: 'Created At',
            render: (row) => new Date(row.createdAt).toLocaleDateString()
        },
    ];

    return (
        <div className="p-4" >
            <TableContainer title="Users">
                <Table columns={columns} data={users} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </TableContainer>
        </div >
    )
}