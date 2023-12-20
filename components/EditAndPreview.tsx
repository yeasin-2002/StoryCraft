"use client";

import { cn } from "@/utils";
import { DetailedHTMLProps, Dispatch, HTMLAttributes, useState } from "react";
import { MarkdownAsHtml } from "./MarkdownAsHtml";
import { NovelEditor } from "./NovelEditor";
import { Toggle } from "./Toggle";

interface EditAndPreviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  editorContent: string;
  setEditorContent: Dispatch<React.SetStateAction<string>>;
}

export const EditAndPreview = ({
  id,
  editorContent,
  setEditorContent,
  ...rest
}: EditAndPreviewProps) => {
  const [isHidePreview, setIsHidePreview] = useState(false);

  return (
    <div className="mt-10 transition-all ">
      <Toggle
        toggleValue={isHidePreview}
        setToggleValue={setIsHidePreview}
        labelClassName="text-end"
        text={`${isHidePreview ? "Hide" : "Show"} Preview`}
      />
      <div
        className={cn("md:grid block space-y-4   gap-x-4", {
          "grid-cols-1": !isHidePreview,
          "grid-cols-2": isHidePreview,
        })}
        {...rest}
      >
        <NovelEditor
          id={id}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
        />
        {isHidePreview && (
          <div>
            <p className="font-medium text-xl mb-10 mt-5">Preview</p>
            <MarkdownAsHtml content={editorContent} />
          </div>
        )}
      </div>
    </div>
  );
};
