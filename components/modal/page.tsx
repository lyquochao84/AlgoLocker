import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { addDoc, collection } from "@firebase/firestore";

import { programmingLanguages } from "@/constants/programming_languages";
import { topicOptions } from "@/constants/topics";
import { CloseModal } from "@/types/modal";
import { db } from "@/config/db";
import CodeEditor from "./code-editor/page";
import { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { EditorRef } from "@/types/code-editor";

import styles from "./modal.module.css";

import { IoCloseCircleOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";


const Modal: React.FC<CloseModal> = ({ onClose }) => {
  const { user } = useAuth();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedProgress, setSelectedProgress] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string>("");

  const [isDifficultyOpen, setIsDifficultyOpen] = useState<Boolean>(false);
  const [isProgressOpen, setIsProgressOpen] = useState<Boolean>(false);
  const [isLanguagesOpen, setIsLanguagesOpen] = useState<Boolean>(false);

  // Handle Modal Submission
  const problemNumberRef = useRef<HTMLInputElement>(null);
  const problemNameRef = useRef<HTMLInputElement>(null);
  const problemDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const timeComplexityRef = useRef<HTMLInputElement>(null);
  const spaceComplexityRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<EditorRef | null>(null);
  const explanationRef = useRef<HTMLTextAreaElement>(null);
  const programmingLanguagesRef = useRef<HTMLDivElement>(null);
  const difficultyRef = useRef<HTMLDivElement>(null);
  const relatedLinksRef = useRef<HTMLTextAreaElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

  // Programming Languages Bar
  const toggleLanguages = () => {
    setIsLanguagesOpen(!isLanguagesOpen);
  };

  const languagesHandler = (language: string) => {
    setSelectedLanguages(language);
  };

  // Code Editor Part
  const handleEditorDidMount: OnMount = (editor: editor.IStandaloneCodeEditor) => {
    codeRef.current = editor;
  }

  // Submit Modal
  const submitModalHandler = async (event: React.FormEvent) => {
    const userId = user.uid;
    // Access values from refs
    const problemNumber = problemNumberRef.current?.value || "";
    const problemName = problemNameRef.current?.value || "";
    const problemDescription = problemDescriptionRef.current?.value || "";
    const timeComplexity = timeComplexityRef.current?.value || "";
    const spaceComplexity = spaceComplexityRef.current?.value || "";
    const code = codeRef.current?.getValue();
    const explanation = explanationRef.current?.value || "";
    const topics = selectedTopics.map((topic) => topic);
    const programmingLanguages = programmingLanguagesRef.current?.textContent || "";
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
      programming_languages: programmingLanguages,
      difficulty: difficulty,
      relatedLinks: relatedLinks,
      progress: progress,
    };

    try {
      event.preventDefault();
      const docRef = await addDoc(collection(db, "users", userId, "solutions"), newSolution);
      onClose();
      window.location.reload();
    } 
    catch (error: any) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitModalHandler} className={styles.backdrop}>
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
            type="text"
            id="problemNumber"
            name="problemNumber"
            className={styles.inputField}
            ref={problemNumberRef}
            required
            />
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
            ref={problemNameRef}
            required
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
            ref={problemDescriptionRef}
            required
          ></textarea>
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
            ref={timeComplexityRef}
            required
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
            ref={spaceComplexityRef}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="programmingLanguages">
            Programming Languages:
          </label>
          <div
            className={styles.programming_languages_select_field}
            onClick={toggleLanguages}
            ref={programmingLanguagesRef}
          >
            <RiArrowDropDownLine className={styles.select_field_icon} />
            <p className={styles.select_field_chosen_text}>
              {!selectedLanguages ? "C++" : selectedLanguages}
            </p>
            {isLanguagesOpen && (
              <ul className={styles.programming_languages_select_field_wrapper}>
                {programmingLanguages.map((language) => (
                  <li
                    key={language}
                    onClick={() => languagesHandler(language)}
                    className={styles.programming_languages_select_field_item}
                  >
                    {language}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="code">
            Code:
          </label>
          <CodeEditor selectedLanguages={selectedLanguages} handleEditorDidMount={handleEditorDidMount}/>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="explanation">
            Explanation:
          </label>
          <textarea
            id="explanation"
            name="explanation"
            className={styles.textareaField}
            ref={explanationRef}
            required
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
            required
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

        <div>
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

        <div className={`${styles.formGroup} ${styles.difficulty_wrapper}`}>
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
          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Modal;
