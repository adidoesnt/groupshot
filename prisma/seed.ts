import { OnboardingStepName, PrismaClient } from "@/app/prisma";

const prisma = new PrismaClient();

async function main() {
  const onboardingStepsInOrder = [
    {
      name: OnboardingStepName.UPLOAD_PROFILE_PICTURE,
      description: "Upload a profile picture",
      required: true,
    },
    {
      name: OnboardingStepName.CHOOSE_PLAN,
      description: "Choose a plan",
      required: true,
    },
    {
      name: OnboardingStepName.ADD_FRIENDS,
      description: "Add friends",
      required: false,
    },
    {
      name: OnboardingStepName.GENERATE_FIRST_PHOTO,
      description: "Generate your first photo",
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
