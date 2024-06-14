import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function badRequest(message: Record<string, any>) {
  return NextResponse.json({ message }, { status: 400 });
}

type QueryParam = string | null | number;

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