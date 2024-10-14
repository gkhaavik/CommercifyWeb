import OrdersTable from "@/components/Orders/OrdersTable";
import AuthenticatedLayout from "@/components/shared/AuthenticatedLayout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

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