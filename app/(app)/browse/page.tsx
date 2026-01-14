
import { Button } from "@/components/ui/button"

export default function BrowsePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Browse</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">Filter</Button>
                    <Button variant="outline">Sort</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Placeholder Cards */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] rounded-xl bg-muted animate-pulse" />
                ))}
            </div>
        </div>
    )
}
