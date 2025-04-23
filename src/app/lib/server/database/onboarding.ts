import prisma from "@/app/lib/server/database/prisma";
import { OnboardingStepInstance, OnboardingStepName } from "@/app/prisma";

export const updateOnboardingStepInstance = async (
  onboardingId: number,
  stepName: OnboardingStepName,
  updates: Partial<OnboardingStepInstance>
) => {
  await prisma.onboardingStepInstance.update({
    where: { onboardingId_name: { onboardingId, name: stepName } },
    data: updates,
  });
};
