import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";

export const GET = (req: Request) => {
  try {
    const method = req.method;
    const url = req.url;

    return successResponse({ method, url }, "Hello Seed");
  } catch (error: any) {
    return ErrorResponse(error.message);
  }
};

export const DELETE = async () => {
  try {
    await connectDB();

    await prisma.blog.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();

    return successResponse(null, "Database cleared");
  } catch (error: any) {
    ErrorResponse(error.message);
  } finally {
    prisma.$disconnect();
  }
};
