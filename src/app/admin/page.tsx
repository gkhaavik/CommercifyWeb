import Dashboard from "@/components/Admin/Dashboard/Dashboard";
import AuthenticatedLayout from "@/components/Admin/Shared/AuthenticatedLayout";
import { ProtectedRoute } from "@/components/Admin/Shared/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <Dashboard />
      </AuthenticatedLayout>
    </ProtectedRoute>
  );
}