export const dynamic = "force-dynamic";
export const revalidate = 0;

import { TodoCreate } from "./components/TodoCreate";
import { TodoGrid } from "./components/TodoGrid";
import prisma from "@/lib/prisma";

export default async function RestTodos() {
  const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });

  return (
    <div>
      <div className="mb-10">
        <TodoCreate />
      </div>
      <TodoGrid todos={todos} />
    </div>
  );
}
