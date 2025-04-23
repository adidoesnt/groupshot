import { getPresignedUrl, S3CommandType } from "./s3";

export const getPresignedUrlForProfilePictureUpload = async (userId: string) => {
  const key = `profile-pictures/${userId}`;
  return getPresignedUrl(key, S3CommandType.PutObject);
};
