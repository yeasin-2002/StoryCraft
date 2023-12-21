"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn";
import { LogOut, User, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import toast from "react-hot-toast";

interface NavProfileProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const NavProfile = ({ ...rest }: NavProfileProps) => {
  const { status } = useSession();

  const LogOutHandler = async () => {
    try {
      await signOut();
      return toast.success("Logged out ");
    } catch (error) {
      return toast.error("Something went wrong ");
    }
  };

  return (
    <div {...rest}>
      {status === "unauthenticated" ? (
        <Link href={"/login"} className="btn btn-primary">
          sing in
        </Link>
      ) : (
        <div>
          <Popover>
            <PopoverTrigger>
              <div className="p-2 bg-slate-100 hover:bg-slate-200 inline-block rounded-lg transition-all">
                <User strokeWidth={2} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-40  bg-gray-100 space-y-3 -translate-x-6 ">
              <Link
                href={"/profile"}
                className="flex items-center gap-x-2 hover:bg-gray-200 py-2 px-1"
              >
                <UserRound />
                Profile
              </Link>
              <div
                className="flex items-center gap-x-2 hover:bg-gray-200 py-4 px-2"
                onClick={LogOutHandler}
              >
                <LogOut />
                Logout
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};
