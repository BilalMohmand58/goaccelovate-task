// components/TodoList.js
"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/todos");

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("FETCH TODOS ERROR:", error);
      setError("Failed to load todos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("DELETE TODO ERROR:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <Button onClick={fetchTodos} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No todos yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card key={todo.id}>
          <CardContent className="p-4 flex items-center justify-between">
            <p className="text-lg">{todo.content}</p>
            <div className="flex gap-2">
              <Link href={`/dashboard/edit/${todo.id}`}>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
