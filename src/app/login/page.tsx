"use client";

import DynamicForm from "@/app/lib/components/DynamicForm";
import { z } from "zod";
import { redirect, useRouter } from "next/navigation";
import { useCallback } from "react";
import { resendSignUpCode, signIn } from "aws-amplify/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

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

  const onSubmit = useCallback(async (data: z.infer<typeof loginSchema>) => {
    console.log("Submitting login form", data);

    try {
      const { nextStep } = await signIn({
        username: data.email,
        password: data.password,
      });

      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        console.log("Incomplete signup, resending code");

        await resendSignUpCode({
          username: data.email,
        });

        console.log("Code resent, redirecting to confirm signup");

        redirect(`/confirm-signup?email=${data.email}`);
      } else {
        console.log("Login successful, redirecting to landing page");

        redirect("/dashboard");
      }
    } catch (error) {
      console.error(`Error logging in for email ${data.email}`, error);
    }
  }, []);

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
