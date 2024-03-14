"use client";

import styles from './code-editor.module.css';

import { Editor } from "@monaco-editor/react";
import { OnMount } from '@monaco-editor/react';

interface CodeChange {
  handleEditorDidMount: OnMount
}

const CodeEditor: React.FC<CodeChange> = ({ handleEditorDidMount }) => {
  return (
    <div className={styles.code_editor_wrapper}>
      <Editor
        height="280px"
        defaultLanguage="python"
        theme="Github"
        defaultValue="//Write code here"
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
