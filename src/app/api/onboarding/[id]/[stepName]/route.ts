import { updateOnboardingStepInstance } from "@/app/lib/server/database/onboarding";
import { NextRequest, NextResponse } from "next/server";
import {
  UpdateOnboardingStepInstanceParams,
  updateOnboardingStepInstanceSchema,
} from "@/app/api/onboarding/types";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<UpdateOnboardingStepInstanceParams> }
) {
  try {
    const body = await request.json();
    const { id, ...rest } = await params;
    const validatedBody = updateOnboardingStepInstanceSchema.safeParse({
      ...body,
      onboardingId: id,
      ...rest,
    });

    if (!validatedBody.success) {
      return NextResponse.json({ error: validatedBody.error }, { status: 400 });
    }

    const { onboardingId, stepName, updates } = validatedBody.data;
    await updateOnboardingStepInstance(onboardingId, stepName, updates);

    return NextResponse.json(
      { message: "Onboarding step updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
