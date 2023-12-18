"use client";

import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface NavProfileProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const NavProfile = ({ ...rest }: NavProfileProps) => {
  const { status } = useSession();

  return (
    <div {...rest}>
      {status === "unauthenticated" ? (
        <Link href={"api/auth/signin"} className="btn btn-primary">
          log in
        </Link>
      ) : (
        <Link
          href={"/profile"}
          className="p-2 bg-slate-100 hover:bg-slate-200 inline-block rounded-lg transition-all"
        >
          <User strokeWidth={2} />
        </Link>
      )}
    </div>
  );
};
