"use client";

import { NovelEditor } from "@/components/NovelEditor";
import { useState } from "react";

const Edit = () => {
  const [editorContent, setEditorContent] = useState("");

  return (
    <div>
      <NovelEditor
        id="edit"
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
      <hr className="my-10 " />
      <div dangerouslySetInnerHTML={{ __html: editorContent }}></div>
    </div>
  );
};

export default Edit;
