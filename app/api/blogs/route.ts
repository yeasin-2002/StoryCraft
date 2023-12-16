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

// Get All Blogs
export const GET = async () => {
  try {
    await connectDB();
    const allBlogs = await prisma.blog.findMany({
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
    ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};

//  Create  a Blog
export const POST = async (req: Request) => {
  console.log(
    chalk.bgGreen("====================================================")
  );
  try {
    v2.config({
      api_key: Env.CLOUDINARY_API_KEY,
      api_secret: Env.CLOUDINARY_API_SECRETE,
      cloud_name: Env.CLOUDINARY_CLOUD_NAME,
    });
    const formData = await req.formData();
    chalk.green("formData", formData);
    const { title, desc, location, userId, categoryId } = await JSON.parse(
      formData.get("postData") as string
    );

    if (!title || !desc || !location || !userId || !categoryId) {
      return ErrorResponse(422, "Provide all information");
    }
    await connectDB();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return ErrorResponse(404, "No user  exist");
    }

    const FindCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!FindCategory) {
      return ErrorResponse(404, "No  category exist");
    }

    const image = (formData.get("image") as Blob) || null;
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
        description: desc,
        userId: user.id,
        imgUrl: uploadUrl?.url!,
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
