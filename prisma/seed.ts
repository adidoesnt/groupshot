import { OnboardingStepName, PrismaClient } from "@/app/prisma";

const prisma = new PrismaClient();

async function main() {
  const onboardingStepsInOrder = [
    {
      name: OnboardingStepName.UPLOAD_PROFILE_PICTURE,
      required: true,
    },
    {
      name: OnboardingStepName.CHOOSE_PLAN,
      required: true,
    },
    {
      name: OnboardingStepName.ADD_FRIENDS,
      required: false,
    },
    {
      name: OnboardingStepName.GENERATE_FIRST_PHOTO,
      required: false,
    },
  ];

  await Promise.all(
    onboardingStepsInOrder.map((step, index) =>
      prisma.onboardingStep.create({
        data: {
          ...step,
          id: index + 1,
        },
      })
    )
  );

  console.log("✅ Seeded onboarding steps.");
}

try {
  await main();
} catch (error) {
  console.error("❌ Error seeding onboarding steps:", error);
} finally {
  await prisma.$disconnect();
}
