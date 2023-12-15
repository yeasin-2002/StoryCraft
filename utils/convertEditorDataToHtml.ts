"use client";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const convertEditorDataToHtml = (state: EditorState | undefined) => {
  if (!state) return "";
  return draftToHtml(convertToRaw(state.getCurrentContent()));
};
