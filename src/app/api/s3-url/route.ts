import { NextRequest, NextResponse } from "next/server";
import { getS3UrlQuerySchema } from "./types";
import { getS3Url } from "@/app/lib/server/storage/s3";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = {
      key: searchParams.get("key"),
    };
    const validatedQuery = getS3UrlQuerySchema.safeParse(query);

    if (!validatedQuery.success) {
      return NextResponse.json(
        { error: validatedQuery.error.message },
        { status: 400 }
      );
    }

    const { key } = validatedQuery.data;
    const url = await getS3Url(key);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error getting presigned url", error);
    return NextResponse.json(
      { error: "Error getting presigned url" },
      { status: 500 }
    );
  }
};
