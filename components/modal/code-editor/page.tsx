"use client";

import styles from './code-editor.module.css';

import { Editor } from "@monaco-editor/react";
import { CodeChange } from '@/types/code-editor';

const CodeEditor: React.FC<CodeChange> = ({ handleEditorDidMount }) => {
  return (
    <div className={styles.code_editor_wrapper}>
      <Editor
        height="310px"
        defaultLanguage="java"
        theme="vs-dark"
        defaultValue="//Write code here"
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
