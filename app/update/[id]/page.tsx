"use client";

import {
  SingleBlogResponse,
  categoryResponse,
  postDataResponse,
} from "@/types";
import {
  $fetch,
  convertEditorDataToHtml,
  convertHtmlToEditorState2,
} from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";

import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toast from "react-hot-toast";

interface Props {
  params: {
    id: string;
  };
}
interface blogUpdate {
  title: string;
  description: string;
  categoriesId: string;
  location: string;
}

const Update = ({ params }: Props) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [img, setImg] = useState<File | string>("");
  const [setCategoryId, setSetCategoryId] = useState("");
  const [desc, setDesc] = useState<EditorState>();
  const [descHTML, setDescHTML] = useState("");

  const categoryData = useQuery({
    queryKey: ["categories"],
    queryFn: () => $fetch<categoryResponse>("/api/category"),
  });
  const BlogData = useQuery({
    queryKey: ["categories", params.id],
    queryFn: () => $fetch<SingleBlogResponse>(`/api/blogs/${params.id}  `),
  });

  // title, description, categoriesId, location
  const { mutateAsync } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: FormData) =>
      $fetch<postDataResponse>("/api/blogs", {
        method: "PATCH",
        body: data,
      }),
  });

  useEffect(() => {
    console.log("re rendered");
    if (BlogData.isSuccess) {
      setTitle(BlogData?.data?.data?.title!);
      setLocation(BlogData?.data?.data?.location!);
      setSetCategoryId(BlogData?.data?.data?.categoryId!);
      const convertedEditorState = convertHtmlToEditorState2(
        BlogData?.data?.data?.description!
      );

      setDesc(convertedEditorState);
    }
  }, [BlogData.data, BlogData.isSuccess]);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files![0]);
  };
  const editorStateHandler = (e: EditorState) => {
    const state = convertEditorDataToHtml(e);
    setDescHTML(state);
    setDesc(e)
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // title, desc, location, userId, categoryId
      formData.append("title", title!);
      formData.append("description", descHTML!);
      formData.append("location", location!);
      formData.append("categoryId", setCategoryId!);

      toast.loading("Updating  your Blog", { id: "postData" });
      const setData = await mutateAsync(formData);

      if (setData?.status == 200) {
        return toast.success("Successfully to updated Bog", { id: "postData" });
      }
      return toast.error("unable to updated Bog", { id: "postData" });
    } catch (error) {
      toast.error("Something went wrong", { id: "postData" });
    }
  };

  return (
    <form className="container" onSubmit={handleFormSubmit}>
      <div className="flex justify-end">
        <button className="btn btn-primary   ">Publish</button>
      </div>

      <div className="grid  grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4 items-center justify-center my-5">
        <input
          type="text"
          placeholder="Title"
          className="input-round"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="location"
          className="input-round"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          name="categories"
          id="categories"
          className="input-round"
          onChange={(e) => setSetCategoryId(e.target.value)}
        >
          {categoryData.isSuccess &&
            categoryData.data?.data?.map((item) => (
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
        editorState={desc!}
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
