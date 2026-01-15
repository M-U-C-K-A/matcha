import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Workflow:
 * 
 * [Client Request]
 *        |
 * [Read 'token' cookie] ---- (Missing) ----> [Unauthenticated Response]
 *        | (Found)
 * [Verify JWT Payload] ----- (Invalid) ----> [Unauthenticated Response]
 *        | (Valid)
 * [Return Authenticated + userId]
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

        return NextResponse.json({
            authenticated: true,
            userId: payload.id,
        });
    } catch (error) {
        return NextResponse.json(
            { authenticated: false, userId: null, error: 'Invalid token' },
            { status: 200 }
        );
    }
}
