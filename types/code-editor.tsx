import { OnMount } from "@monaco-editor/react";

export interface EditorRef {
  getValue(): string;
}

export interface CodeChange {
  handleEditorDidMount: OnMount;
}
