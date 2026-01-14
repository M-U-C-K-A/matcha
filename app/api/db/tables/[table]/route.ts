import { NextRequest, NextResponse } from 'next/server';
import { getTableData, getTableColumns } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ table: string }> }
) {
    try {
        const { table } = await params;
        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        // Get columns info
        const columns = await getTableColumns(table);
        
        // Get table data with pagination
        const { rows, total } = await getTableData(table, limit, offset);

        return NextResponse.json({
            table,
            columns,
            rows,
            total,
            limit,
            offset,
            hasMore: offset + rows.length < total
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to fetch table data', 
                details: error instanceof Error ? error.message : 'Unknown error' 
            },
            { status: 500 }
        );
    }
}
