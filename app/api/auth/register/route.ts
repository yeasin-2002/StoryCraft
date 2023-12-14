import { ErrorResponse, connectDB, successResponse } from "@/helpers";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({
        status: 400,
        body: { error: "Please fill all fields" },
      });
    }
    await connectDB();
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashPassword },
    });

    return successResponse(user, "User created successfully");
  } catch (error: any) {
    ErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = () => {
  return NextResponse.json(
    { status: 200, message: "Hello World" },
    { status: 200 }
  );
};
