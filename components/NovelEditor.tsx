"use client";

import { Editor } from "novel";

interface NovelEditorProps {
  editorContent: string;
  setEditorContent: (content: string) => void;
}

export function NovelEditor({
  editorContent,
  setEditorContent,
}: NovelEditorProps) {
  return (
    <Editor
      defaultValue={editorContent}
      className="border border-gray-600 rounded-lg  m-2 p-2"
      onUpdate={(editor) => {
        const markdown = editor?.storage.markdown.getMarkdown();
        return setEditorContent(markdown);
      }}
    />
  );
}
