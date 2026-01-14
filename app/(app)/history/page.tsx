
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HistoryPage() {
    const visitors = [
        { id: 1, name: 'Alice', time: '2 mins ago', action: 'Viewed your profile' },
        { id: 2, name: 'Bob', time: '1 hour ago', action: 'Viewed your profile' },
    ]

    const likes = [
        { id: 3, name: 'Charlie', time: '2 hours ago', action: 'Liked your profile' },
        { id: 1, name: 'Alice', time: '1 day ago', action: 'Liked your profile' },
    ]

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h3 className="text-lg font-medium">Activity History</h3>
                <p className="text-sm text-muted-foreground">
                    See who's been checking you out.
                </p>
            </div>
            <Separator />

            <Tabs defaultValue="visitors" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="visitors">Visitors</TabsTrigger>
                    <TabsTrigger value="likes">Likes</TabsTrigger>
                </TabsList>
                <TabsContent value="visitors" className="mt-4 space-y-4">
                    {visitors.map((visitor) => (
                        <div key={visitor.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                            <Avatar>
                                <AvatarImage src={`/avatars/${visitor.id}.png`} />
                                <AvatarFallback>{visitor.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{visitor.name}</p>
                                <p className="text-sm text-muted-foreground">{visitor.action}</p>
                            </div>
                            <span className="text-sm text-muted-foreground">{visitor.time}</span>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="likes" className="mt-4 space-y-4">
                    {likes.map((like) => (
                        <div key={like.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                            <Avatar>
                                <AvatarImage src={`/avatars/${like.id}.png`} />
                                <AvatarFallback>{like.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{like.name}</p>
                                <p className="text-sm text-muted-foreground">{like.action}</p>
                            </div>
                            <span className="text-sm text-muted-foreground">{like.time}</span>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}
