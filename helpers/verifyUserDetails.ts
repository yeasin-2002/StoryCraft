import prisma from "@/prisma";
import { DefaultUser } from "next-auth";
import { connectDB } from ".";

export const verifyUserCredentials = async (user: DefaultUser) => {
  try {
    await connectDB();
    const checkUsrExist = await prisma.user.findFirst({
      where: {
        email: user.email as string,
      },
    });

    if (checkUsrExist) {
      return null;
    }

    return await prisma.user.create({
      data: {
        email: user?.email as string,
        name: user?.name as string,
        profileUrl: user.image || "",
      },
    });
  } catch (error) {
    return null;
  }
};
