"use client";

import Sidebar from "./Sidebar";
import config from "../config";
import Link from "next/link";
import { useAuth } from "../context/AmplifyProvider";
import LogoutButton from "./LogoutButton";

const {
  sidebar: {
    authenticated: authenticatedSidebar,
    unauthenticated: unauthenticatedSidebar,
  },
} = config.layout;

const AuthenticatedSidebar = () => {
  return (
    <Sidebar title={authenticatedSidebar.title}>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            {authenticatedSidebar.items.map((item) => (
              <Link href={item.href} key={item.label}>
                <p>{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-4">
          <LogoutButton className="bg-red-500 text-white font-mono mx-auto w-full p-2 rounded-sm hover:opacity-80 transition-all duration-300" />
        </div>
      </div>
    </Sidebar>
  );
};

const UnauthenticatedSidebar = () => {
  return (
    <Sidebar title={unauthenticatedSidebar.title}>
      <div className="flex flex-col gap-4">
        {unauthenticatedSidebar.items.map((item) => (
          <Link href={item.href} key={item.label}>
            <p>{item.label}</p>
          </Link>
        ))}
      </div>
    </Sidebar>
  );
};

export default function StatefulSidebar() {
  const { getCurrentUser } = useAuth();
  const isAuthenticated = !!getCurrentUser();

  return isAuthenticated ? (
    <AuthenticatedSidebar />
  ) : (
    <UnauthenticatedSidebar />
  );
}
