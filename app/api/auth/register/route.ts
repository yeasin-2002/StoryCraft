import { connectDB } from "@/helpers";
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

    return NextResponse.json(
      { status: 200, message: "User created", body: user },
      { status: 202 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { status: 500, message: "unable User created" },
      { status: 500 }
    );
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
