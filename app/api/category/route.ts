import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";

export const GET = async () => {
  try {
    await connectDB();
    const allCategory = await prisma.category.findMany();
    if (!allCategory) {
      return ErrorResponse(null, "Not Found", 404);
    }
    return successResponse(
      allCategory,
      `Found ${allCategory.length} categories`
    );
  } catch (error) {
    return ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};
