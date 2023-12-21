import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "./chain";

export function isLoggedIn(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // Perform whatever logic the second middleware needs to do
    const pathname = request.nextUrl.pathname;
    console.log("middleware2 =>", { pathname });

    // Call the next middleware and pass the request and response
    return middleware(request, event, response);
  };
}
