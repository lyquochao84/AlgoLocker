import { useState } from "react";

import { topicOptions } from "@/constants/topics";

import styles from "./modal.module.css";

import { IoCloseCircleOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";


interface CloseModal {
  onClose: () => void;
}

const Modal: React.FC<CloseModal> = ({ onClose }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedTopics.includes(e.target.value) && selectedTopics.length < 3) {
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

  const toggleDropDown = (e: any) => {
    if (e.target.value.classList.contains()) {

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
          ></textarea>
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
          />
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
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="topic">
            Topic: <span className={styles.three_topics_text}>Choose up to 3 topics</span>
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
          <div className={styles.difficulty_select_field} onClick={}>
            <RiArrowDropDownLine className={styles.select_field_icon}/>
            <ul className={styles.difficulty_select_field_wrapper}>
              <li className={styles.difficulty_select_field_item}>Easy</li>
              <li className={styles.difficulty_select_field_item}>Medium</li>
              <li className={styles.difficulty_select_field_item}>Hard</li>
            </ul>
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
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="progress">
            Progress:
          </label>
          <select id="progress" name="progress" className={styles.selectField}>
            <option value="in-progress" className={styles.topic_options}>
              In Progress
            </option>
            <option value="completed" className={styles.topic_options}>
              Completed
            </option>
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
