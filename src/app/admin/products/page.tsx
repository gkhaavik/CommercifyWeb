import { ProtectedRoute } from '@/components/Admin/Shared/ProtectedRoute';
import AuthenticatedLayout from '@/components/Admin/Shared/AuthenticatedLayout';
import ProductsTable from '@/components/Admin/Products/ProductsTable';

export default function Products() {
    return (
        <ProtectedRoute>
            <AuthenticatedLayout>
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <ProductsTable />
            </AuthenticatedLayout>
        </ProtectedRoute>
    );
}