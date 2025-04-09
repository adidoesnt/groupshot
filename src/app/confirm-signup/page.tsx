"use client";

import DynamicForm from "@/app/lib/components/DynamicForm";
import { z } from "zod";
import { useCallback } from "react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { redirect, useSearchParams } from "next/navigation";

const confirmSignupSchema = z.object({
  code: z.string().min(6),
});

export default function ConfirmSignup() {
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

  const onSubmit = useCallback(
    async (data: z.infer<typeof confirmSignupSchema>) => {
      console.log("Submitting confirm signup form", data);

      try {
        if (!email) {
          throw new Error("Email is required");
        }

        await confirmSignUp({
          username: email,
          confirmationCode: data.code,
        });

        console.log("Signup confirmed, redirecting to login");

        redirect("/login");
      } catch (error) {
        console.error(`Error confirming signup for email ${email}`, error);
      }
    },
    [email]
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
