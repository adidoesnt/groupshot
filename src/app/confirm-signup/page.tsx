"use client";

import DynamicForm from "@/app/lib/components/DynamicForm";
import { z } from "zod";
import { useCallback } from "react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useRouter, useSearchParams } from "next/navigation";
import type { UpdateUserRequest } from "@/app/api/user/types";

const confirmSignupSchema = z.object({
  code: z.string().min(6),
});

export default function ConfirmSignup() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

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

  const enableUser = useCallback(async (userId: string | undefined) => {
    const response = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({
        id: userId as string, // schema validation should catch if undefined
        updates: {
          enabled: true,
        },
      } satisfies UpdateUserRequest),
    });

    if (!response.ok) {
      throw new Error("Failed to enable user");
    }

    return response.json();
  }, []);

  const onSubmit = useCallback(
    async (data: z.infer<typeof confirmSignupSchema>) => {
      console.log("Submitting confirm signup form", data);

      try {
        if (!email) {
          throw new Error("Email is required");
        }

        const { userId } = await confirmSignUp({
          username: email,
          confirmationCode: data.code,
        });

        console.log("Signup confirmed, enabling user in database");

        // If we reach this page, user needs to be enabled
        await enableUser(userId);

        router.push("/login");
      } catch (error) {
        console.error(`Error confirming signup for email ${email}`, error);
      }
    },
    [email, router, enableUser]
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
