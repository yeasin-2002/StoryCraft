"use client";

import { useUpdateBlogState } from "@/store";
import { categoryResponse, postDataResponse } from "@/types";
import { Env, convertEditorDataToHtml } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, } from "react";

import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toast from "react-hot-toast";

const Update = () => {
  const updateState = useUpdateBlogState();

  const { data, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("/api/category").then(
        (res) => res.json() as Promise<categoryResponse>
      ),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: FormData) => {
      const req = await fetch(Env.BASE_URL +"/api/blogs", {
        method: "POST",
        body: data,
      });
      const res = (await req.json()) as Promise<postDataResponse>;
      return res;
    },
  });

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateState.setImg(e?.currentTarget?.files![0]);
  };
  const editorStateHandler = (e: EditorState) => {
    const state = convertEditorDataToHtml(e);
    updateState.setDesc(state);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // title, desc, location, userId, categoryId

      // formData.append("image", bgImage!);
      toast.loading("publishing your post", { id: "postData" });
      const setData = await mutateAsync(formData);

      if (setData?.status == 200) {
        return toast.success("Successfully to create post", { id: "postData" });
      }
      return toast.error("unable to create post", { id: "postData" });
    } catch (error) {
      toast.error("Something went wrong", { id: "postData" });
    }
  };
  console.table({
    title: updateState.title,
    desc: updateState.desc,
    location: updateState.location,
    img: updateState.img,
    categoryId: updateState.categoryId,
  });
  return (
    <form className="container" onSubmit={handleFormSubmit}>
      <div className="flex justify-between items-center">
        <p>Author </p>
        <button className="btn btn-primary ">Publish</button>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4 items-center justify-center">
        <input
          type="text"
          placeholder="Title"
          className="input-round"
          value={updateState.title}
          onChange={(e) => updateState.setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="location"
          className="input-round"
          value={updateState.location}
          onChange={(e) => updateState.setLocation(e.target.value)}
        />
        <select
          name="categories"
          id="categories"
          className="input-round"
          onChange={(e) => {
            console.log(e.target.value);
            updateState.setCategoryId(e.target.value);
          }}
        >
          {isSuccess &&
            data?.data?.map((item) => (
              <option
                key={item.id}
                value={item.id}
                className="hover:bg-gray-100 py-2 px-4 input-round"
              >
                {item.name}
              </option>
            ))}
        </select>
        <input
          type="file"
          placeholder="chose an image"
          className="   outline-none rounded-lg px-2"
          onChange={imageHandler}
        />
      </div>

      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={editorStateHandler}
        wrapperStyle={{
          border: "2px solid black",
          marginBottom: "20px",
          marginTop: "20px",
        }}
        editorStyle={{
          border: "0.5px solid black",
          padding: "0 10px",
          borderRadius: "2px",
          width: "100%",
          height: "200px",
        }}
      />
    </form>
  );
};

export default Update;
