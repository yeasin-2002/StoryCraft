import usrAvatar from "@/assets/defaults/user.jpg";
import { OwnBlog } from "@/components/OwnBlog";
import { singUserResponse } from "@/types";
import { $fetch } from "@/utils";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Profile = async () => {
  const data = await getServerSession(authOptions);

  const user = await $fetch<singUserResponse>(`/api/user/${data?.user?.email}`);

  return (
    <div>
      <div className="flex flex-col items-center pb-10">
        <Image
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
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
      {user?.data?.Blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2 2xl:grid-cols-3">
          {user?.data?.Blogs?.map((item, i) => {
            return <OwnBlog key={item.id} blog={item} />;
          })}
        </div>
      )}

      {user?.data?.Blogs.length > 0 || (
        <div className="w-full mt-20">
          <h2 className=" text-2xl w-full text-center font-bold  text-gray-800  mt-10 mb-4">
            You have no blogs
          </h2>
          <p className="text-center">
            Want to create one?{" "}
            <Link className="text-blue-500 underline" href="/blog/new">
              Click here
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
