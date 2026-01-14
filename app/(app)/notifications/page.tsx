
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function NotificationsPage() {
    const notifications = [
        { id: 1, type: 'like', user: 'Alice', time: '2 mins ago', read: false },
        { id: 2, type: 'visit', user: 'Bob', time: '1 hour ago', read: true },
        { id: 3, type: 'match', user: 'Charlie', time: '2 hours ago', read: true },
        { id: 4, type: 'message', user: 'Charlie', time: '2 hours ago', read: true },
    ]

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Stay updated with your latest interactions.
                </p>
            </div>
            <Separator />
            <div className="space-y-4">
                {notifications.map((notif) => (
                    <div key={notif.id} className={`flex items-center gap-4 p-4 rounded-lg border ${notif.read ? 'bg-background' : 'bg-muted/30'}`}>
                        <Avatar>
                            <AvatarImage src={`/avatars/${notif.id}.png`} />
                            <AvatarFallback>{notif.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm">
                                <span className="font-semibold">{notif.user}</span>
                                {notif.type === 'like' && " liked your profile."}
                                {notif.type === 'visit' && " visited your profile."}
                                {notif.type === 'match' && " matched with you!"}
                                {notif.type === 'message' && " sent you a message."}
                            </p>
                            <p className="text-xs text-muted-foreground">{notif.time}</p>
                        </div>
                        {!notif.read && <Badge variant="default" className="h-2 w-2 rounded-full p-0" />}
                    </div>
                ))}
            </div>
        </div>
    )
}
