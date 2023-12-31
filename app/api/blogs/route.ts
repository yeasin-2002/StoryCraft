import {
  ErrorResponse,
  cloudinaryUpload,
  connectDB,
  successResponse,
} from "@/helpers";
import prisma from "@/prisma";
import { Env } from "@/utils";
import chalk from "chalk";
import { UploadApiResponse, v2 } from "cloudinary";
import { NextRequest } from "next/server";

// Get All Blogs
export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category") || "";
    const searchValue = searchParams.get("search") || "";

    // const queryBuilderForSearch = {};

    const allBlogs = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        categories: true,
        User: true,
      },
    });

    if (!allBlogs) {
      return ErrorResponse(404, "Not Found");
    }
    return successResponse(allBlogs, `Found ${allBlogs.length} blogs`);
  } catch (error) {
    console.log(error);
    return ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};

//  Create  a Blog
export const POST = async (req: Request) => {
  try {
    v2.config({
      api_key: Env.CLOUDINARY_API_KEY,
      api_secret: Env.CLOUDINARY_API_SECRETE,
      cloud_name: Env.CLOUDINARY_CLOUD_NAME,
    });
    const formData = await req.formData();
    chalk.green("formData", formData);
    const { title, desc, location, userEmail, categoryId, content } =
      await JSON.parse(formData.get("postData") as string);

    console.table({ title, desc, location, userEmail, categoryId, content });

    if (!title || !desc || !location || !userEmail || !categoryId || !content) {
      return ErrorResponse(422, "Provide all information");
    }
    await connectDB();
    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      return ErrorResponse(404, "No user  exist");
    }

    const FindCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    console.log("🚀  FindCategory:", FindCategory);

    if (!FindCategory) {
      return ErrorResponse(404, "No  category exist");
    }

    const image = (formData.get("image") as Blob) || null;
    console.log(chalk.green("image: ====================="));
    console.log(image);

    let uploadUrl: UploadApiResponse | null = null;
    if (image) {
      uploadUrl = await cloudinaryUpload(image);
    } else {
      uploadUrl = null;
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        location,
        categoryId,
        content,
        description: desc,
        userId: user.id,
        imgUrl: uploadUrl?.url! || null,
      },
    });
    return successResponse(blog, "Blog Created Successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(chalk.red(error.message));
    }
    return ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};

// Delete All Blogs
export const DELETE = async () => {
  try {
    await connectDB();
    const allBlogs = await prisma.blog.deleteMany();

    if (!allBlogs) {
      return ErrorResponse(404, "Not Found");
    }
    return successResponse(allBlogs, `Deleted All blogs `);
  } catch (error) {
    console.log(error);
    return ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};
