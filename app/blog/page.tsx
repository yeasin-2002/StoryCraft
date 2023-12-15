import { DetailedHTMLProps, HTMLAttributes } from "react";

interface pageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Blog = ({ ...rest }: pageProps) => {
  return <div {...rest}></div>;
};

export default Blog;
