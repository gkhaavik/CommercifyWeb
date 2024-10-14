import Dashboard from "@/components/Dashboard/Dashboard";
import AuthenticatedLayout from "@/components/shared/AuthenticatedLayout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <Dashboard />
      </AuthenticatedLayout>
    </ProtectedRoute>
  );
}