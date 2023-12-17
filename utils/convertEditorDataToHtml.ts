"use client";


import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";

import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

export const convertEditorDataToHtml = (state: EditorState | undefined) => {
  if (!state) return "";
  return draftToHtml(convertToRaw(state.getCurrentContent()));
};

export const convertHtmlToEditorState = (data: string) => {
  if (!data) return;
  const convertedDesc = convertFromHTML(data);
  const initialState = ContentState?.createFromBlockArray(
    convertedDesc?.contentBlocks
  );
  return EditorState?.createWithContent(initialState);
};

export const convertHtmlToEditorState2 = (data: string) => {
  if (!data) return EditorState.createEmpty();

  const blocksFromHtml = htmlToDraft(data);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  return EditorState.createWithContent(contentState);
};