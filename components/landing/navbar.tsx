import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between py-6 px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
                <span className="text-2xl">🍵</span>
                <span className="font-serif text-2xl font-bold tracking-tight">Matcha</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <Link href="#features" className="hover:text-black transition-colors">Features</Link>
                <Link href="#how-it-works" className="hover:text-black transition-colors">How it works</Link>
                <Link href="/legal" className="hover:text-black transition-colors">Legal</Link>
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
