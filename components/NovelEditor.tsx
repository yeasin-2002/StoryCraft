"use client";

import { cn } from "@/utils";
import { Editor } from "novel";
import { Dispatch } from "react";

interface NovelEditorProps {
  id: string;
  editorContent: string;
  setEditorContent: Dispatch<React.SetStateAction<string>>;
  className?: string;
  disableLocalStorage?: boolean;
}

export const NovelEditor = ({
  id,
  editorContent,
  setEditorContent,
  className,
  disableLocalStorage = false,
  ...rest
}: NovelEditorProps) => {
  return (
    <Editor
      {...rest}
      key={id}
      disableLocalStorage={disableLocalStorage}
      storageKey={id}
      defaultValue={editorContent}
      className={cn(
        "border border-gray-600 rounded-md  w-full  min-h-full m-2 p-2",
        className
      )}
      onUpdate={async (editor) => {
        const html = editor?.getHTML();
        html && setEditorContent(html);
      }}
    />
  );
};
