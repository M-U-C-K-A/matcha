import getUserIdFromToken from "@/lib/utils/middleware";
import { API_ERRORS, API_SUCCESS } from "@/lib/utils/response";
import { EditProfileSchema } from "@/lib/types/profile";
import { NextRequest, NextResponse } from "next/server";
import editProfile from "@/lib/services/profile/edit";

export async function PATCH(req: NextRequest) {
	if (req.method != 'PATCH') {
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

	const data = EditProfileSchema.safeParse(body);

	if (!data.success) {
		return NextResponse.json (
			{ error: API_ERRORS.BAD_REQUEST },
			{ status: 400 }
		)
	}

	const {gender, sex_preference, bio, city, latitude, longitude} = data.data;

	try {
		await editProfile(
			userId,
			gender,
			sex_preference,
			bio,
			city,
			latitude,
			longitude
		)
		return NextResponse.json (
			{ error: API_SUCCESS.OK },
			{ status: 200 },
		)
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