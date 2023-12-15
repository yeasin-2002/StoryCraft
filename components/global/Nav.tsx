import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Logo } from "./Logo";

interface NavProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
const navItem = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Write",
    link: "/write",
  },
];

export const Nav = ({ ...rest }: NavProps) => {
  return (
    <nav {...rest} className="flex justify-between items-center p-5 ">
      <Logo />
      <div className=" space-x-2">
        {navItem.map((item, index) => {
          return (
            <Link
              href={item.link}
              key={index}
              className="  text-violet-700  font-bold"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
