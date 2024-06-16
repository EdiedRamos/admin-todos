import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
}

export const TodoGrid = ({ todos }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
