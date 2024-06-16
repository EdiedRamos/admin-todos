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
