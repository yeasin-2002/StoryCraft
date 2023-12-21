import { SingleBlogResponse } from "@/types";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import defaultImg from "@/assets/defaults/Blogging.jpg";
import { $fetch } from "@/utils";

interface pageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  params: {
    id: string;
  };
}

const Blog = async ({ params, ...rest }: pageProps) => {
  const allBlogs = await $fetch<SingleBlogResponse>(`/api/blogs/${params.id}`, {
    cache: "no-cache",
  });

  return (
    <div {...rest} className="container">
      <p className="text-3xl font-bold ">{allBlogs?.data?.title}</p>
      <Image
        src={allBlogs?.data?.imgUrl || defaultImg}
        alt={allBlogs?.data?.title || " "}
        height={500}
        width={500}
        className="mx-auto "
      />
      <div
        className=" px-4 py-2 BlogsRenderContent"
        dangerouslySetInnerHTML={{
          __html: allBlogs?.data?.description || "No Content Provided ",
        }}
      ></div>
    </div>
  );
};

export default Blog;
