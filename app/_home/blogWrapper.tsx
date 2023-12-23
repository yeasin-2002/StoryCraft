"use client";

import { BlogItem } from "@/components/BlogItem";
import { ComboBox } from "@/components/ComboBox";
import { Search } from "@/components/Search";
import { BlogResponse, categoryResponse } from "@/types";
import { $fetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";

interface blogWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const BlogWrapper = ({ ...rest }: blogWrapperProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const allBlogs = useQuery({
    queryKey: ["homeBlogs", selectedCategory, searchValue],
    queryFn: () =>
      $fetch<BlogResponse>(
        `/api/blogs?category=${selectedCategory}&search=${searchValue}`
      ),
  });

  const allCategory = useQuery({
    queryKey: ["category"],
    queryFn: () => $fetch<categoryResponse>("/api/category"),
  });
  const mapCategory = allCategory.data?.data?.map((item) => {
    return {
      label: item?.name,
      value: item?.name,
    };
  }) || [{ label: "", value: "" }];

  const filterBlogs = allBlogs?.data?.data?.filter((item) => {
    let blog;
    const category = item?.categories?.name?.toLowerCase();
    const title = item?.title?.toLowerCase();
    if (!searchValue && !selectedCategory) {
      return (blog = item);
    }

    if (title && category && searchValue && selectedCategory) {
      return (blog =
        title?.toLowerCase()?.includes(searchValue?.toLowerCase()) &&
        category === selectedCategory.toLowerCase());
    }

    return blog;
  });
  console.log(selectedCategory);
  return (
    <section {...rest} className="container sm:px-4 mx-auto my-10 ">
      <h2 className="text-3xl font-bold text-center text-gray-800 sm:text-4xl md:text-5xl">
        Blogs
      </h2>
      <div className="flex justify-between">
        <ComboBox
          options={mapCategory}
          value={selectedCategory}
          setValue={setSelectedCategory}
        />
        <Search
          labelName="search-blog"
          placeholder="Search Blog....."
          value={searchValue}
          setValue={setSearchValue}
        />
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2  gap-4 p-2 my-20">
        {filterBlogs?.map((item) => {
          return <BlogItem key={item.id} data={item} />;
        })}

        {filterBlogs && filterBlogs.length === 0 && (
          <div className="col-span-3 text-center">No Blogs Found</div>
        )}

        {allBlogs.isLoading && (
          <div className="col-span-3 text-center">Loading...</div>
        )}
      </div>
    </section>
  );
};
