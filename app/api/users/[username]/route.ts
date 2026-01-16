import getUserIdFromToken from "@/lib/utils/middleware";
import { API_ERRORS } from "@/lib/utils/response";
import { NextRequest, NextResponse } from "next/server";
import { getProfileByUsername } from "@/lib/services/profile/getProfileByUsername";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
	if (req.method != 'GET') {
		return NextResponse.json (
			{ error: API_ERRORS.METHOD_FORBIDDEN },
			{ status: 405 }
		);
	}

	const userId = await getUserIdFromToken(req);
	if (!userId) {
		return NextResponse.json (
			{ error: API_ERRORS.UNAUTHORIZED},
			{ status: 401 }
		);
	}

	const { username } = await params;

	try {
		const result = await getProfileByUsername(
			username,
		);

		if (!result) {
			return NextResponse.json (
				{ error: API_ERRORS.NOT_FOUND },
				{ status: 404 }
			);
		}

		return NextResponse.json (
			result,
			{ status: 200 },
		);
	} catch (err: any) {
		return NextResponse.json (
			{ error: API_ERRORS.INTERNAL_ERROR },
			{ status: 500 }
		);
	}
}