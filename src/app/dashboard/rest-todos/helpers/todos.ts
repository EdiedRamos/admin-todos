export async function updateTodo(
  id: string,
  description: string,
  completed: boolean
) {
  const body = { description, completed };
  await fetch(`/api/v1/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export async function createTodo(description: string) {
  const body = { description };
  await fetch("/api/v1/todos/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
