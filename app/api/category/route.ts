import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";


// Get All Categories
export const GET = async () => {
  try {
    await connectDB();
    const allCategory = await prisma.category.findMany();
    if (!allCategory) {
      return ErrorResponse(404, "Not Found");
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

// Create Category
export const POST = async (req: Request) => {
  try {
    const { name } = await req.json();
    if (!name) {
      return ErrorResponse(400, "Name is required");
    }

    const createCategory = await prisma.category.create({ data: { name } });
    if (!createCategory) {
      return ErrorResponse(400, "Failed to create category");
    }
    return successResponse(createCategory, "Category created");
  } catch (error) {
    ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};

//  Delete All Categories
export const DELETE = async (req: Request) => {
  try {
    await connectDB();
    const category = await prisma.category.deleteMany();
    if (!category) return ErrorResponse(404, "Not Found");

    return successResponse(category, `Deleted ${category.count} categories`);
  } catch (error) {
    ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};