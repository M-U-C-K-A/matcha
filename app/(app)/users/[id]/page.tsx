
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserProfilePage({ params }: { params: { id: string } }) {
    // In a real app, fetch user data based on params.id
    const user = {
        name: "Alice Wonderland",
        username: "alice_w",
        age: 24,
        fame: 85,
        bio: "Exploring the digital world. Love coding and coffee.",
        interests: ["coding", "coffee", "travel", "photography"],
        isOnline: true,
        lastSeen: "Just now",
        location: "Paris, France"
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header / Cover Area placeholder */}
            <div className="relative h-48 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500">
                <div className="absolute -bottom-16 left-8 p-1 bg-background rounded-full">
                    <Avatar className="h-32 w-32 border-4 border-background">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback>AW</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="pt-16 px-4 flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{user.name} <span className="text-xl font-normal text-muted-foreground">, {user.age}</span></h1>
                    <p className="text-muted-foreground">@{user.username} • {user.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`h-2 w-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className="text-sm text-muted-foreground">{user.isOnline ? 'Online' : `Last seen: ${user.lastSeen}`}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button className="gap-2">
                        <Heart className="h-4 w-4" /> Like
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <MessageCircle className="h-4 w-4" /> Chat
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Report User</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">About</h3>
                        <p className="leading-relaxed text-muted-foreground">{user.bio}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.interests.map(tag => (
                                <Badge key={tag} variant="secondary">#{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Photos</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="space-y-6">
                    <div className="border rounded-xl p-4 bg-muted/30">
                        <h3 className="font-semibold mb-2">Fame Rating</h3>
                        <div className="text-3xl font-bold text-primary">{user.fame}</div>
                        <p className="text-xs text-muted-foreground">Top 10% of users</p>
                    </div>
                </aside>
            </div>
        </div>
    )
}
