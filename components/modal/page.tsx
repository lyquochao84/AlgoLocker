import { IoCloseCircleOutline } from "react-icons/io5";
import { topicOptions } from "@/constants/topics";

import styles from "./modal.module.css";
import { useState } from "react";

interface CloseModal {
  onClose: () => void;
}

const Modal: React.FC<CloseModal> = ({ onClose }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedTopics.includes(e.target.value)) {
      setSelectedTopics([...selectedTopics, e.target.value]);
    }
  };

  const handleRemoveTopic = (selectedTopic: string) => {
    // Remove the selected topic from the array
    const updatedTopics = selectedTopics.filter(
      (topic) => topic !== selectedTopic
    );
    setSelectedTopics(updatedTopics);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          Create Solution
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
            type="text"
            id="problemNumber"
            name="problemNumber"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="problemDescription">
            Problem Description:
          </label>
          <textarea
            id="problemDescription"
            name="problemDescription"
            className={styles.textareaField}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="problemName">
            Problem Name:
          </label>
          <input
            type="text"
            id="problemName"
            name="problemName"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="timeComplexity">
            Time Complexity:
          </label>
          <input
            type="text"
            id="timeComplexity"
            name="timeComplexity"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="spaceComplexity">
            Space Complexity:
          </label>
          <input
            type="text"
            id="spaceComplexity"
            name="spaceComplexity"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="code">
            Code:
          </label>
          <textarea
            id="code"
            name="code"
            className={styles.textareaField}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="explanation">
            Explanation:
          </label>
          <textarea
            id="explanation"
            name="explanation"
            className={styles.textareaField}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="topic">
            Topic:
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
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <ul className={styles.selected_topics_wrapper}>
            {selectedTopics.map((selectedTopic) => (
              <li key={selectedTopic} className={styles.selected_topic}>
                <span className={styles.selected_topic_text}>{selectedTopic}</span>
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
          <select
            id="difficulty"
            name="difficulty"
            className={styles.selectField}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="relatedLink">
            Related Link:
          </label>
          <textarea
            id="relatedLink"
            name="relatedLink"
            className={styles.textareaField}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="progress">
            Progress:
          </label>
          <select id="progress" name="progress" className={styles.selectField}>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className={styles.btnContainer}>
          <button className={styles.btn}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
