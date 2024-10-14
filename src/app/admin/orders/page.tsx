import OrdersTable from "@/components/Admin/Orders/OrdersTable";
import AuthenticatedLayout from "@/components/Admin/Shared/AuthenticatedLayout";
import { ProtectedRoute } from "@/components/Admin/Shared/ProtectedRoute";

export default function Orders() {
    return (
        <ProtectedRoute>
            <AuthenticatedLayout>
                <h1 className="text-2xl font-bold mb-4">Orders</h1>
                <OrdersTable />
            </AuthenticatedLayout>
        </ProtectedRoute>
    );
}