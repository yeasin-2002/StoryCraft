import { PenSquare } from "lucide-react";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Logo } from "./Logo";
import { NavProfile } from "./NavProfile";

interface NavProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Nav = ({ ...rest }: NavProps) => {
  return (
    <nav {...rest} className="flex justify-between items-center p-5 ">
      <Logo />
      <div className=" space-x-2 flex items-center gap-x-2">
        <Link
          href={"/write"}
          className="flex items-center gap-x-2 rounded-lg   bg-slate-50 hover:bg-slate-100  px-4 py-2 "
        >
          <PenSquare size={25} />
          <p>Write</p>
        </Link>
        <NavProfile />
      </div>
    </nav>
  );
};
