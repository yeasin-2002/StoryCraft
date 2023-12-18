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
      include: {
        categories: true,
        User: true,
      },
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
      include: {
        categories: true,
        User: true,
      },
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

// Delete a   Blog
export const PATCH = async (req: Request, { params }: Param) => {
  try {
    const formData = await req.formData();
    // title, description, categoriesId, location
    const title = JSON.parse(formData.get("title") as string);
    const description = JSON.parse(formData.get("description") as string);
    const categoriesId = JSON.parse(formData.get("categoriesId") as string);
    const location = JSON.parse(formData.get("location") as string);

    if (!title || !description || !categoriesId || !location) {
      return ErrorResponse(422, "Provide all information");
    }

    await connectDB();
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        title,
        description,
        location,
        categoryId: categoriesId,
      },
    });
    if (!updatedBlog) return ErrorResponse(404, "Not Found");

    return successResponse(updatedBlog, "Updated Successfully");
  } catch (error) {
    ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};
