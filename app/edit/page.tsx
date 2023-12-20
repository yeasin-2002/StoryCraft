"use client";

import { NovelEditor } from "@/components/NovelEditor";
import { convertMarkdownToHtml } from "@/utils";
import Markdown from "markdown-to-jsx";
import { useState } from "react";

const Edit = () => {
  const [editorContent, setEditorContent] = useState("");

  return (
    <div>
      <NovelEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
      <hr className="my-10 " />
      {/* <div dangerouslySetInnerHTML={{ __html: editorContent }}></div> */}
      <Markdown
        options={{
          wrapper: "article",
          forceWrapper: true,
          forceBlock: true,
        }}
      >
        {editorContent}
      </Markdown>
    </div>
  );
};

export default Edit;
