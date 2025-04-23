import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import { cn } from "@/app/lib/utils/cn";
import { Area } from "react-easy-crop";
type ImageCropperProps = {
  imageUrl: string;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  className?: string;
};

export default function ImageCropper({
  imageUrl,
  onCropComplete,
  className,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      onCropComplete(croppedArea, croppedAreaPixels);
    },
    [onCropComplete]
  );

  const handleZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const handleZoomValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(e.target.value));
  }, []);

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
          onCropComplete={handleCropComplete}
          cropShape="round"
          showGrid={true}
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="zoom" className="text-md font-bold font-mono text-text-primary">
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
      </div>
    </div>
  );
}
