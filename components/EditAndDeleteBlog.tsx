"use client";

import { Blog, deleteBlogResponse } from "@/types";
import { Env } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "./icon";

interface EditAndDeleteBlogProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  blog: Blog;
}

export const EditAndDeleteBlog = ({
  blog,
  ...rest
}: EditAndDeleteBlogProps) => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deleteBlog"],
    mutationFn: async (id: string) => {
      const req = await fetch(Env.BASE_URL + `/api/blogs/${id}`, {
        method: "DELETE",
      });
      return (await req.json()) as deleteBlogResponse;
    },
    onSuccess: (deleteBlog) => {
      deleteBlog.status === 200
        ? toast.success("Blog Deleted Successfully", { id: "singleBlog" })
        : toast.error("unable to delete blog", { id: "singleBlog" });
    },
  });

  return (
    <div {...rest}>
      <Link href={`/update/${blog?.id}`}>
        <Pen className="cursor-pointer  bg-slate-300 rounded-full p-1" />
      </Link>
      <div
        className="cursor-pointer  bg-slate-900 hover:bg-slate-800 transition-all rounded-full p-1 text-gray-50   "
        onClick={async () => {
          toast.loading("Deleting a  Blog", {
            id: "singleBlog",
          });
          await mutateAsync(blog.id);
        }}
      >
        {isPending ? <LoadingSpinner /> : <Trash2 size={15} />}
      </div>
    </div>
  );
};
