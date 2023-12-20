"use client";

import { cn } from "@/utils";
import { Editor } from "novel";

interface NovelEditorProps {
  id: string;
  editorContent: string;
  setEditorContent: (content: string) => void;
  className?: string;
}

export const NovelEditor = ({
  id,
  editorContent,
  setEditorContent,
  className,
}: NovelEditorProps) => {
  return (
    <Editor
      key={id}
      storageKey={id}
      defaultValue={editorContent}
      className={cn(
        "border border-gray-600 rounded-md  w-full  min-h-full m-2 p-2",
        className
      )}
      onUpdate={(editor) => {
        const markdown = editor?.storage.markdown.getMarkdown();
        return setEditorContent(markdown);
      }}
    />
  );
};
