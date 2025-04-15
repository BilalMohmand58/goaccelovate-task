// components/LogoutButton.js
"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/" })}
      size="sm"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}
