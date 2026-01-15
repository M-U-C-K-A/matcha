"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Shield, Bell, Crown, LogOut, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"

const navItems = [
	{ title: "Account", href: "/profile", icon: User },
	{ title: "Privacy & Safety", href: "/settings/privacy", icon: Shield },
	{ title: "Notifications", href: "/settings/notifications", icon: Bell },
	{ title: "Membership", href: "/settings/membership", icon: Crown },
]

interface SettingsLayoutProps {
	children: React.ReactNode
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
	const pathname = usePathname()
	const { user, logout } = useAuth()

	return (
		<div className="flex min-h-[calc(100vh-4rem)] gap-8">
			{/* Sidebar */}
			<aside className="w-64 shrink-0">
				<div className="sticky top-20">
					{/* User Info */}
					<div className="flex items-center gap-3 mb-6">
						<Avatar className="h-12 w-12 border-2 border-primary">
							<AvatarImage src={user?.avatar || ""} alt={user?.firstName || "User"} />
							<AvatarFallback className="bg-primary/10 text-primary font-semibold">
								{user?.firstName?.[0]}{user?.lastName?.[0]}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold text-foreground">
								{user?.firstName || "User"} {user?.lastName || ""}
							</p>
							<p className="text-sm text-muted-foreground">Premium Member</p>
						</div>
					</div>

					{/* Navigation */}
					<nav className="space-y-1">
						{navItems.map((item) => {
							const isActive = pathname === item.href
							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
										isActive
											? "bg-primary/10 text-primary"
											: "text-muted-foreground hover:bg-muted hover:text-foreground"
									)}
								>
									<item.icon className="h-4 w-4" />
									{item.title}
								</Link>
							)
						})}

						{/* Logout */}
						<button
							onClick={logout}
							className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
						>
							<LogOut className="h-4 w-4" />
							Log Out
						</button>
					</nav>

					{/* Version Info */}
					<div className="mt-8 text-xs text-muted-foreground">
						<p>© 2026 Matcha Inc.</p>
						<p>v1.0 • Build 0001</p>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 max-w-3xl">
				{children}
			</main>
		</div>
	)
}
