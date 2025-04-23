import UploadIcon from "@/app/lib/icons/Upload";
import { cn } from "@/app/lib/utils/cn";
import Card from "@/app/lib/components/Card";

type ImageUploadProps = {
  handleUpload: (file: File) => void;
  className?: string;
};

export default function ImageUpload({ handleUpload, className }: ImageUploadProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Card
        title={{
          text: "Upload Profile Picture",
          className: "text-text-primary font-mono",
        }}
        description={{
          text: "Upload a profile picture to your account",
          className: "text-primary-action font-sans",
        }}
        className="bg-background-alt"
      >
        <div className="flex flex-col items-center gap-4 p-4">
          <label className="w-full">
            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary-action rounded-lg cursor-pointer hover:bg-background-alt/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-8 h-8 mb-4 text-primary-action" />
                <p className="mb-2 text-sm text-text-primary">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-text-secondary">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
              />
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
}
