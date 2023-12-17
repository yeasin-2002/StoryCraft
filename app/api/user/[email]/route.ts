import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";

interface IdUser {
  params: {
    email: string;
  };
}

export const GET = async (req: Request, { params }: IdUser) => {
  try {
    await connectDB();
    const user = await prisma.user.findUnique({
      where: { email: params?.email },
      include: {
        Blogs: true,
        _count: true,
      },
    });

    if (!user) {
      return ErrorResponse();
    }
    return successResponse(user, `Found - ${user.name}`);
  } catch (error) {
    return ErrorResponse();
  }
};
