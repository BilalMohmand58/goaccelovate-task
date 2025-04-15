// app/dashboard/edit/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditTodo({ params }) {
  const [todo, setTodo] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`/api/todos/${params.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Todo not found");
          }
          throw new Error("Failed to fetch todo");
        }

        const data = await response.json();
        setTodo(data);
        setContent(data.content);
      } catch (error) {
        console.error("FETCH TODO ERROR:", error);
        setError(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSaving(true);

    try {
      const response = await fetch(`/api/todos/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("UPDATE TODO ERROR:", error);
      setError(error.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="text-center py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="text-center py-8 text-red-500">
          <p>{error}</p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Edit Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Todo content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSaving}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || !content.trim()}>
                {isSaving ? "Saving..." : "Update"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
