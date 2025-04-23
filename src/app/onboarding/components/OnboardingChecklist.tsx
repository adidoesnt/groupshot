import {
  Onboarding,
  OnboardingStep,
  OnboardingStepInstance,
  OnboardingStepName,
} from "@/app/prisma";
import Link from "next/link";
import { useCallback, useMemo  } from "react";
import config from "@/app/lib/config";

const {
  onboarding: { links },
} = config;

type OnboardingChecklistProps = {
  onboarding?: Onboarding & {
    steps: (OnboardingStepInstance & {
      step: OnboardingStep;
    })[];
  };
};

export default function OnboardingChecklist({
  onboarding,
}: OnboardingChecklistProps) {
  const getStepCompletionEmoji = useCallback(
    (stepInstance: OnboardingStepInstance) => {
      if (stepInstance.completedAt) return "✅";
      return "❌";
    },
    []
  );

  const getStepLink = useCallback(
    (stepInstance: OnboardingStepInstance & { step: OnboardingStep }) => {
      switch (stepInstance.step.name) {
        case OnboardingStepName.UPLOAD_PROFILE_PICTURE:
          return links.uploadProfilePicture.href;
        case OnboardingStepName.CHOOSE_PLAN:
          return links.choosePlan.href;
        case OnboardingStepName.ADD_FRIENDS:
          return links.addFriends.href;
        case OnboardingStepName.GENERATE_FIRST_PHOTO:
          return links.generateFirstPhoto.href;
      }
    },
    []
  );

  const isProfilePictureUploaded = useMemo(() => {
    if (!onboarding) return false;
    return (
      onboarding.steps.find(
        (step) => step.step.name === OnboardingStepName.UPLOAD_PROFILE_PICTURE
      )?.completedAt !== null
    );
  }, [onboarding]);

  const isPlanChosen = useMemo(() => {
    if (!onboarding) return false;
    return (
      onboarding.steps.find(
        (step) => step.step.name === OnboardingStepName.CHOOSE_PLAN
      )?.completedAt !== null
    );
  }, [onboarding]);

  const isFriendsAdded = useMemo(() => {
    if (!onboarding) return false;
    return (
      onboarding.steps.find(
        (step) => step.step.name === OnboardingStepName.ADD_FRIENDS
      )?.completedAt !== null
    );
  }, [onboarding]);

  const getStepDisabled = useCallback(
    (stepInstance: OnboardingStepInstance & { step: OnboardingStep }) => {
      if (!onboarding) return true;

      switch (stepInstance.step.name) {
        case OnboardingStepName.UPLOAD_PROFILE_PICTURE:
          return isProfilePictureUploaded;
        case OnboardingStepName.CHOOSE_PLAN:
          return isPlanChosen;
        case OnboardingStepName.ADD_FRIENDS:
          return !isProfilePictureUploaded;
        case OnboardingStepName.GENERATE_FIRST_PHOTO:
          return !isProfilePictureUploaded || !isPlanChosen || !isFriendsAdded;
      }
    },
    [onboarding, isProfilePictureUploaded, isPlanChosen, isFriendsAdded]
  );

  if (!onboarding) return null;

  const { steps } = onboarding;

  return (
    <>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={step.stepId} className="flex items-center gap-2">
          <span className="text-text-link font-medium">{index + 1}.</span>
          {getStepDisabled(step) ? (
            <span className="text-text-link underline opacity-50 cursor-not-allowed">
              {step.step.description}
            </span>
          ) : (
            <Link className="text-text-link underline" href={getStepLink(step)}>
              {step.step.description}
            </Link>
          )}{" "}
          {getStepCompletionEmoji(step)}
        </div>
      ))}
    </div>
    </>
  );
}
