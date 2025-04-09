"use client";

import DynamicForm from "@/app/lib/components/DynamicForm";
import { z } from "zod";
import { redirect } from "next/navigation";
import { useCallback } from "react";
import { signUp } from "aws-amplify/auth";

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
});

export default function Signup() {
  const gotoLoginPage = useCallback(() => {
    console.log("Navigating to login page");

    redirect("/login");
  }, []);

  const gotoLandingPage = useCallback(() => {
    console.log("Navigating to landing page");

    redirect("/");
  }, []);

  const onSubmit = useCallback(async (data: z.infer<typeof signupSchema>) => {
    console.log("Submitting signup form", data);

    try {
      const { userId } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            given_name: data.firstName,
            family_name: data.lastName,
          },
          autoSignIn: true,
        },
      });

      console.log("User signed up", {
        userId,
        email: data.email,
      });

      redirect(`/confirm-signup?email=${data.email}`);
    } catch (error) {
      console.error("Error signing up", error);
    }
  }, []);

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
        backFunction={gotoLandingPage}
      />
    </main>
  );
}
