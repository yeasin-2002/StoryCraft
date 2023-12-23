"use client";

import defaultUser from "@/assets/defaults/user.jpg";
import Image from "next/image";
import Link from "next/link";

import defaultBlogImg from "@/assets/defaults/Blogging.jpg";
import { Blog } from "@/types";
import { dateIntoReadableDate } from "@/utils";
interface BlogItemProps {
  data: Blog;
}

export const BlogItem = ({ data, ...rest }: BlogItemProps) => {
  const createdDate = dateIntoReadableDate(data.createAt);
  return (
    <Link
      href={`/blog/${data.id}`}
      {...rest}
      className="bg-gray-100 hover:bg-gray-200 shadow-md text-gray-700 p-2 rounded-md flex flex-row items-center gap-x-2 group hover:ring hover:ring-gray-400/40 m-1"
    >
      <Image
        src={data?.imgUrl || defaultBlogImg}
        alt="Picture of the author"
        className="rounded-md  aspect-square object-cover w-52 h-52 "
        width={1000}
        height={1000}
      />
      <div className="flex flex-col justify-between w-full h-full py-4">
        <div>
          <p className="text-gray-500">#{data?.categories?.name}</p>
          <h1 className=" font-medium  text-2xl group-hover:underline">
            {data?.title || "Blog Title"}
          </h1>

          <p className="my-2">{data?.description}.......</p>
        </div>
        <div className="flex items-center  justify-between">
          <div className="flex items-center gap-x-2">
            <Image
              src={data.User.profileUrl || defaultUser}
              alt="creators  profile Photo"
              width={50}
              height={50}
              className=" rounded-full size-8"
            />
            {data?.User?.name || "Author Name"}
          </div>
          <div>{createdDate}</div>
        </div>
      </div>
    </Link>
  );
};
