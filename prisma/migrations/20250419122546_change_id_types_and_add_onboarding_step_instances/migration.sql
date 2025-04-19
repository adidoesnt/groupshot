/*
  Warnings:

  - The primary key for the `GeneratedPhoto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GeneratedPhoto` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GeneratedPhotoAppearances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Onboarding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `OnboardingStep` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `completedAt` on the `OnboardingStep` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OnboardingStep` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingId` on the `OnboardingStep` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OnboardingStep` table. All the data in the column will be lost.
  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserSubscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `generatedPhotoId` on the `GeneratedPhotoAppearances` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `subscriptionId` on the `UserSubscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "GeneratedPhotoAppearances" DROP CONSTRAINT "GeneratedPhotoAppearances_generatedPhotoId_fkey";

-- DropForeignKey
ALTER TABLE "OnboardingStep" DROP CONSTRAINT "OnboardingStep_onboardingId_fkey";

-- DropForeignKey
ALTER TABLE "UserSubscription" DROP CONSTRAINT "UserSubscription_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "GeneratedPhoto" DROP CONSTRAINT "GeneratedPhoto_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "GeneratedPhoto_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GeneratedPhotoAppearances" DROP CONSTRAINT "GeneratedPhotoAppearances_pkey",
DROP COLUMN "generatedPhotoId",
ADD COLUMN     "generatedPhotoId" BIGINT NOT NULL,
ADD CONSTRAINT "GeneratedPhotoAppearances_pkey" PRIMARY KEY ("generatedPhotoId", "userId");

-- AlterTable
ALTER TABLE "Onboarding" DROP CONSTRAINT "Onboarding_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OnboardingStep" DROP CONSTRAINT "OnboardingStep_pkey",
DROP COLUMN "completedAt",
DROP COLUMN "createdAt",
DROP COLUMN "onboardingId",
DROP COLUMN "updatedAt",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT true,
ADD CONSTRAINT "OnboardingStep_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserSubscription" DROP CONSTRAINT "UserSubscription_pkey",
DROP COLUMN "subscriptionId",
ADD COLUMN     "subscriptionId" BIGINT NOT NULL,
ADD CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("userId", "subscriptionId", "status");

-- CreateTable
CREATE TABLE "OnboardingStepInstance" (
    "name" "OnboardingStepName" NOT NULL,
    "onboardingId" BIGINT NOT NULL,
    "stepId" BIGINT NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingStepInstance_pkey" PRIMARY KEY ("onboardingId","name")
);

-- AddForeignKey
ALTER TABLE "GeneratedPhotoAppearances" ADD CONSTRAINT "GeneratedPhotoAppearances_generatedPhotoId_fkey" FOREIGN KEY ("generatedPhotoId") REFERENCES "GeneratedPhoto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingStepInstance" ADD CONSTRAINT "OnboardingStepInstance_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "Onboarding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingStepInstance" ADD CONSTRAINT "OnboardingStepInstance_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "OnboardingStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
