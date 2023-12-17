import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useUpdateBlogState = create(
  immer(
    combine(
      {
        title: "",
        location: "",
        img: "",
        desc: "",
      },
      (set) => {
        return {
          setTitle: (title: string) => {
            set((state) => {
              state.title = title;
            });
          },
          setLocation : (location: string) => { 
            set((state) => { 
              state.location = location
             })
           }
        };
      }
    )
  )
);
