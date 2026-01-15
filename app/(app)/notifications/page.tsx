"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Bell, Loader2 } from "lucide-react";

interface Notification {
    id: number;
    type: "like" | "unlike" | "profile_consulted" | "new_message" | "like_back";
    user: string;
    user_avatar?: string;
    time: string;
    read: boolean;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch("/api/profile/notification", {
                    credentials: "include",
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        setError("Please log in to view notifications");
                    } else {
                        setError("Failed to load notifications");
                    }
                    return;
                }

                const data = await res.json();
                setNotifications(data.notifications || []);
            } catch (err) {
                setError("Failed to connect to the server");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, []);
    console.log(notifications);

    const getNotificationMessage = (type: Notification["type"]) => {
        switch (type) {
            case "like":
                return " liked your profile.";
            case "profile_consulted":
                return " visited your profile.";
            case "new_message":
                return " sent you a message.";
            case "like_back":
                return " liked your profile.";
            case "unlike":
                return " unliked your profile.";
            default:
                return " interacted with you.";
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Stay updated with your latest interactions.
                </p>
            </div>
            <Separator />

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="text-center py-12">
                    <p className="text-sm text-destructive">{error}</p>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && notifications.length === 0 && (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Bell />
                        </EmptyMedia>
                        <EmptyTitle>No notifications yet</EmptyTitle>
                        <EmptyDescription>
                            When someone interacts with your profile, you'll see it here.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}

            {/* Notifications List */}
            {!isLoading && !error && notifications.length > 0 && (
                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`flex items-center gap-4 p-4 rounded-lg border ${notif.read ? "bg-background" : "bg-muted/30"}`}
                        >
                            <Avatar>
                                <AvatarImage src={notif.user_avatar || `/avatars/${notif.id}.png`} />
                                <AvatarFallback>{notif.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-sm">
                                    <span className="font-semibold">{notif.user}</span>
                                    {getNotificationMessage(notif.type)}
                                </p>
                                <p className="text-xs text-muted-foreground">{notif.time}</p>
                            </div>
                            {!notif.read && (
                                <Badge variant="default" className="h-2 w-2 rounded-full p-0" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
