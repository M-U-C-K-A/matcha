import likeUser from "@/lib/services/rating/likeUser";
import getUserIdFromToken from "@/lib/utils/middleware";
import { API_ERRORS, API_SUCCESS } from "@/lib/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	if (req.method != 'POST') {
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

	const body = await req.json();

	const { other_user_id } = body;

	try {
		const result = await likeUser(
			userId,
			other_user_id
		)

		return NextResponse.json (
			{ message: API_SUCCESS.OK },
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