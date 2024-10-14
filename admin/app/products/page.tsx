import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import AuthenticatedLayout from '@/components/shared/AuthenticatedLayout';
import ProductsTable from '@/components/Products/ProductsTable';

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