import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

interface IdUser {
  params: {
    id: string;
  };
}

export const GET = async (req: Request, { params }: IdUser) => {
  try {
    await connectDB();
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    if (!user) {
      return ErrorResponse(null, "Not Found");
    }
    return successResponse(user, `Found - ${user.name}`);
  } catch (error) {}
};
