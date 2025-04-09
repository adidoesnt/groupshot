"use client";

import Sidebar from "./Sidebar";
import config from "../config";
import Link from "next/link";
import { useAuth } from "../context/AmplifyProvider";

const {
  sidebar: {
    authenticated: authenticatedSidebar,
    unauthenticated: unauthenticatedSidebar,
  },
} = config.layout;

export default function StatefulSidebar() {
  const { getCurrentUser } = useAuth();
  const isAuthenticated = !!getCurrentUser();

  return (
    <Sidebar title="Menu">
      <div className="flex flex-col gap-4">
        {isAuthenticated
          ? authenticatedSidebar.items.map((item) => (
              <Link href={item.href} key={item.label}>
                <p>{item.label}</p>
              </Link>
            ))
          : unauthenticatedSidebar.items.map((item) => (
              <Link href={item.href} key={item.label}>
                <p>{item.label}</p>
              </Link>
            ))}
      </div>
    </Sidebar>
  );
}
