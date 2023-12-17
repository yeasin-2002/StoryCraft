import blogImg from "@/assets/defaults/Blogging.jpg";
import { Blog } from "@/types";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { EditAndDeleteBlog } from "./EditAndDeleteBlog";

interface OwnBlogProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  blog: Blog;
}

export const OwnBlog = async ({ blog, ...rest }: OwnBlogProps) => {
  return (
    <div className="p-4 shadow-md h-40 flex gap-x-1 rounded-lg  ">
      <Image
        src={blog.imgUrl || blogImg}
        alt="blog image"
        width={200}
        height={200}
        className="h-full  object-cover rounded-md"
      />
      <div className="flex-1   flex flex-col justify-between p-2  ">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 ">{blog.title}</h3>
          <div
            className="mt-2 text-sm text-gray-600 "
            dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 100) }}
          />
        </div>
        <EditAndDeleteBlog
          blog={blog}
          className="flex items-center justify-end gap-x-2 "
          id={blog.id}
        />
      </div>
    </div>
  );
};
