"use client"

import { useEffect, useState } from "react"
import { Database, RefreshCw, Table as TableIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// List of tables from the new schema
const TABLES = [
    "profiles",
    "photos",
    "tags",
    "users_preferences",
    "likes",
    "reports",
    "blocks",
    "chats",
    "events",
    "notifications",
]

interface TableData {
    columns: { column_name: string; data_type: string }[];
    rows: Record<string, unknown>[];
    total: number;
}

export default function DbPage() {
    const [selectedTable, setSelectedTable] = useState<string | null>(null)
    const [tableData, setTableData] = useState<TableData | null>(null)
    const [loading, setLoading] = useState(false)

    // Check if we are in development mode
    const isDev = process.env.NODE_ENV === "development"

    const fetchTableData = async (tableName: string) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/db/tables/${tableName}?limit=50`)
            if (!res.ok) throw new Error("Failed to fetch")
            const data = await res.json()
            setTableData(data)
        } catch (error) {
            console.error(error)
            setTableData(null)
        } finally {
            setLoading(false)
        }
    }

    const handleTableSelect = (table: string) => {
        setSelectedTable(table)
        fetchTableData(table)
    }

    if (!isDev) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p className="text-muted-foreground">This page is only available in development mode.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-6">
            <header className="mb-8">
                <div className="flex items-center gap-3">
                    <Database className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold">Database Viewer</h1>
                    <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-full">DEV ONLY</span>
                </div>
                <p className="text-muted-foreground mt-1">Inspect and browse your Matcha database tables.</p>
            </header>

            <div className="flex gap-6">
                {/* Sidebar */}
                <aside className="w-64 shrink-0">
                    <div className="border rounded-xl p-4 sticky top-6">
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <TableIcon className="w-4 h-4" />
                            Tables ({TABLES.length})
                        </h2>
                        <ul className="space-y-1">
                            {TABLES.map((table) => (
                                <li key={table}>
                                    <button
                                        onClick={() => handleTableSelect(table)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedTable === table
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-muted-foreground hover:bg-muted"
                                            }`}
                                    >
                                        {table}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {!selectedTable ? (
                        <div className="border border-dashed rounded-xl p-12 text-center">
                            <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Select a Table</h3>
                            <p className="text-muted-foreground">Choose a table from the sidebar to view its data.</p>
                        </div>
                    ) : loading ? (
                        <div className="border rounded-xl p-12 text-center">
                            <RefreshCw className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
                            <p className="text-muted-foreground">Loading {selectedTable}...</p>
                        </div>
                    ) : tableData ? (
                        <div className="border rounded-xl overflow-hidden">
                            <div className="p-4 border-b flex items-center justify-between">
                                <h2 className="font-semibold">{selectedTable}</h2>
                                <span className="text-sm text-muted-foreground">{tableData.total} rows</span>
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {tableData.columns.map((col) => (
                                                <TableHead key={col.column_name}>{col.column_name}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tableData.rows.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={tableData.columns.length} className="text-center text-muted-foreground py-8">
                                                    No data in this table.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            tableData.rows.map((row, i) => (
                                                <TableRow key={i}>
                                                    {tableData.columns.map((col) => (
                                                        <TableCell key={col.column_name} className="max-w-[200px] truncate">
                                                            {String(row[col.column_name] ?? "")}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ) : (
                        <div className="border border-dashed rounded-xl p-12 text-center text-destructive">
                            <p>Failed to load table data. Check API connection.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
