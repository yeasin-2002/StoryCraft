import { Blog as BlogType } from "@/types";
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
  const data = (await res.json()) as BlogType;
  return data;
};

const Blog = ({ params, ...rest }: pageProps) => {
  const allBlogs = getAllBlogs(params.id);
  console.log("🚀 ~ file: page.tsx:21 ~ Blog ~ allBlogs:", allBlogs);
  return <div {...rest}>Blog Page</div>;
};

export default Blog;
