'use client';
import ProtectedRoute from "@/components/protected-route/page";

import DashBoardNoTask from "@/components/dashboard/dashboard_no_task/page";

const Dashboard: React.FC = () => {

  return (
    <ProtectedRoute>
      <DashBoardNoTask />
    </ProtectedRoute>
  );
};

export default Dashboard;
