import { chain, isLoggedIn } from "@/middlewares";

export default chain([isLoggedIn]);

export const config = {
  matcher: ["/profile"],
};
