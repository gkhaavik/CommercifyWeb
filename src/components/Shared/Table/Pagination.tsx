import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-orange-500 text-white rounded-l-md disabled:bg-orange-300"
            >
                Previous
            </button>
            <span className="px-4 py-2 bg-orange-100">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-orange-500 text-white rounded-r-md disabled:bg-orange-300"
            >
                Next
            </button>
        </div>
    );
}