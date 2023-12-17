import usrAvatar from "@/assets/defaults/user.jpg";
import { OwnBlog } from "@/components/OwnBlog";
import { singUserResponse } from "@/types";
import { fetchServer } from "@/utils";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const UserData = async (mail: string | null | undefined) => {
  if (!mail) return;
  const req = await fetch(`http://localhost:3000/api/user/${mail}`, {
    cache: "default",
  });
  return (await req.json()) as singUserResponse;
};

const Profile = async () => {
  const data = await getServerSession(authOptions);
  const user = await UserData(data?.user?.email);

  return (
    <div>
      <div className="flex flex-col items-center pb-10">
        <Image
          className="w-24 h-24 mb-3 rounded-full s  hadow-lg"
          src={data?.user?.image || usrAvatar}
          width={200}
          height={200}
          alt={data?.user?.name || "Avatar"}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {data?.user?.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {data?.user?.email}
        </span>
      </div>

      <h2 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center mt-10 mb-4">
        Your Blogs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
        {user?.data?.Blogs?.map((item, i) => {
          return <OwnBlog key={item.id} blog={item} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
