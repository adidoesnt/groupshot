import { z } from "zod";

export const getS3UrlQuerySchema = z.object({
  key: z.string(),
});

export type GetS3UrlQuery = z.infer<typeof getS3UrlQuerySchema>;
