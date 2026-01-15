"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Bell, Heart, LogOut, MessageCircle, Search, User, Compass } from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"

export function AppNavbar() {
    const pathname = usePathname()
    const { user, logout } = useAuth()
    const [hasUnread, setHasUnread] = useState(false)

    useEffect(() => {
        const checkNotifications = async () => {
            try {
                const res = await fetch(`/api/profile/notification/new`, {
                    cache: 'no-store'
                })

                const hasNew = await res.json()
                setHasUnread(hasNew)
            } catch (error) {
                console.error("Failed to check notifications", error)
            }
        }

        checkNotifications()
        const interval = setInterval(checkNotifications, 10000)
        return () => clearInterval(interval)
    }, [user])


    const navItems = [
        {
            title: "Browse",
            href: "/browse",
            icon: Compass,
        },
        {
            title: "Search",
            href: "/search",
            icon: Search,
        },
        {
            title: "Chat",
            href: "/chat",
            icon: MessageCircle,
        },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/browse" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Matcha
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    <item.icon className="h-4 w-4" />
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Command menu placeholder */}
                    </div>
                    <nav className="flex items-center space-x-2">
                        <ModeToggle />
                        <Link
                            href="/notifications"
                            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}
                        >
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Notifications</span>
                            {hasUnread && (
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
                            )}
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="relative h-8 w-8 rounded-full outline-none">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.username || user?.firstName || "User"}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email || ""}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/profile" className="flex items-center w-full">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>
            </div>
        </header >
    )
}
