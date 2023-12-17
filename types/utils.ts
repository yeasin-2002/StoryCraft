import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Blog {
  User: User;
  categories: Categories;
  categoryId: string;
  createAt: Date;
  description: string;
  id: string;
  imgUrl: string | StaticImport;
  location: string;
  title: string;
  updatedAt: Date;
  userId: string;
}

export interface User {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  password: string;
  profileUrl: null;
}

export interface Categories {
  id: string;
  name: string;
}

export interface category {
  id: string;
  name: string;
}

export interface singUser {
  Blogs: Blog[];
  _count: {
    Blogs: number;
  };
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  password: string;
  profileUrl: null;
}
