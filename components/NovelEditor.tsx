"use client";

import { cn } from "@/utils";
import { Editor } from "novel";
import { Dispatch } from "react";

interface NovelEditorProps {
  id: string;
  editorContent: string;
  setEditorContent: Dispatch<React.SetStateAction<string>>;
  setTextContent?: Dispatch<React.SetStateAction<string>>;

  className?: string;
  disableLocalStorage?: boolean;
}

export const NovelEditor = ({
  id,
  editorContent,
  setEditorContent,
  className,
  setTextContent,
  disableLocalStorage = false,
  ...rest
}: NovelEditorProps) => {
  return (
    <Editor
      {...rest}
      key={id}
      disableLocalStorage={disableLocalStorage}
      storageKey={id}
      defaultValue={""}
      className={cn(
        "border border-gray-600 rounded-md  w-full  min-h-full m-2 p-2",
        className
      )}
      onUpdate={(editor) => {
        const html = editor?.getHTML();
        const text = editor?.getText();

        html && setEditorContent(html);
        text && setTextContent && setTextContent(text);
      }}
    />
  );
};
