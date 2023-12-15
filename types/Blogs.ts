export interface BlogResponse {
  data: Blog[];
  message: string;
  status: number;
}

export interface Blog {
  User: User;
  categories: Categories;
  categoryId: string;
  createAt: Date;
  description: string;
  id: string;
  imgUrl: string;
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
