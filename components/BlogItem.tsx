"use client";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface BlogItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const BlogItem = ({ ...rest }: BlogItemProps) => {
  return (
    <div {...rest}>
      <h1>Card</h1>
    </div>
  );
};
