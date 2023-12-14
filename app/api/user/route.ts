import { connectDB } from "@/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const allUser = await prisma.user.findMany();
    if (!allUser) {
      return NextResponse.json(
        {
          status: 404,
          message: "Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        message: `Found ${allUser.length} users`,
        data: allUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 404,
        message: "Internal Server Error",
      },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
