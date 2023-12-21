"use client";
import defaultBlogImg from "@/assets/defaults/Blogging.jpg";
import { Blog } from "@/types";
import { Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogItemProps {
  data: Blog;
}

export const BlogItem = ({ data, ...rest }: BlogItemProps) => {
  return (
    <Link
      href={`/blog/${data.id}`}
      {...rest}
      className="bg-gray-100 hover:bg-gray-200 shadow-md text-gray-700 p-2 rounded-md"
    >
      <Image
        src={data?.imgUrl || defaultBlogImg}
        alt="Picture of the author"
        className="rounded-md w-full aspect-square object-cover "
        width={1000}
        height={1000}
      />

      <h1 className="my-5 font-medium  text-lg">
        {data?.title || "Blog Title"}
      </h1>
      <div className="flex items-center gap-x-2">
        <Pen size={15} />
        {data?.User?.name || "Author Name"}
      </div>
    </Link>
  );
};
