
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AddTodo() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      setContent("");

      // Dispatch the "todoAdded" event after a successful submission
      window.dispatchEvent(new CustomEvent("todoAdded"));
    } catch (error) {
      console.error("ADD TODO ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !content.trim()}>
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
