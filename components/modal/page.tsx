import { useState, useRef } from "react";

import { topicOptions } from "@/constants/topics";
import { CloseModal } from "@/types/modal";
import { db } from "@/config/db";

import styles from "./modal.module.css";

import { IoCloseCircleOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import { addDoc, doc, setDoc } from "@firebase/firestore";

const Modal: React.FC<CloseModal> = ({ onClose }) => {
  const { user } = useAuth();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedProgress, setSelectedProgress] = useState<string>("");
  const [isDifficultyOpen, setIsDifficultyOpen] = useState<Boolean>(false);
  const [isProgressOpen, setIsProgressOpen] = useState<Boolean>(false);
  // Handle Modal Submission
  const problemNumberRef = useRef<HTMLInputElement>(null); // Input
  const problemNameRef = useRef<HTMLInputElement>(null); // Input
  const problemDescriptionRef = useRef<HTMLTextAreaElement>(null); // Input
  const timeComplexityRef = useRef<HTMLInputElement>(null); // Input
  const spaceComplexityRef = useRef<HTMLInputElement>(null); // Input
  const codeRef = useRef<HTMLTextAreaElement>(null); // Input
  const explanationRef = useRef<HTMLTextAreaElement>(null); // Input
  const difficultyRef = useRef<HTMLDivElement>(null); // Select Array
  const relatedLinksRef = useRef<HTMLTextAreaElement>(null); // Input
  const progressRef = useRef<HTMLDivElement>(null); // Select Array

  // Select Topics
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedTopics.includes(e.target.value) && selectedTopics.length < 3) {
      setSelectedTopics([...selectedTopics, e.target.value]);
    }
  };

  // Remove Selected Topics
  const handleRemoveTopic = (selectedTopic: string) => {
    // Remove the selected topic from the array
    const updatedTopics = selectedTopics.filter(
      (topic) => topic !== selectedTopic
    );
    setSelectedTopics(updatedTopics);
  };

  //Difficulty Bar
  const toggleDifficulty = () => {
    setIsDifficultyOpen(!isDifficultyOpen);
  };

  const difficultyHandler = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  // Progress Bar
  const toggleProgress = () => {
    setIsProgressOpen(!isProgressOpen);
  };

  const progressHandler = (progress: string) => {
    setSelectedProgress(progress);
  };

  // Submit Modal
  const submitModalHandler = () => {
    const userId = user.uid;
    // Access values from refs
    const problemNumber = problemNumberRef.current?.value || "";
    const problemName = problemNameRef.current?.value || "";
    const problemDescription = problemDescriptionRef.current?.value || "";
    const timeComplexity = timeComplexityRef.current?.value || "";
    const spaceComplexity = spaceComplexityRef.current?.value || "";
    const code = codeRef.current?.value || "";
    const explanation = explanationRef.current?.value || "";
    const topics = selectedTopics.map((topic) => topic);
    const difficulty = difficultyRef.current?.textContent || "";
    const relatedLinks = relatedLinksRef.current?.value || "";
    const progress = progressRef.current?.textContent || "";

    const newSolution = {
      number: problemNumber,
      name: problemName,
      description: problemDescription,
      time_complexity: timeComplexity,
      space_complexity: spaceComplexity,
      code: code,
      explanation: explanation,
      topic: topics,
      difficulty: difficulty,
      relatedLinks: relatedLinks,
      progress: progress
    }

    try {
      const userRef = setDoc(doc(db, "solutions", userId), newSolution);
      // Close the modal after successful submission
      onClose();
    }
    catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span className={styles.modalHeader_text}>Create Solution</span>
          <IoCloseCircleOutline
            className={styles.modalCloseIcon}
            onClick={onClose}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="problemNumber">
            Problem Number:
          </label>
          <input
            required
            type="text"
            id="problemNumber"
            name="problemNumber"
            className={styles.inputField}
            ref={problemNumberRef}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="problemName">
            Problem Name:
          </label>
          <input
            required
            type="text"
            id="problemName"
            name="problemName"
            className={styles.inputField}
            ref={problemNameRef}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="problemDescription">
            Problem Description:
          </label>
          <textarea
            required
            id="problemDescription"
            name="problemDescription"
            className={styles.textareaField}
            ref={problemDescriptionRef}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="timeComplexity">
            Time Complexity:
          </label>
          <input
            required
            type="text"
            id="timeComplexity"
            name="timeComplexity"
            className={styles.inputField}
            ref={timeComplexityRef}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="spaceComplexity">
            Space Complexity:
          </label>
          <input
            required
            type="text"
            id="spaceComplexity"
            name="spaceComplexity"
            className={styles.inputField}
            ref={spaceComplexityRef}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="code">
            Code:
          </label>
          <textarea
            required
            id="code"
            name="code"
            className={styles.textareaField}
            ref={codeRef}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="explanation">
            Explanation:
          </label>
          <textarea
            required
            id="explanation"
            name="explanation"
            className={styles.textareaField}
            ref={explanationRef}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="topic">
            Topic:{" "}
            <span className={styles.three_topics_text}>
              Choose up to 3 topics
            </span>
          </label>
          <select
            id="topic"
            name="topic"
            className={styles.selectField}
            onChange={handleTopicChange}
            multiple
            value={selectedTopics}
          >
            {topicOptions.map((topic) => (
              <option
                key={topic}
                value={topic}
                className={styles.topic_options}
              >
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <ul className={styles.selected_topics_wrapper}>
            {selectedTopics.map((selectedTopic) => (
              <li key={selectedTopic} className={styles.selected_topic}>
                <span className={styles.selected_topic_text}>
                  {selectedTopic}
                </span>
                <IoCloseCircleOutline
                  className={styles.selected_topic_remove_icon}
                  onClick={() => handleRemoveTopic(selectedTopic)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="difficulty">
            Difficulty:
          </label>
          <div
            className={styles.difficulty_select_field}
            onClick={toggleDifficulty}
            ref={difficultyRef}
          >
            <RiArrowDropDownLine className={styles.select_field_icon} />
            <p className={styles.select_field_chosen_text}>
              {!selectedDifficulty ? "Easy" : selectedDifficulty}
            </p>
            {isDifficultyOpen && (
              <ul className={styles.difficulty_select_field_wrapper}>
                <li
                  className={styles.difficulty_select_field_item}
                  onClick={() => difficultyHandler("Easy")}
                >
                  Easy
                </li>
                <li
                  className={styles.difficulty_select_field_item}
                  onClick={() => difficultyHandler("Medium")}
                >
                  Medium
                </li>
                <li
                  className={styles.difficulty_select_field_item}
                  onClick={() => difficultyHandler("Hard")}
                >
                  Hard
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="relatedLink">
            Related Link:
          </label>
          <textarea
            id="relatedLink"
            name="relatedLink"
            className={styles.textareaField}
            ref={relatedLinksRef}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="progress">
            Progress:
          </label>
          <div
            className={styles.progress_select_field}
            onClick={toggleProgress}
            ref={progressRef}
          >
            <RiArrowDropDownLine className={styles.select_field_icon} />
            <p className={styles.select_field_chosen_text}>
              {!selectedProgress ? "In Progress" : selectedProgress}
            </p>
            {isProgressOpen && (
              <ul className={styles.progress_select_field_wrapper}>
                <li
                  className={styles.progress_select_field_item}
                  onClick={() => progressHandler("In Progress")}
                >
                  In Progress
                </li>
                <li
                  className={styles.progress_select_field_item}
                  onClick={() => progressHandler("Completed")}
                >
                  Completed
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button className={styles.btn} onClick={submitModalHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
