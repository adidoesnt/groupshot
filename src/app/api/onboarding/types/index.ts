import { z } from "zod";
import { OnboardingStepName } from "@/app/prisma";

export const updateOnboardingStepInstanceSchema = z.object({
  onboardingId: z.number({
    coerce: true,
  }),
  stepName: z.nativeEnum(OnboardingStepName),
  updates: z.object({
    completedAt: z.date({
      coerce: true,
    }).optional(),
  }),
});

export type UpdateOnboardingStepInstanceParams = {
  id: string;
  stepName: OnboardingStepName;
};
