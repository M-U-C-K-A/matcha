"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, User, Activity, Heart, X, Loader2 } from "lucide-react"
import { format } from "date-fns"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

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
    photos: string[]
    tags: string[]
    distance: number
}

export default function ProfilePage() {
    const params = useParams()
    const slug = params.username as string
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!slug) {
            setLoading(false)
            setError("No username provided")
            return
        }

        const fetchProfile = async () => {
            try {
                console.log("Fetching profile for:", slug)
                const res = await fetch(`/api/users/${slug}`)
                console.log("Response status:", res.status)
                if (!res.ok) {
                    if (res.status === 404) throw new Error("User not found")
                    throw new Error("Failed to fetch profile")
                }
                const data = await res.json()
                console.log("Profile data:", data)
                setProfile(data)
            } catch (err: any) {
                console.error("Error fetching profile:", err)
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
                <Loader2 className="animate-spin" />
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
        <div className="container max-w-6xl mx-auto py-8 space-y-8">
            {/* JSON Placeholder */}
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs text-muted-foreground">
                    {JSON.stringify(profile, null, 2)}
                </pre>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Carousel */}
                <div className="flex items-center justify-center bg-zinc-950 rounded-xl p-8">
                    <Carousel className="w-full max-w-sm lg:max-w-md">
                        <CarouselContent>
                            {profile.photos && profile.photos.length > 0 ? (
                                profile.photos.map((photo, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card className="border-0 shadow-none bg-transparent">
                                                <CardContent className="flex aspect-square items-center justify-center p-0 relative overflow-hidden rounded-xl">
                                                    <Image
                                                        src={photo}
                                                        alt={`${profile.username}'s photo ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span className="text-4xl font-semibold text-muted-foreground">No Photos</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {/* Right Column: Info Card */}
                <div className="space-y-6">
                    <Card className="h-full border-0 shadow-none bg-transparent lg:bg-card lg:border lg:shadow-sm">
                        <CardHeader>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-4xl font-bold">
                                            {profile.firstname} {profile.lastname}
                                        </CardTitle>
                                        <p className="text-xl text-muted-foreground mt-1">
                                            {profile.age} years old
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="text-lg px-4 py-1">
                                        {profile.popularity} Fame
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        <span className="capitalize">{profile.gender}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{Math.round(profile.distance)} km away</span>
                                    </div>
                                    {profile.last_connection && (
                                        <div className="flex items-center gap-1">
                                            <Activity className="w-4 h-4" />
                                            <span>
                                                {format(new Date(profile.last_connection), "PP")}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold border-b pb-2">About</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {profile.biography || "No biography provided."}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold border-b pb-2">Passions</h3>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {profile.tags && profile.tags.length > 0 ? (
                                        profile.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                                #{tag}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-muted-foreground italic">No tags added</span>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons Placeholder */}
                            <div className="flex gap-4 pt-4">
                                <button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-md font-medium text-lg transition-colors flex items-center justify-center gap-2">
                                    <Heart className="w-5 h-5" />
                                    Like
                                </button>
                                <button className="flex-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 rounded-md font-medium text-lg transition-colors flex items-center justify-center gap-2">
                                    <X className="w-5 h-5" />
                                    Pass
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
