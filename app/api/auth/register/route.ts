import { API_ERRORS, API_SUCCESS } from "@/lib/response";
import createProfile from "@/lib/services/auth/register";
import { RegisterSchema } from "@/lib/types/auth";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req: NextRequest) {
	if (req.method != 'POST') {
		return NextResponse.json (
			{ error: API_ERRORS.METHOD_FORBIDDEN },
			{ status: 405 }
		)
	}

	const body = await req.json();

	const data = RegisterSchema.safeParse(body);

	if (!data.success) {
		return NextResponse.json (
			{ error: API_ERRORS.BAD_REQUEST },
			{ status: 400 }
		)
	}

	const { firstname, lastname, birthday, email, password } = data.data;
	
	try {
		const result = await createProfile
		(
			firstname,
			lastname,
			birthday,
			email,
			password
		);

		const token = await new SignJWT({ result })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('7d')
		.sign(new TextEncoder().encode(JWT_SECRET));

		const response = NextResponse.json(
			{ message: API_SUCCESS.CREATED },
			{ status: 201 });
			response.cookies.set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 7 * 24 * 60 * 60,
		});

		return response;

	} catch (err: any) {
		if (err.message === 'Email already used') {
			return NextResponse.json (
				{ error: err.message },
				{ status: 409 }
			)
		}

		return NextResponse.json (
			{ error: API_ERRORS.INTERNAL_ERROR },
			{ status: 500 }
		)
	}
}