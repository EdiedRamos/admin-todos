"use client";

import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import { Todo } from "@prisma/client";
import { updateTodo } from "../helpers/todos";
import { useRouter } from "next/navigation";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const router = useRouter();

  const handleUpdate = async () => {
    await updateTodo(todo.id, todo.description, !todo.completed);
    router.refresh();
  };

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
          onClick={handleUpdate}
        />
      </button>
    </div>
  );
};
