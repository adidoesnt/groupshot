"use client";

import DynamicForm from "@/app/lib/components/DynamicForm";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { signUp } from "aws-amplify/auth";
import StatefulSidebar from "../lib/components/StatefulSidebar";
import { useAuth } from "../lib/context/AmplifyProvider";

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
});

export default function Signup() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const gotoLoginPage = useCallback(() => {
    console.log("Navigating to login page");

    router.push("/login");
  }, [router]);

  const gotoLandingPage = useCallback(() => {
    console.log("Navigating to landing page");

    router.push("/");
  }, [router]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof signupSchema>) => {
      console.log("Submitting signup form", data);

      try {
        const { userId, nextStep } = await signUp({
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

        if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
          console.log("Redirecting to confirm signup");

          router.push(`/confirm-signup?email=${data.email}`);
        } else {
          console.log("Signup successful, redirecting to login");

          router.push(`/login`);
        }
      } catch (error) {
        console.error("Error signing up", error);
      }
    },
    [router]
  );

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated, redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <StatefulSidebar />
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
