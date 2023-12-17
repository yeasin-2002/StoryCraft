import { Blog, category, singUser } from ".";

export interface BlogResponse {
  data: Blog[] | null;
  message: string;
  status: number;
}
export interface SingleBlogResponse {
  data: Blog | null;
  message: string;
  status: number;
}
export interface postDataResponse {
  status: number;
  message: string;
  data: {
    _id: string;
    title: string;
    desc: string;
    photo: string;
    username: string;
    categories: string;
    createdAt: string;
  };
}

export interface categoryResponse {
  data: category[] | null;
  message: string;
  status: number;
}

export interface singUserResponse {
  data: singUser;
  message: string;
  status: number;
}
