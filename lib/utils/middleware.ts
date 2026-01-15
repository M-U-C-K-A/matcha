import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function getUserIdFromToken(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value;
		if (!token) {
			return null;
		}

		const { payload } = await jwtVerify(
			token,
			new TextEncoder().encode(JWT_SECRET)
		);

		return payload.id as string;
	} catch (err) {
		return null;
	}
}
