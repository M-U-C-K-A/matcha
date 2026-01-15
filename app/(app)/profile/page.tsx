"use client"

import { useState } from "react"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Pencil, Mail, Phone, CheckCircle2, MapPin } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamic import for map to avoid SSR issues
const MapComponent = dynamic(() => import("@/components/settings/location-map"), {
    ssr: false,
    loading: () => <div className="h-48 bg-muted rounded-lg animate-pulse" />
})

export default function ProfilePage() {
    // Form state
    const [displayName, setDisplayName] = useState("Alex Morgan")
    const [bioQuote, setBioQuote] = useState("Adventure seeker & coffee lover ☕")
    const [email] = useState("alex.morgan@example.com")
    const [phone, setPhone] = useState("+1 (555) 012-3456")

    // Discovery settings state
    const [discoveryOn, setDiscoveryOn] = useState(true)
    const [maxDistance, setMaxDistance] = useState([25])
    const [ageRange, setAgeRange] = useState([24, 35])
    const [showMe, setShowMe] = useState<"men" | "women" | "everyone">("women")

    return (
        <SettingsLayout>
            <div className="space-y-8">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your personal information and discovery preferences.
                    </p>
                </div>

                {/* Profile Information */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Profile Information</CardTitle>
                            <CardDescription>
                                Update your photo and personal details visible to others.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Pencil className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-start gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <Avatar className="h-20 w-20 border-4 border-primary/20">
                                    <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Profile" />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xl">AM</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                                    <Pencil className="h-3 w-3 text-primary-foreground" />
                                </div>
                            </div>

                            {/* Name & Bio inputs */}
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="displayName">Display Name</Label>
                                    <Input
                                        id="displayName"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bioQuote">Bio Quote</Label>
                                    <Input
                                        id="bioQuote"
                                        value={bioQuote}
                                        onChange={(e) => setBioQuote(e.target.value)}
                                        placeholder="Adventure seeker & coffee lover ☕"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact & Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Contact & Security</CardTitle>
                        <CardDescription>
                            Manage your account credentials and verification.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    value={email}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Verification Status */}
                        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="font-medium text-green-700 dark:text-green-400">Account Verified</p>
                                <p className="text-sm text-green-600/80 dark:text-green-500/80">
                                    Your identity has been confirmed via phone.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Discovery Settings */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Discovery Settings</CardTitle>
                            <CardDescription>
                                Control who you see and who sees you.
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${discoveryOn ? "text-primary" : "text-muted-foreground"}`}>
                                Discovery {discoveryOn ? "On" : "Off"}
                            </span>
                            <Switch
                                checked={discoveryOn}
                                onCheckedChange={setDiscoveryOn}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Current Location */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <Label className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    Current Location
                                </Label>
                                <Button variant="link" className="text-primary p-0 h-auto">
                                    Change Location
                                </Button>
                            </div>
                            <MapComponent />
                            <div className="mt-2 flex items-center gap-2 text-sm">
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                    📍 Paris, France
                                </Badge>
                            </div>
                        </div>

                        <Separator />

                        {/* Maximum Distance */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Maximum Distance</Label>
                                <span className="text-sm font-medium text-primary">{maxDistance[0]} km</span>
                            </div>
                            <Slider
                                value={maxDistance}
                                onValueChange={setMaxDistance}
                                max={100}
                                min={1}
                                step={1}
                                className="w-full"
                            />
                        </div>

                        {/* Age Range */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Age Range</Label>
                                <span className="text-sm font-medium text-primary">{ageRange[0]} - {ageRange[1]}</span>
                            </div>
                            <Slider
                                value={ageRange}
                                onValueChange={setAgeRange}
                                max={99}
                                min={18}
                                step={1}
                                className="w-full"
                            />
                        </div>

                        {/* Show Me */}
                        <div className="space-y-3">
                            <Label>Show Me</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {(["men", "women", "everyone"] as const).map((option) => (
                                    <Button
                                        key={option}
                                        variant={showMe === option ? "default" : "outline"}
                                        onClick={() => setShowMe(option)}
                                        className="capitalize"
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-primary hover:bg-primary-hover">
                        Save Changes
                    </Button>
                </div>
            </div>
        </SettingsLayout>
    )
}
