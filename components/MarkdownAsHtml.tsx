import Markdown from "markdown-to-jsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface MarkdownAsHtmlProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  content: string;
}

export const MarkdownAsHtml = ({ content, ...rest }: MarkdownAsHtmlProps) => {
  return (
    <Markdown
      className="blogDetails"
      {...rest}
      options={{
        wrapper: "article",
        forceWrapper: true,
        forceBlock: true,
      }}
    >
      {content}
    </Markdown>
  );
};
