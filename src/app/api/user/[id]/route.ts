import { updateUser } from "@/app/lib/server/database/user";
import { NextRequest, NextResponse } from "next/server";
import { UpdateUserRequestParams, updateUserSchema } from "../types";
import { getJson } from "../../utils";

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
