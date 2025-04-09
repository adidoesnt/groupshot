"use client";

import { useAuth } from "../context/AmplifyProvider";
import Button from "./Button";

type LogoutButtonProps = {
  className?: string;
};  

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { logout } = useAuth();

  return (
    <Button onClick={logout} className={className}>
      Logout
    </Button>
  );
}
