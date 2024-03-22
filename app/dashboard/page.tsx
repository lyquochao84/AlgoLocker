"use client";
import ProtectedRoute from "@/components/protected-route/page";

import DashBoardNoTask from "@/components/dashboard/dashboard_no_task/page";
import DashBoardTask from "@/components/dashboard/dashboard_task/page";

import { getDocs, collection } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, ReactEventHandler } from "react";
import { Solution } from "@/types/solution";
import { db } from "@/config/db";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userId = user.uid;
  const [solutionsByTopic, setSolutionsByTopic] = useState<
    Record<string, Solution[]>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", userId, "solutions")
        );
        const fetchedSolutions: any[] = [];

        querySnapshot.forEach((doc) => {
          fetchedSolutions.push({ id: doc.id, ...doc.data() });
        });

        // Group solutions by topic
        const solutionsGroupedByTopic: Record<string, Solution[]> = {};

        fetchedSolutions.forEach((solution) => {
          solution.topic.forEach((topic: string) => {
            if (!solutionsGroupedByTopic[topic]) {
              solutionsGroupedByTopic[topic] = [];
            }
            solutionsGroupedByTopic[topic].push(solution);
          });
        });

        setSolutionsByTopic(solutionsGroupedByTopic);
      } catch (error: any) {
        console.error("Error fetching solutions:", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <ProtectedRoute>
      <>
        {Object.keys(solutionsByTopic).length === 0 ? (
          <DashBoardNoTask />
        ) : (
          <DashBoardTask solutionsByTopic={solutionsByTopic} />
        )}
      </>
    </ProtectedRoute>
  );
};

export default Dashboard;
