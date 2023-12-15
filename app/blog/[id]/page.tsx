import { Blog as BlogType, SingleBlogResponse } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface pageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  params: {
    id: string;
  };
}

const getAllBlogs = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    cache: "no-cache",
  });
  const data = (await res.json()) as SingleBlogResponse;
  return data;
};

const Blog = async ({ params, ...rest }: pageProps) => {
  const allBlogs = await getAllBlogs(params.id);

  return (
    <div {...rest}>
      <p>TItle: {allBlogs?.data?.title}</p>
    </div>
  );
};

export default Blog;
