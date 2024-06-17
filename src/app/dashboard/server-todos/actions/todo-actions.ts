"use server";

import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleTodo(
  id: string,
  completed: boolean
): Promise<Todo> {
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw new Error(`Todo with id ${id} not found`);

  const updated = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/dashboard/server-todos");
  return updated;
}

export async function createTodoAction(description: string): Promise<Todo> {
  const newTodo = await prisma.todo.create({ data: { description } });
  revalidatePath("/dashboard/server-todos");
  return newTodo;
}
