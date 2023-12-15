import { BlogItem } from "@/components/BlogItem";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface blogWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const BlogWrapper = ({ ...rest }: blogWrapperProps) => {
  const allBlogs = [1, 2, 3, 4, 5, 6];
  return (
    <div {...rest}>
      <h2>Blogs</h2>
      {allBlogs.map((item) => {
        return <BlogItem key={item} />;
      })}
    </div>
  );
};
