import {
  Onboarding,
  OnboardingStep,
  OnboardingStepInstance,
  User,
} from "@/app/prisma";
import { z } from "zod";

// Create user
export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  id: z.string().min(1),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;

// Get user

export type UserWithOnboarding = User & {
  onboarding: Onboarding & {
    steps: (OnboardingStepInstance & {
      step: OnboardingStep;
    })[];
  };
};
