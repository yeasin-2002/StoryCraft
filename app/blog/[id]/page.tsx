import { SingleBlogResponse } from "@/types";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import defaultImg from "@/assets/defaults/Blogging.jpg";

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
      <p>{allBlogs.data?.title}</p>
      <Image
        src={allBlogs?.data?.imgUrl || defaultImg}
        alt={allBlogs.data?.title || " "}
        height={500}
        width={500}
        className="mx-auto "
      />
      <div
        className="blogDetails px-4 py-2"
        dangerouslySetInnerHTML={{
          __html: allBlogs.data?.description || "No Content Provided ",
        }}
      ></div>
    </div>
  );
};

export default Blog;
