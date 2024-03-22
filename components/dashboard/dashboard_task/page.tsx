import { getDocs, collection } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, ReactEventHandler } from "react";
import { Solution } from "@/types/solution";
import { db } from "@/config/db";

import styles from "./dashboard-task.module.css";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";

const DashBoardTask: React.FC = () => {
  const { user } = useAuth();
  const userId = user.uid;
  const [solutionsByTopic, setSolutionsByTopic] = useState<
    Record<string, Solution[]>
  >({});
  const [renderContent, setRenderContent] = useState<Solution[]>();
  const [showContent, setShowContent] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");

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

  const renderHandler = (topic: string) => {
    const solutionsForTopic = solutionsByTopic[topic] || [];
    setRenderContent(solutionsForTopic);
    setShowContent(!showContent);
    setSelectedTopic(topic);
  };

  // Difficulty Color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return styles.easy;
      case "Medium":
        return styles.medium;
      case "Hard":
        return styles.hard;
      default:
        return "";
    }
  };

  // Progress Color
  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "In Progress":
        return styles.in_progress;
      case "Completed":
        return styles.completed;
      default:
        return "";
    }
  };

  return (
    <>
      {showContent ? (
        <>
          <div
            className={styles.topic_task_selected_wrapper}
            onClick={() => renderHandler(selectedTopic)}
          >
            <p className={styles.topic_task_header}>{selectedTopic}</p>
            <RiArrowDropDownLine className={styles.topic_task_icon} />
          </div>
          <div className={styles.topic_task_short_details_body}>
            {renderContent &&
              renderContent.map((solution, index) => (
                <div key={index} className={styles.solution_short_details}>
                  <div
                    className={
                      styles.solution_short_details_number_name_wrapper
                    }
                  >
                    <p className={styles.solution_short_details_text}>
                      {solution.number}
                    </p>
                    <p className={styles.solution_short_details_name}>
                      {solution.name}
                    </p>
                  </div>
                  <p
                    className={`${
                      styles.solution_short_details_text
                    } ${getDifficultyColor(solution.difficulty)}`}
                  >
                    {solution.difficulty}
                  </p>
                  <div className={styles.solution_short_details_topics_wrapper}>
                    {solution.topic.map((topic) => (
                      <p className={styles.solution_short_details_topics}>
                        {topic}
                      </p>
                    ))}
                  </div>
                  <p className={`${styles.solution_short_details_text} ${getProgressColor(solution.progress)}`}>
                    {solution.progress}
                  </p>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className={styles.topic_tasks}>
          {Object.keys(solutionsByTopic).map((topic) => (
            <div
              key={topic}
              className={styles.topic_task_wrapper}
              onClick={() => renderHandler(topic)}
            >
              <p className={styles.topic_task_header}>{topic}</p>
              <RiArrowDropRightLine className={styles.topic_task_icon} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DashBoardTask;
