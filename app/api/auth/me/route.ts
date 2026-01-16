import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import pool from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * GET /api/auth/me
 * 
 * Returns the authenticated user's information from the database.
 * 
 * Workflow:
 * [Client Request]
 *        |
 * [Read 'token' cookie] ---- (Missing) ----> [Unauthenticated Response]
 *        | (Found)
 * [Verify JWT Payload] ----- (Invalid) ----> [Unauthenticated Response]
 *        | (Valid)
 * [Fetch user info from DB]
 *        |
 * [Return Authenticated + user info]
 */
export async function GET(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { authenticated: false, userId: null },
                { status: 200 }
            );
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );

        const userId = payload.id as string;

        // Fetch user profile from database
        const profileResult = await pool.query(`
            SELECT 
                id,
                username,
                firstname,
                lastname,
                email
            FROM profiles
            WHERE id = $1
        `, [userId]);

        if (!profileResult.rowCount) {
            return NextResponse.json(
                { authenticated: false, userId: null, error: 'User not found' },
                { status: 200 }
            );
        }

        const profile = profileResult.rows[0];

        // Fetch profile picture
        const photoResult = await pool.query(`
            SELECT url FROM photos 
            WHERE user_id = $1 AND profile_picture = true
            LIMIT 1
        `, [userId]);

        const avatar = photoResult.rows[0]?.url || null;

        return NextResponse.json({
            authenticated: true,
            userId: profile.id,
            username: profile.username,
            firstname: profile.firstname,
            lastname: profile.lastname,
            email: profile.email,
            avatar,
        });
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { authenticated: false, userId: null, error: 'Invalid token' },
            { status: 200 }
        );
    }
}
