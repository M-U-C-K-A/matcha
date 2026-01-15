"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, User, Activity } from "lucide-react"
import { format } from "date-fns"

interface Profile {
    id: string
    username: string
    firstname: string
    lastname: string
    gender: string
    biography: string
    popularity: number
    last_connection: string
    age: number
    profile_picture: string
    tags: string[]
}

export default function ProfilePage() {
    const params = useParams()
    const slug = params.slug as string
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!slug) return

        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/profile/home?username=${slug}`)
                if (!res.ok) {
                    if (res.status === 404) throw new Error("User not found")
                    throw new Error("Failed to fetch profile")
                }
                const data = await res.json()
                setProfile(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [slug])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error || !profile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h1 className="text-2xl font-bold text-destructive">Error</h1>
                <p className="text-muted-foreground">{error || "Profile not found"}</p>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto py-8 space-y-8">
            <Card>
                <CardHeader className="flex flex-col md:flex-row items-center gap-6 pb-6">
                    <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                        <AvatarImage src={profile.profile_picture} alt={profile.username} className="object-cover" />
                        <AvatarFallback className="text-4xl">
                            {profile.firstname[0]}{profile.lastname[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <CardTitle className="text-3xl font-bold">
                                {profile.firstname} {profile.lastname}
                            </CardTitle>
                            <Badge variant="secondary" className="text-sm">
                                {profile.age} years old
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Activity className="w-4 h-4" />
                                <span>{profile.popularity} Fame</span>
                            </div>
                        </div>

                        <p className="text-lg text-muted-foreground">@{profile.username}</p>

                        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span className="capitalize">{profile.gender}</span>
                            </div>
                            {profile.last_connection && (
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>Last seen {format(new Date(profile.last_connection), "PP")}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">About</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {profile.biography || "No biography provided."}
                        </p>
                    </div>

                    {profile.tags && profile.tags.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="px-3 py-1">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
