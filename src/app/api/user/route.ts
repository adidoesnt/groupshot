import { NextRequest, NextResponse } from "next/server";
import { createUser, updateUser } from "@/app/lib/server/database/user";
import { createUserSchema, updateUserSchema } from "./types";

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

    const { email, firstName, lastName, id, enabled } = validatedBody.data;

    const user = await createUser({
      id,
      email,
      firstName,
      lastName,
      enabled,
      onboardingCompleted: null, // defaults to false
      profilePictureUrl: null,
      createdAt: null, // defaults to now
      updatedAt: null, // defaults to now
    });

    return NextResponse.json(user);
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

// Update user
export const PUT = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validatedBody = updateUserSchema.safeParse(body);

    if (!validatedBody.success) {
      throw new Error("Invalid request body", {
        cause: validatedBody.error,
        status: 400,
      } as Error & { status: number });
    }

    const { id, updates } = validatedBody.data;

    const user = await updateUser(id, updates);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
};
