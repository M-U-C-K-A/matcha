import { NextResponse } from "next/server";
import { API_SUCCESS } from "./response";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function createCookie(result: any) {
	const token = await new SignJWT({ id: result })
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
}