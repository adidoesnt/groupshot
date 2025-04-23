import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import { cn } from "@/app/lib/utils/cn";
import { Area } from "react-easy-crop";
import Button from "./Button";
import { S3CommandType } from "@/app/lib/server/storage/s3";
import Message from "./Message";

type ImageCropperProps = {
  imageUrl: string;
  onCancel: () => void;
  getPresignedUrl: (key: string, type: S3CommandType) => Promise<string>;
  objectKey: string;
  onUploadComplete?: () => Promise<void>;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
};

export default function ImageCropper({
  imageUrl,
  onCancel,
  getPresignedUrl,
  objectKey,
  onUploadComplete,
  className,
  successMessage,
  errorMessage,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const handleZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const handleZoomValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setZoom(Number(e.target.value));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!imageUrl) return;

    setIsUploading(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const croppedArea = await new Promise<Area>((resolve) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          resolve({
            x: crop.x * width,
            y: crop.y * height,
            width: width * (1 / zoom),
            height: height * (1 / zoom),
          });
        };
      });

      canvas.width = croppedArea.width;
      canvas.height = croppedArea.height;

      const img = new Image();
      img.src = imageUrl;
      await new Promise<void>((resolve) => {
        img.onload = () => {
          ctx.drawImage(
            img,
            croppedArea.x,
            croppedArea.y,
            croppedArea.width,
            croppedArea.height,
            0,
            0,
            croppedArea.width,
            croppedArea.height
          );
          resolve();
        };
      });

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg");
      });

      if (!blob) throw new Error("Failed to create blob");

      const presignedUrl = await getPresignedUrl(
        objectKey,
        S3CommandType.PutObject
      );
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: blob,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      setMessage({
        type: "success",
        message: successMessage ?? "Image saved successfully",
      });

      if (onUploadComplete) {
        await onUploadComplete();
      }
    } catch (error) {
      console.error("Error saving image:", error);
      setMessage({
        type: "error",
        message: errorMessage ?? "Failed to save image",
      });
    } finally {
      setIsUploading(false);
    }
  }, [
    imageUrl,
    crop,
    zoom,
    objectKey,
    getPresignedUrl,
    onUploadComplete,
    successMessage,
    errorMessage,
  ]);

  return (
    <div className={cn("flex flex-col gap-4 w-full max-w-2xl", className)}>
      <div className="relative w-full h-[400px]">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={handleZoomChange}
          cropShape="round"
          showGrid={true}
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="zoom"
            className="text-md font-bold font-mono text-text-primary"
          >
            Zoom
          </label>
          <input
            id="zoom"
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={handleZoomValueChange}
            className="w-full h-2 bg-background-alt rounded-lg appearance-none cursor-pointer"
          />
        </div>
        {message && (
          <Message
            type={message.type}
            message={message.message}
            className="mt-2"
          />
        )}
        <div className="flex gap-2 justify-end">
          <Button
            onClick={onCancel}
            className="hover:border-b-[1px] hover:opacity-70 border-foreground text-foreground p-2 transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isUploading}
            className="hover:border-b-[1px] hover:opacity-70 border-primary-action text-primary-action p-2 transition-all duration-200 disabled:opacity-50"
          >
            {isUploading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
