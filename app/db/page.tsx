"use client"

import { useEffect, useState, useMemo } from "react"
import { Database, RefreshCw, Table as TableIcon, ChevronLeft, ChevronRight, Filter, Columns, Search, X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100, 200]

interface TableData {
    columns: { column_name: string; data_type: string }[];
    rows: Record<string, unknown>[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}

export default function DbPage() {
    const [selectedTable, setSelectedTable] = useState<string | null>(null)
    const [tableData, setTableData] = useState<TableData | null>(null)
    const [loading, setLoading] = useState(false)

    // Pagination state
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [currentPage, setCurrentPage] = useState(0)

    // Column visibility state
    const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set())

    // Filter state
    const [filterColumn, setFilterColumn] = useState<string>("")
    const [filterValue, setFilterValue] = useState("")

    // Sort state: null = no sort, 'asc' = ascending, 'desc' = descending
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null)

    // Check if we are in development mode
    const isDev = process.env.NODE_ENV === "development"

    const fetchTableData = async (tableName: string, limit: number, offset: number) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/db/tables/${tableName}?limit=${limit}&offset=${offset}`)
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
        setCurrentPage(0)
        setHiddenColumns(new Set())
        setFilterColumn("")
        setFilterValue("")
        setSortColumn(null)
        setSortDirection(null)
        fetchTableData(table, rowsPerPage, 0)
    }

    // Handle column header click for sorting
    const handleSort = (columnName: string) => {
        if (sortColumn !== columnName) {
            // New column: start with asc
            setSortColumn(columnName)
            setSortDirection('asc')
        } else if (sortDirection === 'asc') {
            // Same column, was asc: switch to desc
            setSortDirection('desc')
        } else if (sortDirection === 'desc') {
            // Same column, was desc: reset
            setSortColumn(null)
            setSortDirection(null)
        } else {
            // Was null: start with asc
            setSortDirection('asc')
        }
    }

    const handlePageChange = (newPage: number) => {
        if (!selectedTable) return
        setCurrentPage(newPage)
        fetchTableData(selectedTable, rowsPerPage, newPage * rowsPerPage)
    }

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        if (!selectedTable) return
        setRowsPerPage(newRowsPerPage)
        setCurrentPage(0)
        fetchTableData(selectedTable, newRowsPerPage, 0)
    }

    const toggleColumnVisibility = (columnName: string) => {
        setHiddenColumns(prev => {
            const newSet = new Set(prev)
            if (newSet.has(columnName)) {
                newSet.delete(columnName)
            } else {
                newSet.add(columnName)
            }
            return newSet
        })
    }

    const showAllColumns = () => setHiddenColumns(new Set())
    const hideAllColumns = () => {
        if (tableData) {
            // Keep at least the first column visible
            const allButFirst = new Set(tableData.columns.slice(1).map(c => c.column_name))
            setHiddenColumns(allButFirst)
        }
    }

    // Filter rows client-side
    const filteredRows = useMemo(() => {
        if (!tableData) return []
        let rows = tableData.rows

        // Apply filter
        if (filterColumn && filterValue) {
            rows = rows.filter(row => {
                const cellValue = String(row[filterColumn] ?? "").toLowerCase()
                return cellValue.includes(filterValue.toLowerCase())
            })
        }

        // Apply sort
        if (sortColumn && sortDirection) {
            rows = [...rows].sort((a, b) => {
                const aVal = a[sortColumn]
                const bVal = b[sortColumn]

                // Handle null/undefined
                if (aVal == null && bVal == null) return 0
                if (aVal == null) return sortDirection === 'asc' ? 1 : -1
                if (bVal == null) return sortDirection === 'asc' ? -1 : 1

                // Compare values
                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
                }

                const aStr = String(aVal).toLowerCase()
                const bStr = String(bVal).toLowerCase()
                if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1
                if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1
                return 0
            })
        }

        return rows
    }, [tableData, filterColumn, filterValue, sortColumn, sortDirection])

    const visibleColumns = useMemo(() => {
        if (!tableData) return []
        return tableData.columns.filter(col => !hiddenColumns.has(col.column_name))
    }, [tableData, hiddenColumns])

    const totalPages = tableData ? Math.ceil(tableData.total / rowsPerPage) : 0

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
                <main className="flex-1 min-w-0">
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
                            {/* Header with controls */}
                            <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-semibold">{selectedTable}</h2>
                                    <span className="text-sm text-muted-foreground">
                                        {tableData.total} rows total
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {/* Filter */}
                                    <Popover>
                                        <PopoverTrigger className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md hover:bg-muted">
                                            <Filter className="w-4 h-4" />
                                            Filter
                                            {filterValue && <span className="ml-1 text-xs bg-primary/20 px-1 rounded">1</span>}
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter Rows</h4>
                                                <div className="space-y-2">
                                                    <select
                                                        value={filterColumn}
                                                        onChange={(e) => setFilterColumn(e.target.value)}
                                                        className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                                                    >
                                                        <option value="">Select column...</option>
                                                        {tableData.columns.map((col) => (
                                                            <option key={col.column_name} value={col.column_name}>
                                                                {col.column_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="Search value..."
                                                            value={filterValue}
                                                            onChange={(e) => setFilterValue(e.target.value)}
                                                            className="pl-9"
                                                            disabled={!filterColumn}
                                                        />
                                                    </div>
                                                </div>
                                                {filterValue && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => { setFilterColumn(""); setFilterValue(""); }}
                                                        className="gap-1"
                                                    >
                                                        <X className="w-3 h-3" /> Clear filter
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    {/* Column visibility */}
                                    <Popover>
                                        <PopoverTrigger className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md hover:bg-muted">
                                            <Columns className="w-4 h-4" />
                                            Columns
                                            {hiddenColumns.size > 0 && (
                                                <span className="ml-1 text-xs bg-primary/20 px-1 rounded">
                                                    {tableData.columns.length - hiddenColumns.size}/{tableData.columns.length}
                                                </span>
                                            )}
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64 max-h-80 overflow-y-auto">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center pb-2 border-b">
                                                    <h4 className="font-medium text-sm">Toggle Columns</h4>
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="sm" onClick={showAllColumns} className="text-xs h-6 px-2">
                                                            All
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={hideAllColumns} className="text-xs h-6 px-2">
                                                            Min
                                                        </Button>
                                                    </div>
                                                </div>
                                                {tableData.columns.map((col) => (
                                                    <label key={col.column_name} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted px-2 py-1 rounded">
                                                        <input
                                                            type="checkbox"
                                                            checked={!hiddenColumns.has(col.column_name)}
                                                            onChange={() => toggleColumnVisibility(col.column_name)}
                                                            className="rounded"
                                                        />
                                                        <span className="truncate">{col.column_name}</span>
                                                        <span className="text-xs text-muted-foreground ml-auto">{col.data_type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    {/* Refresh */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => fetchTableData(selectedTable, rowsPerPage, currentPage * rowsPerPage)}
                                        disabled={loading}
                                    >
                                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                    </Button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {visibleColumns.map((col) => (
                                                <TableHead
                                                    key={col.column_name}
                                                    className="whitespace-nowrap cursor-pointer hover:bg-muted/50 select-none"
                                                    onClick={() => handleSort(col.column_name)}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        {col.column_name}
                                                        <span className="text-xs text-muted-foreground font-normal">
                                                            ({col.data_type})
                                                        </span>
                                                        {sortColumn === col.column_name ? (
                                                            sortDirection === 'asc' ? (
                                                                <ArrowUp className="w-3 h-3 text-primary" />
                                                            ) : (
                                                                <ArrowDown className="w-3 h-3 text-primary" />
                                                            )
                                                        ) : (
                                                            <ArrowUpDown className="w-3 h-3 text-muted-foreground/50" />
                                                        )}
                                                    </div>
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRows.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={visibleColumns.length} className="text-center text-muted-foreground py-8">
                                                    {filterValue ? "No matching rows." : "No data in this table."}
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredRows.map((row, i) => (
                                                <TableRow key={i}>
                                                    {visibleColumns.map((col) => (
                                                        <TableCell key={col.column_name} className="max-w-[300px] truncate font-mono text-xs">
                                                            {String(row[col.column_name] ?? "")}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Footer with pagination */}
                            <div className="p-4 border-t flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Rows per page:</span>
                                    <select
                                        value={rowsPerPage}
                                        onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                                        className="px-2 py-1 border rounded-md bg-background text-sm"
                                    >
                                        {ROWS_PER_PAGE_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        Page {currentPage + 1} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0 || loading}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPages - 1 || loading}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
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
