import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";

interface Param {
  params: {
    id: string;
  };
}

// Get Single  Blog
export const GET = async (req: Request, { params }: Param) => {
  try {
    await connectDB();
    const category = await prisma.blog.findUnique({
      where: { id: params.id },
    });
    if (!category) {
      return ErrorResponse(404, "Not Found");
    }
    return successResponse(
      category,
      `Found one category named  - ${category.title} `
    );
  } catch (error) {
    ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};

// Delete a   Blog
export const DELETE = async (req: Request, { params }: Param) => {
  try {
    await connectDB();
    const category = await prisma.blog.delete({
      where: { id: params.id },
    });
    if (!category) return ErrorResponse(404, "Not Found");
    return successResponse(
      category,
      `Deleted one category named  - ${category.title} `
    );
  } catch (error) {
    ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};
