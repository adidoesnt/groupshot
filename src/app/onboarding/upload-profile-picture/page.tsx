"use client";

import ImageCropper from "@/app/lib/components/ImageCropper";
import ImageUpload from "@/app/lib/components/ImageUpload";
import StatefulSidebar from "@/app/lib/components/StatefulSidebar";
import { useCallback, useMemo, useState } from "react";
import { cn } from "@/app/lib/utils/cn";
import { S3CommandType } from "@/app/lib/server/storage/s3";
import { OnboardingStepName } from "@/app/prisma";
import { useUserProfile } from "@/app/lib/context/UserProvider";
import { useRouter } from "next/navigation";
import config from "@/app/lib/config";

const STEP_NAME = OnboardingStepName.UPLOAD_PROFILE_PICTURE;
const {
  onboarding: {
    pages: { uploadProfilePicture },
  },
} = config;

export default function UploadProfilePicture() {
  const router = useRouter();

  const { getUserProfile } = useUserProfile();
  const user = useMemo(() => getUserProfile(), [getUserProfile]);
  const userId = useMemo(() => user?.id, [user]);
  const onboardingId = useMemo(
    () => user?.onboarding?.id,
    [user?.onboarding?.id]
  );

  const [image, setImage] = useState<File | null>(null);

  const imageUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  const hasUploadedImage = useMemo(() => {
    return !!image && !!imageUrl;
  }, [image, imageUrl]);

  const handleDpUpload = useCallback((file: File) => {
    setImage(file);
  }, []);

  const key = useMemo(() => {
    if (!hasUploadedImage) return null;
    if (!userId) throw new Error("User not found");

    return `profile-pictures/${userId}`;
  }, [hasUploadedImage, userId]);

  const getPresignedUrl = useCallback(
    async (key: string, type: S3CommandType) => {
      const response = await fetch(
        `/api/s3-presigned-url?key=${key}&type=${type}`
      );
      const data = await response.json();
      return data.presignedUrl;
    },
    []
  );

  const getS3Url = useCallback(async (key: string) => {
    const response = await fetch(`/api/s3-url?key=${key}`);
    const data = await response.json();
    return data.url;
  }, []);

  const updateOnboardingStep = useCallback(async () => {
    const now = new Date();
    await fetch(`/api/onboarding/${onboardingId}/${STEP_NAME}`, {
      method: "PUT",
      body: JSON.stringify({ updates: { completedAt: now } }),
    });
  }, [onboardingId]);

  const updateUserProfilePictureUrl = useCallback(async () => {
    try {
      if (!key) throw new Error("Key is required");

      console.log("Updating user profile picture URL", key);

      const url = await getS3Url(key);
      await fetch(`/api/user/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          profilePictureUrl: url,
        }),
      });
    } catch (error) {
      console.error("Error updating user profile picture URL", error);
    }
  }, [userId, key, getS3Url]);

  const onUploadComplete = useCallback(async () => {
    await updateUserProfilePictureUrl();
    await updateOnboardingStep();

    setTimeout(() => {
      setImage(null);
      router.push("/onboarding");
    }, 3000);
  }, [updateOnboardingStep, updateUserProfilePictureUrl, router]);

  return (
    <div className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <StatefulSidebar />
      <div
        className={cn("flex flex-col gap-4 w-full max-w-2xl", {
          "items-center": !hasUploadedImage,
        })}
      >
        {!hasUploadedImage && (
          <ImageUpload
            handleUpload={handleDpUpload}
            title={uploadProfilePicture.title}
            description={uploadProfilePicture.description}
          />
        )}
        {hasUploadedImage && (
          <ImageCropper
            imageUrl={imageUrl!}
            onCancel={() => setImage(null)}
            getPresignedUrl={getPresignedUrl}
            objectKey={key!}
            onUploadComplete={onUploadComplete}
            successMessage={uploadProfilePicture.successMessage}
            errorMessage={uploadProfilePicture.errorMessage}
          />
        )}
      </div>
    </div>
  );
}
