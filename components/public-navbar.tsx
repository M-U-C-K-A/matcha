"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

export function PublicNavbar() {
	const pathname = usePathname()

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center">
				<div className="mr-4 flex">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<span className="text-xl">🍵</span>
						<span className="hidden font-bold sm:inline-block">
							Matcha
						</span>
					</Link>
					<nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
						<Link
							href="/"
							className={`transition-colors hover:text-foreground/80 ${pathname === "/" ? "text-foreground" : "text-foreground/60"}`}
						>
							Home
						</Link>
						<Link
							href="/legal"
							className={`transition-colors hover:text-foreground/80 ${pathname === "/legal" ? "text-foreground" : "text-foreground/60"}`}
						>
							Legal
						</Link>
					</nav>
				</div>

				<div className="flex flex-1 items-center justify-end space-x-2">
					<nav className="flex items-center space-x-2">
						<ModeToggle />
						<Link
							href="/auth/login"
							className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
						>
							Sign In
						</Link>
						<Link
							href="/auth/register"
							className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
						>
							Sign Up
						</Link>
					</nav>
				</div>
			</div>
		</header>
	)
}
