export const dynamic = "force-dynamic";
export const revalidate = 0;

import { TodoCreateActions } from "./components/TodoCreateActions";
import { TodoGridActions } from "./components/TodoGridActions";
import prisma from "@/lib/prisma";

export default async function ServerTodoPage() {
  const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
  console.log("updated");
  return (
    <div>
      <div className="mb-10">
        <TodoCreateActions />
      </div>
      <TodoGridActions todos={todos} />
    </div>
  );
}
