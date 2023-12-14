import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";

export const GET = async () => {
  try {
    await connectDB();
    const allUser = await prisma.user.findMany();
    if (!allUser) {
      return ErrorResponse(null, "Not Found", 404);
    }
    return successResponse(allUser, `Found ${allUser.length} users`, 200);
  } catch (error) {
    return ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};
