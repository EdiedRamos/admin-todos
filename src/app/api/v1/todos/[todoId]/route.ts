import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  todoId: string;
}

interface Segments {
  params: Params;
}

function notFound(message: Record<string, any>) {
  return NextResponse.json({ message }, { status: 404 });
}

export async function GET(request: Request, segments: Segments) {
  const todoId = segments.params.todoId;
  const todo = await prisma.todo.findFirst({ where: { id: todoId } });
  if (!todo) return notFound({ message: `Todo ${todoId} not found` });
  return NextResponse.json({ message: "Todo found", content: todo });
}
