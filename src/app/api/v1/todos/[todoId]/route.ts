import * as yup from "yup";

import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

interface Params {
  todoId: string;
}

interface Segments {
  params: Params;
}

// * All are required cuz PUT is for updating the complete entity | object
const putSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().required(),
});

// * Methods response
function notFound(message: Record<string, any>) {
  return NextResponse.json(message, { status: 404 });
}

function badRequest(message: Record<string, any>) {
  return NextResponse.json(message, { status: 400 });
}

export async function GET(request: Request, segments: Segments) {
  const todoId = segments.params.todoId;
  const todo = await prisma.todo.findFirst({ where: { id: todoId } });
  if (!todo) return notFound({ message: `Todo ${todoId} not found` });
  return NextResponse.json({ message: "Todo found", content: todo });
}

export async function PUT(request: Request, segments: Segments) {
  try {
    const body = await request.json();
    const todoId = segments.params.todoId;

    const { description, completed } = await putSchema.validate(body);

    const todoStatus = await prisma.todo.update({
      data: { description, completed },
      where: { id: todoId },
    });

    return NextResponse.json({
      message: "Updating completed",
      data: todoStatus,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return badRequest({ message: "Validation error", error: error.errors });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return badRequest({ message: "Todo not found" });
    }
    return badRequest({ message: "Something went wrong" });
  }
}
