interface PaginationProps {
    currentPage: number;
    total: number;
    pageSize?: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    total,
    pageSize = 12,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className='pagination'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

