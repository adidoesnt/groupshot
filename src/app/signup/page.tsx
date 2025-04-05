"use client";

import DynamicForm from "@/components/DynamicForm";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const onSubmit = (data: z.infer<typeof signupSchema>) => {
  console.log("Submitting signup form", data);
};

const gotoLoginPage = () => {
  console.log("Navigating to login page");
};

export default function Signup() {
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
