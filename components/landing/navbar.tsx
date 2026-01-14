import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between py-6 px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
                {/* Placeholder logo matching the "Pulse" style (red icon + text) */}
                <div className="w-8 h-8 bg-[#FD5D68] rounded-tl-xl rounded-br-xl transform rotate-45" />
                <span className="font-serif text-2xl font-bold tracking-tight">Matcha</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <Link href="#" className="hover:text-black transition-colors">Safety</Link>
                <Link href="#" className="hover:text-black transition-colors">Stories</Link>
                <Link
                    href="/auth/login"
                    className={cn(buttonVariants(), "bg-black hover:bg-gray-800 text-white rounded-full px-6")}
                >
                    Sign In
                </Link>
            </div>
        </nav>
    );
}
