import { NextResponse } from "next/server";

type IResponseHandler = (data?: any, message?: string, status?: number) => void;

export const successResponse: IResponseHandler = (
  data,
  message = "success",
  status = 200
) => {
  return NextResponse.json({ status, message, data }, { status });
};

export const ErrorResponse: IResponseHandler = (
  data = null,
  message = "Internal Server Error",
  status = 500
) => {
  return NextResponse.json({ status, message, data }, { status });
};
