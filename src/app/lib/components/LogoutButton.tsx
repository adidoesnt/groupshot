"use client";

import { useAuth } from "../context/AmplifyProvider";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type LogoutButtonProps = {
  className?: string;
};  

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/login");
  }, [logout, router]);

  return (
    <Button onClick={handleLogout} className={className}>
      Logout
    </Button>
  );
}
