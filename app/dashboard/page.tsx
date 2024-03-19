'use client';
import ProtectedRoute from "@/components/protected-route/page";

import DashBoardNoTask from "@/components/dashboard/dashboard_no_task/page";
import DashBoardTask from "@/components/dashboard/dashboard_task/page";

const Dashboard: React.FC = () => {

  return (
    <ProtectedRoute>
      {/* <DashBoardNoTask /> */}
      <DashBoardTask />
    </ProtectedRoute>
  );
};

export default Dashboard;
