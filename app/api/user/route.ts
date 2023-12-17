import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";

export const GET = async () => {
  try {
    await connectDB();
    const allUser = await prisma.user.findMany({
      include: {
        _count: true,
        Blogs: true,
      },
    });
    if (!allUser) {
      return ErrorResponse(404, "Not Found");
    }
    return successResponse(allUser, `Found ${allUser.length} users`, 200);
  } catch (error) {
    return ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};
