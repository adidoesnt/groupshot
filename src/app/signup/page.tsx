"use client";

import DynamicForm from "@/components/DynamicForm";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
});

const onSubmit = (data: z.infer<typeof signupSchema>) => {
  console.log("Submitting signup form", data);
};

export default function Signup() {
  const router = useRouter();

  const gotoLoginPage = useCallback(() => {
    console.log("Navigating to login page");

    router.push("/login");
  }, [router]);

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <DynamicForm
        schema={signupSchema}
        primaryAction={{
          text: "Signup",
          onClick: onSubmit,
        }}
        title="Signup"
        secondaryAction={{
          text: "Go to Login",
          onClick: gotoLoginPage,
        }}
      />
    </main>
  );
}
