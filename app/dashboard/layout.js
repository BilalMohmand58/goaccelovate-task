import { requireAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({ children }) {
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-xl font-bold">Todo App</h1>
          </Link>
          <div className="flex items-center gap-4">
            <p className="hidden md:block">
              Welcome, {session.user.name || session.user.email}
            </p>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="py-8">{children}</main>
    </div>
  );
}
