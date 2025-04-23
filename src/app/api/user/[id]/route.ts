import { getUserById, updateUser } from "@/app/lib/server/database/user";
import { NextRequest, NextResponse } from "next/server";
import {
  GetUserRequestParams,
  UpdateUserRequestParams,
  updateUserSchema,
  UserWithOnboarding,
} from "../types";
import { getJson } from "../../../lib/utils/json";

// Update user
export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<UpdateUserRequestParams> }
) => {
  try {
    const body = await request.json();
    const validatedBody = updateUserSchema.safeParse({
      id: (await params).id,
      updates: body,
    });

    if (!validatedBody.success) {
      throw new Error("Invalid request body", {
        cause: validatedBody.error,
        status: 400,
      } as Error & { status: number });
    }

    const { id, updates } = validatedBody.data;

    const user = await updateUser(id, updates);

    return NextResponse.json(getJson(user));
  } catch (error) {
    console.error("Error updating user", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
};

// Get user
export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<GetUserRequestParams> }
) => {
  try {
    const id = (await params).id;

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

    return NextResponse.json(getJson(user));
  } catch (error) {
    console.error("Error getting user", error);
    return NextResponse.json({ error: "Error getting user" }, { status: 500 });
  }
};
