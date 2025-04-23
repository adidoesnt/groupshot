import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
} from "@/app/lib/server/database/user";
import {
  createUserSchema,
} from "./types";
import { getJson } from "../utils";

// These endpoints should be protected by the middleware in src/middleware.ts

// Create user
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validatedBody = createUserSchema.safeParse(body);

    if (!validatedBody.success) {
      throw new Error("Invalid request body", {
        cause: validatedBody.error,
        status: 400,
      } as Error & { status: number });
    }

    const { email, firstName, lastName, id } = validatedBody.data;

    const user = await createUser({
      id,
      email,
      firstName,
      lastName,
      profilePictureUrl: null,
      createdAt: null, // defaults to now
      updatedAt: null, // defaults to now
    });

    return NextResponse.json(getJson(user));
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json(
      { error: "Error creating user" },
      {
        status: (error as Error & { status: number }).status ?? 500,
      }
    );
  }
};
