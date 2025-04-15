// lib/auth.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return session;
}
