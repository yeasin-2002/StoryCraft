import blogImg from "@/assets/defaults/Blogging.jpg";
import { Blog } from "@/types";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { EditAndDeleteBlog } from "./EditAndDeleteBlog";

interface OwnBlogProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  blog: Blog;
}

export const OwnBlog = ({ blog, ...rest }: OwnBlogProps) => {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full h-40 gap-x-2">
      <Image
        className="object-cover w-40 h-full rounded-t-lg   md:rounded-none md:rounded-s-lg"
        src={blog.imgUrl || blogImg}
        alt=""
        width={200}
        height={200}
      />
      <div className="w-full h-full">
        <div className="  leading-normal flex-1">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {blog.title}
          </h5>
          <div
            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
            dangerouslySetInnerHTML={{
              __html: blog.description.slice(0, 50),
            }}
          />
        </div>
      </div>
    </div>
  );
};
