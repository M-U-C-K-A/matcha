import { NextResponse } from 'next/server';
import { getTables, checkConnection } from '@/lib/db';

export async function GET() {
    try {
        // Check connection first
        const isConnected = await checkConnection();
        if (!isConnected) {
            return NextResponse.json(
                { error: 'Database connection failed' },
                { status: 500 }
            );
        }

        // Get all tables
        const tables = await getTables();
        
        return NextResponse.json({ tables, connected: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to fetch tables', 
                details: error instanceof Error ? error.message : 'Unknown error',
                connected: false 
            },
            { status: 500 }
        );
    }
}
