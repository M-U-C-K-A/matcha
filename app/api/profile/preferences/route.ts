import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { PreferencesSchema } from '@/lib/types/auth';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

async function getUserIdFromToken(token: string): Promise<string | null> {
    if (!JWT_SECRET) return null;
    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );
        return payload.result as string;
    } catch {
        return null;
    }
}

export async function PATCH(req: NextRequest) {
    try {
        // Get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = await getUserIdFromToken(token);
        if (!userId) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const data = PreferencesSchema.safeParse(body);

        if (!data.success) {
            return NextResponse.json(
                { error: 'Invalid data', details: data.error.issues },
                { status: 400 }
            );
        }

        const { bio, gender, sex_preference, city, latitude, longitude } = data.data;

        // Build dynamic update query
        const updates: string[] = [];
        const values: unknown[] = [];
        let paramIndex = 1;

        if (bio !== undefined) {
            updates.push(`bio = $${paramIndex++}`);
            values.push(bio);
        }
        if (gender !== undefined) {
            updates.push(`gender = $${paramIndex++}`);
            values.push(gender);
        }
        if (sex_preference !== undefined) {
            updates.push(`sex_preference = $${paramIndex++}`);
            values.push(sex_preference);
        }
        if (city !== undefined) {
            updates.push(`city = $${paramIndex++}`);
            values.push(city);
        }
        if (latitude !== undefined) {
            updates.push(`latitude = $${paramIndex++}`);
            values.push(latitude);
        }
        if (longitude !== undefined) {
            updates.push(`longitude = $${paramIndex++}`);
            values.push(longitude);
        }

        if (updates.length === 0) {
            return NextResponse.json(
                { message: 'No changes provided' },
                { status: 200 }
            );
        }

        values.push(userId);
        const query = `UPDATE profiles SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
        
        await pool.query(query, values);

        return NextResponse.json(
            { message: 'Preferences updated successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Preferences update error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
