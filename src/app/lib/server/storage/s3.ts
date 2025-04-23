import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const {
  AWS_ACCESS_KEY_ID = "dummy-key-id",
  AWS_SECRET_ACCESS_KEY = "dummy-key-secret",
  AWS_REGION = "eu-west-2",
  AWS_BUCKET_NAME = "groupshot-dev-bucket",
  AWS_PRESIGNED_URL_EXPIRATION = "300",
  NODE_ENV = "development",
  AWS_LOCALSTACK_ENDPOINT = "http://localhost:4566",
} = process.env;

let s3Client: S3Client;

if (NODE_ENV !== "development") {
  s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
} else {
  s3Client = new S3Client({
    region: AWS_REGION,
    endpoint: AWS_LOCALSTACK_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
}

export enum S3CommandType {
  GetObject = "GetObject",
  PutObject = "PutObject",
  DeleteObject = "DeleteObject",
  HeadObject = "HeadObject",
}

export const getPresignedUrl = async (
  key: string,
  commandType: S3CommandType
) => {
  let command:
    | GetObjectCommand
    | PutObjectCommand
    | DeleteObjectCommand
    | HeadObjectCommand;

  switch (commandType) {
    case S3CommandType.GetObject:
      command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
      });
      break;
    case S3CommandType.PutObject:
      command = new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
      });
      break;
    case S3CommandType.DeleteObject:
      command = new DeleteObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
      });
      break;
    case S3CommandType.HeadObject:
      command = new HeadObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
      });
      break;
    default:
      throw new Error(`Invalid command type: ${commandType}`);
  }

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: Number(AWS_PRESIGNED_URL_EXPIRATION) || 3600,
  });

  return presignedUrl;
};

export const getS3Url = async (key: string) => {
  return NODE_ENV === "development"
    ? `http://localhost:4566/${AWS_BUCKET_NAME}/${key}`
    : `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};

export default s3Client;
