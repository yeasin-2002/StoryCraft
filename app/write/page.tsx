"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn";
import { categoryResponse } from "@/types";
import React from "react";

type Props = {};
const page = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:3000/api/category").then(
        (res) => res.json() as Promise<categoryResponse>
      ),
  });
  console.log("🚀 ~ file: page.tsx:25 ~ page ~ data:", data);
  return (
    <div className="container">
      <div className="flex justify-between">
        <p>Author </p>
        <button className="btn btn-primary ">Publish</button>
      </div>
      <form>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="location" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </form>
    </div>
  );
};

export default page;
