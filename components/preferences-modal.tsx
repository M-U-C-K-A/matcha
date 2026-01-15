"use client";

import { useState } from "react";
import { MapPin, Loader2, X, ArrowRight, SkipForward } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldLabel,
    FieldError,
    FieldGroup,
} from "@/components/ui/field";

interface PreferencesModalProps {
    onComplete: () => void;
    onSkip: () => void;
}

export default function PreferencesModal({ onComplete, onSkip }: PreferencesModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        bio: "",
        gender: "" as "" | "male" | "female" | "non-binary",
        sex_preference: "" as "" | "male" | "female" | "bisexual",
        city: "",
        latitude: undefined as number | undefined,
        longitude: undefined as number | undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setFormData(prev => ({ ...prev, latitude, longitude }));

                // Reverse geocoding to get city name
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
                    );
                    const data = await res.json();
                    const city = data.address?.city || data.address?.town || data.address?.village || data.address?.municipality || "";
                    setFormData(prev => ({ ...prev, city }));
                } catch {
                    // Geocoding failed, but we still have coordinates
                }

                setIsLocating(false);
            },
            (err) => {
                setError("Unable to get your location. Please enable location services.");
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Build payload with only non-empty values
        const payload: Record<string, unknown> = {};
        if (formData.bio) payload.bio = formData.bio;
        if (formData.gender) payload.gender = formData.gender;
        if (formData.sex_preference) payload.sex_preference = formData.sex_preference;
        if (formData.city) payload.city = formData.city;
        if (formData.latitude !== undefined) payload.latitude = formData.latitude;
        if (formData.longitude !== undefined) payload.longitude = formData.longitude;

        try {
            const response = await fetch("/api/profile/preferences", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Failed to save preferences");
                setIsLoading(false);
                return;
            }

            onComplete();
        } catch {
            setError("Connection error");
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg border-border shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                        Complete Your Profile
                    </CardTitle>
                    <CardDescription>
                        Tell us a bit more about yourself to find better matches
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-center gap-2">
                                <X className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Bio */}
                        <Field>
                            <FieldLabel htmlFor="bio">Bio</FieldLabel>
                            <textarea
                                id="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Tell us about yourself..."
                                maxLength={255}
                                rows={3}
                                className="w-full px-3 py-2 border rounded-md bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {formData.bio.length}/255
                            </p>
                        </Field>

                        {/* Gender */}
                        <Field>
                            <FieldLabel htmlFor="gender">Gender</FieldLabel>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">Select your gender...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                            </select>
                        </Field>

                        {/* Sex Preference */}
                        <Field>
                            <FieldLabel htmlFor="sex_preference">Interested in</FieldLabel>
                            <select
                                id="sex_preference"
                                value={formData.sex_preference}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">Select preference...</option>
                                <option value="male">Men</option>
                                <option value="female">Women</option>
                                <option value="bisexual">Everyone</option>
                            </select>
                        </Field>

                        {/* Location */}
                        <Field>
                            <FieldLabel>Location</FieldLabel>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleGetLocation}
                                    disabled={isLocating}
                                    className="shrink-0"
                                >
                                    {isLocating ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <MapPin className="w-4 h-4" />
                                    )}
                                    Use my location
                                </Button>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="flex-1"
                                    readOnly
                                />
                            </div>
                            {formData.latitude && formData.longitude && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    📍 {formData.city || "Location set"} ({formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)})
                                </p>
                            )}
                        </Field>
                    </CardContent>

                    <CardFooter className="flex gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onSkip}
                            className="flex-1"
                            disabled={isLoading}
                        >
                            <SkipForward className="w-4 h-4 mr-2" />
                            Skip for now
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    Complete <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
