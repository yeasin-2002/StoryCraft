import { BlogItem } from "@/components/BlogItem";
import { BlogResponse } from "@/types";
import { fetchServer } from "@/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface blogWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const BlogWrapper = async ({ ...rest }: blogWrapperProps) => {
  const allBlogs = await fetchServer<BlogResponse>("/api/blogs", {
    cache: "no-cache",
  });

  return (
    <div {...rest}>
      <h2>Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {allBlogs?.data?.map((item) => {
          return <BlogItem key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
};
