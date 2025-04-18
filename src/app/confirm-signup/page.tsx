"use client";

import DynamicForm from "@/app/lib/components/DynamicForm";
import { z } from "zod";
import { useCallback } from "react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateUserRequest } from "../api/user/types";

const confirmSignupSchema = z.object({
  code: z.string().min(6),
});

export default function ConfirmSignup() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  const handleResendCode = useCallback(async () => {
    console.log("Resending code");

    try {
      if (!email) {
        throw new Error("Email is required");
      }

      await resendSignUpCode({
        username: email,
      });
    } catch (error) {
      console.error("Error resending code", error);
    }
  }, [email]);

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
    async (data: z.infer<typeof confirmSignupSchema>) => {
      console.log("Submitting confirm signup form", data);

      if (!email) {
        throw new Error("Email is required");
      }

      await confirmSignUp({
        username: email,
        confirmationCode: data.code,
      });

      console.log("Signup confirmed, creating user in database");

      await createUser({
        id: id as string, // schema validation should catch if null
        email,
        firstName: firstName as string, // schema validation should catch if null
        lastName: lastName as string, // schema validation should catch if null
      } satisfies CreateUserRequest);

      router.push("/login");
    },
    [email, router, createUser, id, firstName, lastName]
  );

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <DynamicForm
        schema={confirmSignupSchema}
        primaryAction={{
          text: "Confirm Signup",
          onClick: onSubmit,
        }}
        title="Confirm Signup"
        secondaryAction={{
          text: "Resend Code",
          onClick: handleResendCode,
        }}
      />
    </main>
  );
}
