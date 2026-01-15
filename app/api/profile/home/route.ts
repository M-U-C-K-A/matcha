import { NextRequest, NextResponse } from "next/server";
import { getProfileByUsername } from "@/lib/services/profile/get";
import { API_ERRORS } from "@/lib/utils/response";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
        );
    }

    try {
        const profile = await getProfileByUsername(username);

        if (!profile) {
            return NextResponse.json(
                { error: API_ERRORS.NOT_FOUND },
                { status: 404 }
            );
        }

        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
            { error: API_ERRORS.INTERNAL_ERROR },
            { status: 500 }
        );
    }
}
