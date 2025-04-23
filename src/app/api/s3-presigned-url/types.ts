import { z } from "zod";
import { S3CommandType } from "@/app/lib/server/storage/s3";

export const getPresignedUrlQuerySchema = z.object({
  key: z.string(),
  type: z.nativeEnum(S3CommandType),
});
