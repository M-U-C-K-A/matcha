import { Pool, QueryResult, QueryResultRow } from 'pg';

// Create a connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Optional: configure pool settings
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Generic query function
export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
): Promise<QueryResult<T>> {
    const start = Date.now();
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
}

// Get all tables in the database
export async function getTables(): Promise<string[]> {
    const result = await query<{ tablename: string }>(
        `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`
    );
    return result.rows.map(row => row.tablename);
}

// Get table columns info
export async function getTableColumns(tableName: string): Promise<{
    column_name: string;
    data_type: string;
    is_nullable: string;
    column_default: string | null;
}[]> {
    const result = await query(
        `SELECT column_name, data_type, is_nullable, column_default 
         FROM information_schema.columns 
         WHERE table_schema = 'public' AND table_name = $1 
         ORDER BY ordinal_position`,
        [tableName]
    );
    return result.rows as {
        column_name: string;
        data_type: string;
        is_nullable: string;
        column_default: string | null;
    }[];
}

// Get table data with pagination
export async function getTableData(
    tableName: string,
    limit: number = 50,
    offset: number = 0
): Promise<{ rows: Record<string, unknown>[]; total: number }> {
    // Validate table name to prevent SQL injection
    const tables = await getTables();
    if (!tables.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
    }

    // Get total count
    const countResult = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM "${tableName}"`
    );
    const total = parseInt(countResult.rows[0].count, 10);

    // Get paginated data
    const dataResult = await query(
        `SELECT * FROM "${tableName}" LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return { rows: dataResult.rows, total };
}

// Get table row count
export async function getTableRowCount(tableName: string): Promise<number> {
    const tables = await getTables();
    if (!tables.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
    }
    
    const result = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM "${tableName}"`
    );
    return parseInt(result.rows[0].count, 10);
}

// Execute raw SQL (for admin purposes)
export async function executeRawSQL(sql: string): Promise<QueryResult> {
    return await query(sql);
}

// Check database connection
export async function checkConnection(): Promise<boolean> {
    try {
        await query('SELECT 1');
        return true;
    } catch {
        return false;
    }
}

export default pool;
