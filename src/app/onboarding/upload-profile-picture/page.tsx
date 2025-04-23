"use client";

import ImageCropper from "@/app/lib/components/ImageCropper";
import ImageUpload from "@/app/lib/components/ImageUpload";
import StatefulSidebar from "@/app/lib/components/StatefulSidebar";
import { useCallback, useMemo, useState } from "react";
import Button from "@/app/lib/components/Button";
import { cn } from "@/app/lib/utils/cn";
import { Area } from "react-easy-crop";

export default function UploadProfilePicture() {
  const [image, setImage] = useState<File | null>(null);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

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

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!image || !croppedArea) return;

    // TODO:
    // 1. Create a canvas
    // 2. Draw the cropped image
    // 3. Convert to blob
    // 4. Upload to S3 presigned url
    // 5. Update user profile

    console.log("Saving cropped image", { croppedArea });
  }, [image, croppedArea]);

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
