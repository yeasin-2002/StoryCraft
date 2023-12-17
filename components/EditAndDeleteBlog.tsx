import { Pen, Trash2 } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface EditAndDeleteBlogProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const EditAndDeleteBlog = ({ ...rest }: EditAndDeleteBlogProps) => {
  return (
    <div {...rest} className="flex  items-center justify-around ">
      <Pen />
      <Trash2 />
    </div>
  );
};
