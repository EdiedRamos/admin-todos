"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { createTodoAction, deleteTodoAction } from "../actions/todo-actions";

import { IoTrashOutline } from "react-icons/io5";

export const TodoCreateActions = () => {
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (description.trim().length === 0) return;
    await createTodoAction(description);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <form className="flex w-full" onSubmit={handleSubmit}>
      <input
        name="description"
        type="text"
        value={description}
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={deleteTodoAction}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Eliminar completados
      </button>
    </form>
  );
};
