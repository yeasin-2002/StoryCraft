"use client";

import { Logo } from "@/components/global";
import { Google } from "@/components/icon";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { DetailedHTMLProps, FormEvent, HTMLAttributes, useState } from "react";
import toast from "react-hot-toast";

interface pageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Login = ({ ...rest }: pageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const req = await signIn("credentials", { email, password });
    console.log("🚀 ~ file: page.tsx:19 ~ formSubmitHandler ~ req:", req);
  };

  const sinInWithGithubOrGoogle = async (method: "github" | "google") => {
    try {
      toast.loading("Loading...", { id: "login" });
      await sinInWithGithubOrGoogle(method);
    } catch (error) {
      toast.error("Something went wrong", { id: "login" });
    }
  };

  return (
    <div {...rest}>
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto">
          <Logo />
        </div>

        <form className="mt-6" onSubmit={formSubmitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
            </div>

            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or login with Social Media
          </a>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>

        <div className=" space-y-3   mt-5">
          <button
            onClick={() => sinInWithGithubOrGoogle("google")}
            type="button"
            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
          >
            <Google />
            <span className="hidden mx-2 sm:inline">Sign in with Google</span>
          </button>

          <button
            onClick={() => sinInWithGithubOrGoogle("github")}
            type="button"
            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-slate-800 rounded-lg hover:bg-slate-700 focus:bg-slate-900 focus:outline-none"
          >
            <GithubIcon />
            <span className="hidden mx-2 sm:inline">Sign in with Github</span>
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {"Don't"} have an account?
          <a
            href="#"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
