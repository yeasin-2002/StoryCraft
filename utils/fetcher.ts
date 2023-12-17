import { Env } from ".";

export async function $fetch<T>(url: string, option?: RequestInit) {
  const response = await fetch(Env.BASE_URL + url, option);
  return (await response.json()) as T;
}
