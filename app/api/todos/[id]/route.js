// app/api/todos/[id]/route.js
import { getAuthSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get a specific todo
export async function GET(request, { params }) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    if (todo.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("GET TODO ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Update a todo
export async function PATCH(request, { params }) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { content, completed } = await request.json();

    if (content === undefined && completed === undefined) {
      return NextResponse.json(
        { message: "No data provided for update" },
        { status: 400 }
      );
    }

    // Check if todo exists and belongs to user
    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    if (existingTodo.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Update todo
    const updateData = {};
    if (content !== undefined) updateData.content = content;
    if (completed !== undefined) updateData.completed = completed;

    const todo = await prisma.todo.update({
      where: {
        id: params.id,
      },
      data: updateData,
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error("UPDATE TODO ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete a todo
export async function DELETE(request, { params }) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if todo exists and belongs to user
    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    if (existingTodo.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Delete todo
    await prisma.todo.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("DELETE TODO ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
