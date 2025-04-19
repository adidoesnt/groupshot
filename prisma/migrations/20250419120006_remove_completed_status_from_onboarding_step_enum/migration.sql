/*
  Warnings:

  - The values [COMPLETED] on the enum `OnboardingStepName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnboardingStepName_new" AS ENUM ('UPLOAD_PROFILE_PICTURE', 'CHOOSE_PLAN', 'ADD_FRIENDS', 'GENERATE_FIRST_PHOTO');
ALTER TABLE "OnboardingStep" ALTER COLUMN "name" TYPE "OnboardingStepName_new" USING ("name"::text::"OnboardingStepName_new");
ALTER TYPE "OnboardingStepName" RENAME TO "OnboardingStepName_old";
ALTER TYPE "OnboardingStepName_new" RENAME TO "OnboardingStepName";
DROP TYPE "OnboardingStepName_old";
COMMIT;
