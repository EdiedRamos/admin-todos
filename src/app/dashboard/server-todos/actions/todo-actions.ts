"use server";

import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// * Simulate calculation time
async function sleep(seconds: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("awaken"), seconds * 1000);
  });
}

export async function toggleTodo(
  id: string,
  completed: boolean
): Promise<Todo> {
  await sleep(3);
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

export async function deleteTodoAction() {
  await prisma.todo.deleteMany({ where: { completed: true } });
  revalidatePath("/dashboard/server-todos");
}
