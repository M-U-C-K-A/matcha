"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, MapPin, MessageCircle, Share2, Heart, Check, User, Ruler, Cigarette, Wine, Camera, Dumbbell, Music, Plane, Gamepad, Utensils, Book, Star } from "lucide-react"

interface Profile {
    username: string
    firstname: string
    lastname: string
    email?: string
    phone?: string
    gender: string
    biography: string
    popularity: number
    last_connection: string
    birthdate: string
    city?: string
    photos: string[]
    profile_avatar?: string
    sex_preference?: string
    status?: string
    tags?: string[]
}

// Helper to calculate age from birthdate
function calculateAge(birthdate: string): number {
    const birth = new Date(birthdate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    return age
}

// Map tag names to icons
function getTagIcon(tag: string) {
    const tagLower = tag.toLowerCase()
    if (tagLower.includes("photo")) return Camera
    if (tagLower.includes("run") || tagLower.includes("sport") || tagLower.includes("fitness")) return Dumbbell
    if (tagLower.includes("music") || tagLower.includes("jazz")) return Music
    if (tagLower.includes("travel")) return Plane
    if (tagLower.includes("game") || tagLower.includes("gaming")) return Gamepad
    if (tagLower.includes("food") || tagLower.includes("cook") || tagLower.includes("ramen")) return Utensils
    if (tagLower.includes("book") || tagLower.includes("read")) return Book
    if (tagLower.includes("wine")) return Wine
    return Star
}

export default function UserProfilePage() {
    const params = useParams()
    const slug = params.username as string
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [wilmoExplosion, setWilmoExplosion] = useState(false)
    const [wilmos, setWilmos] = useState<Array<{ id: number; x: number; y: number; rotate: number; scale: number; delay: number }>>([])

    // Trigger wilmo explosion
    const triggerWilmoExplosion = () => {
        const newWilmos = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotate: Math.random() * 720 - 360,
            scale: 0.5 + Math.random() * 1.5,
            delay: Math.random() * 0.5,
        }))
        setWilmos(newWilmos)
        setWilmoExplosion(true)
        setTimeout(() => setWilmoExplosion(false), 4000)
    }

    useEffect(() => {
        if (!slug) {
            setLoading(false)
            setError("No username provided")
            return
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/users/${slug}`)
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
                <Loader2 className="animate-spin w-8 h-8" />
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

    const age = profile.birthdate ? calculateAge(profile.birthdate) : null
    const mainPhoto = profile.photos?.[currentPhotoIndex] || profile.profile_avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${profile.username}`

    // Sample vitals data (since backend doesn't provide these yet)
    const vitals = [
        { icon: Ruler, label: "5'6\"" },
        { icon: Star, label: "Creative" },
        { icon: Cigarette, label: "Non-smoker" },
        { icon: Wine, label: "Wine Lover" },
    ]

    // Use profile tags or fallback to sample interests
    const interests = profile.tags?.length ? profile.tags : ["Photography", "Running", "Ramen Enthusiast", "Traveling", "Tennis", "Jazz"]

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background">
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                {/* Main Profile Card */}
                <Card className="overflow-hidden mb-6">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Left: Photo Section */}
                            <div className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[600px] bg-muted">
                                <img
                                    src={mainPhoto}
                                    alt={`${profile.firstname} ${profile.lastname}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Photo navigation dots */}
                                {profile.photos && profile.photos.length > 1 && (
                                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                                        {profile.photos.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentPhotoIndex(index)}
                                                className={`w-2 h-2 rounded-full transition-colors ${index === currentPhotoIndex
                                                    ? "bg-white"
                                                    : "bg-white/50 hover:bg-white/75"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Verified Profile Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                    <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                        <Check className="w-2.5 h-2.5 text-white" />
                                    </span>
                                    <span className="text-sm font-medium">Verified Profile</span>
                                </div>
                            </div>

                            {/* Right: Profile Info */}
                            <div className="p-6 lg:p-8">
                                {/* Header with name and share */}
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-2xl lg:text-3xl font-bold">
                                            {profile.firstname} {profile.lastname?.charAt(0)}.
                                        </h1>
                                        {age && (
                                            <span className="text-lg lg:text-xl text-orange-500 font-semibold">{age}</span>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Occupation / Location */}
                                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                                    <User className="w-4 h-4" />
                                    <span className="text-sm">
                                        {profile.gender === "male" ? "He/Him" : profile.gender === "female" ? "She/Her" : "They/Them"}
                                        {profile.city && ` in ${profile.city}`}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mb-8">
                                    <Button variant="outline" size="icon" className="rounded-full border-orange-200 hover:bg-orange-50 hover:border-orange-300">
                                        <Heart className="w-5 h-5 text-orange-500" />
                                    </Button>
                                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full gap-2">
                                        <MessageCircle className="w-5 h-5" />
                                        Start Chatting
                                    </Button>
                                </div>

                                {/* Bio */}
                                <div className="mb-6">
                                    <h2 className="font-semibold mb-2">Bio</h2>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {profile.biography || "This user hasn't written a bio yet."}
                                    </p>
                                </div>

                                {/* Vitals */}
                                <div className="mb-6">
                                    <h2 className="font-semibold mb-3">Vitals</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {vitals.map((vital, index) => {
                                            const Icon = vital.icon
                                            return (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="px-3 py-1.5 rounded-full border-muted-foreground/20 text-muted-foreground gap-1.5"
                                                >
                                                    <Icon className="w-3.5 h-3.5" />
                                                    {vital.label}
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Interests */}
                                <div className="mb-6">
                                    <h2 className="font-semibold mb-3">Interests</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {interests.map((interest, index) => {
                                            const Icon = getTagIcon(interest)
                                            return (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="px-3 py-1.5 rounded-full border-muted-foreground/20 text-muted-foreground gap-1.5"
                                                >
                                                    <Icon className="w-3.5 h-3.5" />
                                                    {interest}
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <h2 className="font-semibold mb-3">Location</h2>
                                    <div className="relative h-32 rounded-xl overflow-hidden bg-muted">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.1824179226!2d-0.26640239213870075!3d51.52864165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                            className="w-full h-full border-0 grayscale opacity-75"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                        <div className="absolute bottom-2 left-2 bg-white dark:bg-background px-3 py-1 rounded-full shadow text-xs flex items-center gap-2">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                            {profile.city || "2.4 miles away"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Promotional Banner */}
                <Card className="overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-rose-400">
                    <CardContent className="p-0">
                        <div className="flex items-center justify-between p-6">
                            <div className="text-white">
                                <h3 className="text-xl font-bold mb-1">Unlock More with Matcha Ultra Pro</h3>
                                <p className="text-white/80 text-sm">
                                    See who already liked you and send unlimited messages with prioritized delivery.
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                className="bg-white text-orange-600 hover:bg-white/90 font-semibold whitespace-nowrap"
                                onClick={triggerWilmoExplosion}
                            >
                                Upgrade Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center text-xs text-muted-foreground mt-8 pb-4">
                    © 2024 Matcha Dating. Crafted with passion.
                </div>

                {/* Wilmo Explosion Easter Egg */}
                {wilmoExplosion && (
                    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                        {wilmos.map((wilmo) => (
                            <img
                                key={wilmo.id}
                                src="/wilmo.png"
                                alt="Wilmo"
                                className="absolute animate-bounce"
                                style={{
                                    left: `${wilmo.x}%`,
                                    top: `${wilmo.y}%`,
                                    transform: `rotate(${wilmo.rotate}deg) scale(${wilmo.scale})`,
                                    width: '80px',
                                    height: '80px',
                                    animationDelay: `${wilmo.delay}s`,
                                    animationDuration: '0.5s',
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
