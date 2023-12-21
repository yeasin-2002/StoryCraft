"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { EditAndPreview } from "@/components/EditAndPreview";
import { ImagePreviewer } from "@/components/ImagePreviewer";
import {
  SingleBlogResponse,
  categoryResponse,
  postDataResponse,
} from "@/types";
import { $fetch } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

const Update = ({ params }: Props) => {
  const [image, setImage] = useState<null | File>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const SessionData = useSession();

  const categoryData = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("/api/category").then(
        (res) => res.json() as Promise<categoryResponse>
      ),
  });
  const currentBlogData = useQuery({
    queryKey: ["currentBlog", params?.id],
    queryFn: () =>
      $fetch(`/api/blogs/${params?.id}`) as Promise<SingleBlogResponse>,
  });
  console.log(
    "🚀 ~ file: page.tsx:42 ~ Update ~ currentBlogData:",
    currentBlogData?.data?.data
  );

  const { mutateAsync } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: FormData) => {
      const req = await fetch("/api/blogs", {
        method: "POST",
        body: data,
      });
      const res = (await req.json()) as Promise<postDataResponse>;
      return res;
    },
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const postData = JSON.stringify({
        title,
        location,
        desc: description,
        categoryId: categories,
        userEmail: SessionData.data?.user.email,
      });

      formData.append("postData", postData);
      formData.append("image", image!);
      toast.loading("publishing your post", { id: "postData" });

      const setData = await mutateAsync(formData);
      if (setData?.status == 200) {
        setImage(null);
        setTitle("");
        setLocation("");
        setCategories("");
        setDescription("");

        return toast.success("Successfully to create post", {
          id: "postData",
        });
      }
      return toast.error("unable to create post", { id: "postData" });
    } catch (error) {
      toast.error("Something went wrong", { id: "postData" });
    }
  };
  return (
    <form className="container" onSubmit={handleFormSubmit}>
      <div className="flex justify-between items-center my-3">
        <span></span>
        <button className="btn btn-primary ">Publish</button>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4 items-center justify-center">
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
          onChange={(e) => {
            console.log(e.target.value);
            setCategories(e.target.value);
          }}
        >
          {categoryData.isSuccess &&
            categoryData?.data?.data?.map((item) => (
              <option
                key={item.id}
                value={item.id}
                className="hover:bg-gray-100 py-2 px-4 input-round"
              >
                {item.name}
              </option>
            ))}
        </select>
        <ImagePreviewer img={image} setImage={setImage} />
      </div>

      <EditAndPreview
        id="write"
        editorContent={description}
        setEditorContent={setDescription}
      />
    </form>
  );
};

export default Update;
