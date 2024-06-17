"use client";

import { startTransition, useOptimistic } from "react";

import { FaCheckCircle } from "react-icons/fa";
import { Todo } from "@prisma/client";
import { toggleTodo } from "../actions/todo-actions";

interface Props {
  todo: Todo;
}

export const TodoItemActions = ({ todo }: Props) => {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (state, completed: boolean) => ({
      ...state,
      completed,
    })
  );

  const handleToggle = async () => {
    try {
      startTransition(() => setOptimisticTodo(!optimisticTodo.completed));
      await toggleTodo(optimisticTodo.id, !optimisticTodo.completed);
    } catch {
      startTransition(() => setOptimisticTodo(!optimisticTodo.completed));
    }
  };

  return (
    <div
      className={`${
        optimisticTodo.completed ? "bg-gray-100" : "bg-white"
      } p-10 rounded-md shadow-md w-full md:w-[400px] flex justify-between items-center`}
    >
      <p
        className={`${
          optimisticTodo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {optimisticTodo.description}
      </p>
      <button>
        <FaCheckCircle
          size={25}
          className={`${
            optimisticTodo.completed
              ? "text-green-500 hover:text-green-600"
              : "text-gray-300 hover:text-gray-400"
          }`}
          onClick={handleToggle}
        />
      </button>
    </div>
  );
};
