// app/page.js
import { getAuthSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Todo App</h1>
          <div className="flex gap-2">
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Stay Organized with Todo App
          </h2>
          <p className="text-lg mb-8 text-gray-600">
            A simple, responsive todo application to help you manage your tasks
            effectively.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Todo App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
