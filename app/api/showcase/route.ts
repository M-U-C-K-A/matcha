import { hasUserNotification } from "@/lib/services/profile/notification";
import getOptimizedMatches from "@/lib/services/showcase/matches";
import getUserIdFromToken from "@/lib/utils/middleware";
import { API_ERRORS } from "@/lib/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	if (req.method != 'GET') {
		return NextResponse.json (
			{ error: API_ERRORS.METHOD_FORBIDDEN },
			{ status: 405 }
		)
	}

	const userId = await getUserIdFromToken(req);
	if (!userId) {
		return NextResponse.json (
			{ error: API_ERRORS.UNAUTHORIZED},
			{ status: 401 }
		)
	}

	try {
		const result = await getOptimizedMatches(
			userId
		)

		return NextResponse.json (
			result,
			{ status: 200 }
		);
	} catch (err: any) {
		if (err.message === 'User not found') {
			return NextResponse.json (
				{ error: API_ERRORS.NOT_FOUND },
				{ status: 404 }
			)
		}

		return NextResponse.json (
			{ error: API_ERRORS.INTERNAL_ERROR },
			{ status: 500 }
		)
	}
}