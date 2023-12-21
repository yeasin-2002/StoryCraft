"use client";

import { BlogItem } from "@/components/BlogItem";
import { BlogResponse } from "@/types";
import { $fetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface blogWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const BlogWrapper = ({ ...rest }: blogWrapperProps) => {
  const { data } = useQuery({
    queryKey: ["homeBlogs"],
    queryFn: () => $fetch<BlogResponse>("/api/blogs"),
  });
  const allBlogs = data;

  return (
    <div {...rest}>
      <h2 className="text-3xl font-bold text-center text-gray-800 sm:text-4xl md:text-5xl">
        Blogs
      </h2>
      <div className="grid grid-cols-1 2xl:grid-cols-2  gap-4 p-2 my-20">
        {allBlogs?.data?.map((item) => {
          return <BlogItem key={item.id} data={item} />;
        })}

        {allBlogs?.data && allBlogs?.data?.length === 0 && (
          <div className="col-span-3 text-center">No Blogs Found</div>
        )}
      </div>
    </div>
  );
};
