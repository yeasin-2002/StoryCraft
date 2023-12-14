import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";

interface Param {
  params: {
    id: string;
  };
}

export const GET = async (req: Request, { params }: Param) => {
  try {
    await connectDB();
    const category = await prisma.category.findUnique({
      where: { id: params.id },
    });
    if (!category) {
      return ErrorResponse(null, "Not Found");
    }
    return successResponse(
      category,
      `Found one category named  - ${category.name} `
    );
  } catch (error) {
    ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};
