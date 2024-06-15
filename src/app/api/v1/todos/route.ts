import * as yup from "yup";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface TodoBody {
  description: string;
}

type QueryParam = string | null | number;

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

function badRequest(message: Record<string, any>) {
  return NextResponse.json({ message }, { status: 400 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  let take: QueryParam = searchParams.get("take");
  let skip: QueryParam = searchParams.get("skip");

  const pagination: { take?: number; skip?: number } = {};

  if (take) {
    take = Number(take);
    if (isNaN(take)) return badRequest({ message: "take must to be a number" });
    pagination.take = take;
  }

  if (skip) {
    skip = Number(skip);
    if (isNaN(skip)) return badRequest({ message: "skip must to be a number" });
    if (skip < 0) return badRequest({ message: "skip must to be positive" });
    pagination.skip = skip;
  }

  const todos = await prisma.todo.findMany(pagination);
  return NextResponse.json({ message: "todos", data: todos });
}

export async function POST(request: Request) {
  try {
    const data: TodoBody = await request.json();

    const { completed, description } = await postSchema.validate(data);

    const newTodo = await prisma.todo.create({
      data: { description, completed },
    });

    return NextResponse.json({ message: "Todo created", content: newTodo });
  } catch (error) {
    if (error instanceof yup.ValidationError)
      return badRequest({ message: "", error: error.errors });
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
