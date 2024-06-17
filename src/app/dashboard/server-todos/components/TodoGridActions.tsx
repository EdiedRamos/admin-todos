import { Todo } from "@prisma/client";
import { TodoItemActions } from "./TodoItemActions";

interface Props {
  todos: Todo[];
}

export const TodoGridActions = ({ todos }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {todos.map((todo) => (
        <TodoItemActions key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
