import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * 
 * Clears the JWT token cookie to log the user out.
 * 
 * Flow:
 * [POST Request]
 *        |
 * [Set token cookie with maxAge: 0]
 *        |
 * [Return success message]
 */
export async function POST() {
    const response = NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 }
    );

    // Clear the token cookie
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0, // Expire immediately
    });

    return response;
}
