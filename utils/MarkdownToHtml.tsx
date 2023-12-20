import { marked } from "marked";

export function convertMarkdownToHtml(markdown: string) {
  return marked(markdown);
}
