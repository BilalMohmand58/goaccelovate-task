// app/dashboard/page.js
import { requireAuth } from "@/lib/auth";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/AddTodo";

export default async function Dashboard() {
  const session = await requireAuth();

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo Dashboard</h1>
      <div className="mb-8">
        <AddTodo />
      </div>
      <TodoList />
    </div>
  );
}
