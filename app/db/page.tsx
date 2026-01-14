'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Database, Table as TableIcon, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
    ColumnDef,
    PaginationState,
} from "@tanstack/react-table"
import { DataTable } from './components/data-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { Checkbox } from "@/components/ui/checkbox"

interface Column {
    column_name: string;
    data_type: string;
    is_nullable: string;
    column_default: string | null;
}

interface TableData {
    table: string;
    columns: Column[];
    rows: Record<string, unknown>[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}

export default function DatabaseViewerPage() {
    const [tables, setTables] = useState<string[]>([]);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [loading, setLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);

    // Pagination state compatible with tanstack table
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 25,
    });

    // Fetch tables list
    const fetchTables = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/db/tables');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.details || data.error || 'Failed to fetch tables');
            }

            setTables(data.tables || []);
            setConnected(data.connected);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to connect to database');
            setConnected(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch table data
    const fetchTableData = useCallback(async (tableName: string, pageIndex: number, pageSize: number) => {
        setTableLoading(true);
        setError(null);
        try {
            const offset = pageIndex * pageSize;
            const res = await fetch(`/api/db/tables/${tableName}?limit=${pageSize}&offset=${offset}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.details || data.error || 'Failed to fetch table data');
            }

            setTableData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch table data');
        } finally {
            setTableLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTables();
    }, [fetchTables]);

    // Fetch data when table, page, or page size changes
    useEffect(() => {
        if (selectedTable) {
            fetchTableData(selectedTable, pagination.pageIndex, pagination.pageSize);
        }
    }, [selectedTable, pagination.pageIndex, pagination.pageSize, fetchTableData]);

    const handleTableSelect = (tableName: string) => {
        setSelectedTable(tableName);
        setTableData(null);
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    };

    const formatValue = (value: unknown): string => {
        if (value === null) return 'NULL';
        if (value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        if (typeof value === 'boolean') return value ? 'true' : 'false';
        return String(value);
    };

    const columns = useMemo<ColumnDef<Record<string, unknown>>[]>(() => {
        if (!tableData) return [];

        const dynamicColumns: ColumnDef<Record<string, unknown>>[] = tableData.columns.map((col) => ({
            accessorKey: col.column_name,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={col.column_name} />
            ),
            cell: ({ row }) => {
                const value = row.getValue(col.column_name);
                return (
                    <div className="max-w-xs truncate" title={formatValue(value)}>
                        {value === null ? (
                            <span className="text-gray-600 italic">NULL</span>
                        ) : (
                            formatValue(value)
                        )}
                    </div>
                )
            },
            enableSorting: true,
            enableHiding: true,
        }));

        // Add selection column at the start
        return [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            ...dynamicColumns
        ];
    }, [tableData]);

    const pageCount = tableData ? Math.ceil(tableData.total / pagination.pageSize) : -1;

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Database className="w-6 h-6 text-purple-400" />
                        <h1 className="text-xl font-semibold">Database Viewer</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 text-sm ${connected ? 'text-green-400' : 'text-red-400'}`}>
                            {connected ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Connected</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Disconnected</span>
                                </>
                            )}
                        </div>
                        <button
                            onClick={fetchTables}
                            disabled={loading}
                            className="p-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-screen-4xl mx-auto px-6 py-8 flex gap-6">
                {/* Sidebar - Tables List */}
                <aside className="w-64 shrink-0">
                    <div className="border border-gray-800 rounded-xl p-4 sticky top-24">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <TableIcon className="w-4 h-4" />
                            Tables ({tables.length})
                        </h2>

                        {loading ? (
                            <div className="space-y-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-10 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        ) : tables.length === 0 ? (
                            <p className="text-gray-500 text-sm">No tables found</p>
                        ) : (
                            <ul className="space-y-1">
                                {tables.map((table) => (
                                    <li key={table}>
                                        <button
                                            onClick={() => handleTableSelect(table)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedTable === table
                                                ? 'text-purple-400 font-medium'
                                                : 'text-gray-300'
                                                }`}
                                        >
                                            {table}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    {!selectedTable ? (
                        <div className="border rounded-xl p-12 text-center">
                            <Database className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a Table</h3>
                            <p className="text-gray-500">Choose a table from the sidebar to view its data</p>
                        </div>
                    ) : tableLoading ? (
                        <div className="border rounded-xl p-12 text-center">
                            <RefreshCw className="w-8 h-8 text-purple-400 mx-auto mb-4 animate-spin" />
                            <p className="text-gray-400">Loading table data...</p>
                        </div>
                    ) : tableData ? (
                        <div className="space-y-4">
                            {/* Table Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{tableData.table}</h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {tableData.total} rows • {tableData.columns.length} columns
                                    </p>
                                </div>
                            </div>

                            <DataTable
                                columns={columns}
                                data={tableData.rows}
                                pageCount={pageCount}
                                pagination={pagination}
                                onPaginationChange={setPagination}
                            />
                        </div>
                    ) : null}
                </main>
            </div>
        </div>
    );
}
