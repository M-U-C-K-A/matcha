import { API_ERRORS } from "@/lib/utils/response";
import { LoginSchema } from "@/lib/types/auth";
import { NextRequest, NextResponse } from "next/server";
import createCookie from "@/lib/utils/createCookie";
import loginUser from "@/lib/services/auth/login";

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req: NextRequest) {
	if (req.method != 'POST') {
		return NextResponse.json (
			{ error: API_ERRORS.METHOD_FORBIDDEN },
			{ status: 405 }
		)
	}

	const body = await req.json();

	const data = LoginSchema.safeParse(body);

	if (!data.success) {
		return NextResponse.json (
			{ error: API_ERRORS.BAD_REQUEST },
			{ status: 400 }
		)
	}

	const { email, password } = data.data;
	
	try {
		const result = await loginUser
		(
			email,
			password
		);

		return createCookie(result);
	} catch (err: any) {
		if (err.message === 'This account does not exist') {
			return NextResponse.json (
				{ error: err.message },
				{ status: 404 }
			)
		} else if (err.message == 'Wrong Password') {
			return NextResponse.json (
				{ error: err.message },
				{ status: 403 }
			)
		}

		return NextResponse.json (
			{ error: API_ERRORS.INTERNAL_ERROR },
			{ status: 500 }
		)
	}
}