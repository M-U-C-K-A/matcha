
import { AppNavbar } from "@/components/app-navbar"
import { ProtectedRoute } from "@/components/protected-route"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        /*<ProtectedRoute>*/
        <div className="relative flex min-h-screen flex-col">
            <AppNavbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
        </div >
        /*</ProtectedRoute>*/
    )
}
