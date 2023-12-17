import { Env } from ".";

export async function fetchServer<T>(url: string, option?: RequestInit) {
  try {
    const response = await fetch(Env.BASE_URL + url);
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
