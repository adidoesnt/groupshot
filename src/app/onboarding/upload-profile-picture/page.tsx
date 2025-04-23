"use client";

import ImageCropper from "@/app/lib/components/ImageCropper";
import ImageUpload from "@/app/lib/components/ImageUpload";
import StatefulSidebar from "@/app/lib/components/StatefulSidebar";
import { useCallback, useMemo, useState } from "react";
import Button from "@/app/lib/components/Button";
import { cn } from "@/app/lib/utils/cn";
import { Area } from "react-easy-crop";
import { useAuth } from "@/app/lib/context/AmplifyProvider";
import { S3CommandType } from "@/app/lib/server/storage/s3";

export default function UploadProfilePicture() {
  const { getCurrentUser } = useAuth();
  const userId = useMemo(() => getCurrentUser()?.userId, [getCurrentUser]);

  const [image, setImage] = useState<File | null>(null);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const imageUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  const fileType = useMemo(() => {
    if (!image) return null;
    return image.type;
  }, [image]);

  const hasUploadedImage = useMemo(() => {
    return !!image && !!imageUrl;
  }, [image, imageUrl]);

  const handleDpUpload = useCallback((file: File) => {
    setImage(file);
  }, []);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const key = useMemo(() => {
    if (!image) return null;

    if (!userId) throw new Error("User not found");

    return `profile-pictures/${userId}`;
  }, [image, userId]);

  const getPresignedUrl = useCallback(async () => {
    const response = await fetch(
      `/api/s3-presigned-url?key=${key}&type=${S3CommandType.PutObject}`
    );
    const data = await response.json();
    return data.presignedUrl;
  }, [key]);

  const getS3Url = useCallback(async () => {
    const response = await fetch(`/api/s3-url?key=${key}`);
    const data = await response.json();
    return data.url;
  }, [key]);

  const updateUserProfilePictureUrl = useCallback(
    async (url: string) => {
      await fetch(`/api/user/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          profilePictureUrl: url,
        }),
      });
    },
    [userId]
  );

  const handleSave = useCallback(async () => {
    if (!userId) throw new Error("User not found");
    if (!fileType) throw new Error("File type is required");
    if (!imageUrl || !croppedArea) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, croppedArea.width, croppedArea.height);

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const presignedUrl = await getPresignedUrl();
        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          body: blob,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const url = await getS3Url();
        await updateUserProfilePictureUrl(url);
      });
    };

    console.log("Saving cropped image", { croppedArea });
  }, [
    croppedArea,
    fileType,
    getPresignedUrl,
    imageUrl,
    userId,
    updateUserProfilePictureUrl,
    getS3Url,
  ]);

  return (
    <div className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <StatefulSidebar />
      <div
        className={cn("flex flex-col gap-4 w-full max-w-2xl", {
          "items-center": !hasUploadedImage,
        })}
      >
        {!hasUploadedImage && <ImageUpload handleUpload={handleDpUpload} />}
        {hasUploadedImage && (
          <>
            <ImageCropper
              imageUrl={imageUrl!}
              onCropComplete={handleCropComplete}
            />
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => setImage(null)}
                className="hover:border-b-[1px] hover:opacity-70 border-foreground text-foreground p-2 transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="hover:border-b-[1px] hover:opacity-70 border-primary-action text-primary-action p-2 transition-all duration-200"
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
