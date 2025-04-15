import { getAuthSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get all todos for the authenticated user
export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("GET TODOS ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Create a new todo
export async function POST(request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: {
        content,
        userId: session.user.id,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("CREATE TODO ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
