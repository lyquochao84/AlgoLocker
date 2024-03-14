"use client";

import styles from "./code-editor.module.css";

import { Editor } from "@monaco-editor/react";
import { CodeChange } from "@/types/code-editor";

const CodeEditor: React.FC<CodeChange> = ({
  selectedLanguages,
  handleEditorDidMount,
}) => {
  const editorLanguage =
    selectedLanguages === "C++" ? "cpp" : selectedLanguages.toLowerCase();
  return (
    <div className={styles.code_editor_wrapper}>
      <Editor
        height="310px"
        defaultLanguage={editorLanguage}
        theme="vs-light"
        defaultValue="// Write code here"
        onMount={handleEditorDidMount}
        className={styles.code_editor}
      />
    </div>
  );
};

export default CodeEditor;
