"use client";

import { FaCheckCircle } from "react-icons/fa";
import { Todo } from "@prisma/client";
import { toggleTodo } from "../actions/todo-actions";

interface Props {
  todo: Todo;
}

export const TodoItemActions = ({ todo }: Props) => {
  return (
    <div
      className={`${
        todo.completed ? "bg-gray-100" : "bg-white"
      } p-10 rounded-md shadow-md w-full md:w-[400px] flex justify-between items-center`}
    >
      <p className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
        {todo.description}
      </p>
      <button>
        <FaCheckCircle
          size={25}
          className={`${
            todo.completed
              ? "text-green-500 hover:text-green-600"
              : "text-gray-300 hover:text-gray-400"
          }`}
          onClick={() => toggleTodo(todo.id, !todo.completed)}
        />
      </button>
    </div>
  );
};
