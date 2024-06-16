import { TodoGrid } from "./components/TodoGrid";
import prisma from "@/lib/prisma";

export default async function RestTodos() {
  const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });

  return (
    <div>
      <TodoGrid todos={todos} />
    </div>
  );
}
