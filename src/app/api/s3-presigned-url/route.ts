import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrl } from "@/app/lib/server/storage/s3";
import { getPresignedUrlQuerySchema } from "./types";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = {
      key: searchParams.get("key"),
      type: searchParams.get("type"),
    };
    const validatedQuery = getPresignedUrlQuerySchema.safeParse(query);

    if (!validatedQuery.success) {
      return NextResponse.json(
        { error: validatedQuery.error.message },
        { status: 400 }
      );
    }

    const { key, type } = validatedQuery.data;
    const presignedUrl = await getPresignedUrl(key, type);

    return NextResponse.json({ presignedUrl });
  } catch (error) {
    console.error("Error getting presigned url", error);
    return NextResponse.json(
      { error: "Error getting presigned url" },
      { status: 500 }
    );
  }
};
