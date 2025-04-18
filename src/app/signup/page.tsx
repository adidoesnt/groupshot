"use client";

import DynamicForm from "@/app/lib/components/DynamicForm";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { signUp } from "aws-amplify/auth";
import StatefulSidebar from "@/app/lib/components/StatefulSidebar";
import type { CreateUserRequest } from "@/app/api/user/types";

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
});

export default function Signup() {
  const router = useRouter();

  const gotoLoginPage = useCallback(() => {
    console.log("Navigating to login page");

    router.push("/login");
  }, [router]);

  const gotoLandingPage = useCallback(() => {
    console.log("Navigating to landing page");

    router.push("/");
  }, [router]);

  const createUser = useCallback(async (user: CreateUserRequest) => {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  }, []);

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
          console.log("Signup successful, redirecting to confirm signup");

          router.push(
            `/confirm-signup?email=${data.email}&id=${userId}&firstName=${data.firstName}&lastName=${data.lastName}`
          );
        } else {
          console.log("Cognito signup successful, creating user in database");

          await createUser({
            id: userId as string, // schema validation should catch if undefined
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          } satisfies CreateUserRequest);

          console.log("User created successfully, redirecting to login");

          router.push(`/login`);
        }
      } catch (error) {
        console.error("Error signing up", error);
      }
    },
    [router, createUser]
  );

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
