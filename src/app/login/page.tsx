"use client";

import DynamicForm from "@/components/DynamicForm";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const onSubmit = (data: z.infer<typeof loginSchema>) => {
  console.log("Submitting login form", data);
};

export default function Login() {
  const router = useRouter();

  const gotoSignupPage = useCallback(() => {
    console.log("Navigating to signup page");

    router.push("/signup");
  }, [router]);

  const gotoLandingPage = useCallback(() => {
    console.log("Navigating to landing page");

    router.push("/");
  }, [router]);

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <DynamicForm
        schema={loginSchema}
        primaryAction={{
          text: "Login",
          onClick: onSubmit,
        }}
        title="Login"
        secondaryAction={{
          text: "Go to Signup",
          onClick: gotoSignupPage,
        }}
        backFunction={gotoLandingPage}
      />
    </main>
  );
}
