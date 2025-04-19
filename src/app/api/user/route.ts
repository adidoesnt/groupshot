import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserById } from "@/app/lib/server/database/user";
import { createUserSchema, UserWithOnboarding } from "./types";

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

// Get user
export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = (await getUserById(id, {
      onboarding: {
        include: {
          steps: {
            include: {
              step: true,
            },
          },
        },
      },
    })) as UserWithOnboarding;

    console.log("Fetched user", user);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error getting user", error);
    return NextResponse.json({ error: "Error getting user" }, { status: 500 });
  }
};
