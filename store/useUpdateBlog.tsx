"use client";

import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useUpdateBlogState = create(
  immer(
    combine(
      {
        title: "",
        location: "",
        img: "" as string | File,
        desc: "",
        categoryId: "",
      },
      (set) => {
        return {
          setTitle: (title: string) => {
            set((state) => {
              state.title = title;
            });
          },
          setLocation: (location: string) => {
            set((state) => {
              state.location = location;
            });
          },
          setDesc: (desc: string) => {
            set((state) => {
              state.desc = desc;
            });
          },
          setImg: (img: File | string) => {
            set((state) => {
              state.img = img;
            });
          },
          setCategoryId: (cId: string) => {
            set((state) => {
              state.categoryId = cId;
            });
          },
        };
      }
    )
  )
);