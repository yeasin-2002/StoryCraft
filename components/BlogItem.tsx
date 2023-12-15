"use client";
import defaultBlogImg from "@/assets/defaults/Blogging.jpg";
import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface BlogItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: Blog;
}

export const BlogItem = ({ data, ...rest }: BlogItemProps) => {
  return (
    <div
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
      <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>

      <Link
        className="btn-primary float-right mt-5 px-4 py-2 rounded-md "
        href={`/blog/${data.id}`}
      >
        Details
      </Link>
    </div>
  );
};
