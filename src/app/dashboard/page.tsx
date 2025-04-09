"use client";

import { useAuth } from "../lib/context/AmplifyProvider";

export default function Dashboard() {
  const { getCurrentUser } = useAuth();

  const user = getCurrentUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.email}</p>
    </div>
  );
}
