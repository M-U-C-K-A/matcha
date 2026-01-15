"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, MapPin, SearchX, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface Profile {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    age: number;
    distance: number;
    profile_picture: string;
    tags: string[];
    popularity: number;
}

export default function BrowsePage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initial State from URL or Defaults
    const [ageRange, setAgeRange] = useState([
        Number(searchParams.get("minAge")) || 18,
        Number(searchParams.get("maxAge")) || 100
    ]);
    const [maxDistance, setMaxDistance] = useState(
        Number(searchParams.get("distance")) || 1000
    );
    const [minFame, setMinFame] = useState(
        Number(searchParams.get("fame")) || 0
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(
        searchParams.get("tags")?.split(",").filter(Boolean) || []
    );

    // Sync URL with State
    const updateUrl = useCallback((newParams: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const res = await fetch("/api/showcase");
                if (res.ok) {
                    const data = await res.json();
                    setProfiles(data);
                } else {
                    console.error("Failed to fetch profiles");
                }
            } catch (error) {
                console.error("Error fetching profiles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    // Extract all unique tags from profiles for the filter list
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        profiles.forEach(p => p.tags && p.tags.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [profiles]);

    // Filtering Logic
    const filteredProfiles = useMemo(() => {
        return profiles.filter(profile => {
            const matchesAge = profile.age >= ageRange[0] && profile.age <= ageRange[1];
            const matchesDistance = profile.distance <= maxDistance;
            const matchesFame = profile.popularity >= minFame;
            const matchesTags = selectedTags.length === 0 ||
                (profile.tags && selectedTags.every(tag => profile.tags.includes(tag)));

            return matchesAge && matchesDistance && matchesFame && matchesTags;
        });
    }, [profiles, ageRange, maxDistance, minFame, selectedTags]);

    const toggleTag = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];

        setSelectedTags(newTags);
        updateUrl({ tags: newTags.length > 0 ? newTags.join(",") : null });
    };

    const clearFilters = () => {
        setAgeRange([18, 100]);
        setMaxDistance(1000);
        setMinFame(0);
        setSelectedTags([]);
        router.push(pathname, { scroll: false }); // Clear all query params
    };

    return (
        <div className="space-y-6 container mx-auto py-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Browse</h2>
                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filters
                            {(selectedTags.length > 0 || maxDistance < 1000 || minFame > 0) && (
                                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                    !
                                </Badge>
                            )}
                        </SheetTrigger>
                        <SheetContent className="w-[300px] sm:w-[400px] px-4 py-2 overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                                <SheetDescription>
                                    Refine your search results.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="py-6 space-y-6">
                                {/* Age Range */}
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label>Age</Label>
                                        <span className="text-sm text-muted-foreground">{ageRange[0]} - {ageRange[1]}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[Number(searchParams.get("minAge")) || 18, Number(searchParams.get("maxAge")) || 100]}
                                        value={ageRange}
                                        min={18}
                                        max={100}
                                        step={1}
                                        onValueChange={(val) => setAgeRange(val as number[])}
                                        onValueCommit={(val) => updateUrl({ minAge: val[0], maxAge: val[1] })}
                                        className="py-2"
                                    />
                                </div>

                                {/* Distance */}
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label>Max Distance</Label>
                                        <span className="text-sm text-muted-foreground">{maxDistance} km</span>
                                    </div>
                                    <Slider
                                        defaultValue={[Number(searchParams.get("distance")) || 1000]}
                                        value={[maxDistance]}
                                        min={1}
                                        max={1000}
                                        step={10}
                                        onValueChange={(val) => setMaxDistance((val as number[])[0])}
                                        onValueCommit={(val) => updateUrl({ distance: val[0] })}
                                        className="py-2"
                                    />
                                </div>

                                {/* Fame Rating */}
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label>Min. Popularity</Label>
                                        <span className="text-sm text-muted-foreground">{minFame}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[Number(searchParams.get("fame")) || 0]}
                                        value={[minFame]}
                                        min={0}
                                        max={100} // Assuming 100 max, adjust if needed
                                        step={1}
                                        onValueChange={(val) => setMinFame((val as number[])[0])}
                                        onValueCommit={(val) => updateUrl({ fame: val[0] })}
                                        className="py-2"
                                    />
                                </div>

                                {/* Common Tags */}
                                <div className="space-y-3">
                                    <Label>Tags</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {allTags.map(tag => (
                                            <Badge
                                                key={tag}
                                                variant={selectedTags.includes(tag) ? "default" : "outline"}
                                                className="cursor-pointer transition-all hover:opacity-80"
                                                onClick={() => toggleTag(tag)}
                                            >
                                                {tag}
                                                {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                                            </Badge>
                                        ))}
                                        {allTags.length === 0 && <span className="text-sm text-muted-foreground italic">No tags available</span>}
                                    </div>
                                </div>

                                <Button onClick={clearFilters} variant="secondary" className="w-full mt-4">
                                    Reset Filters
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                    Showing {filteredProfiles.length} active users nearby
                </span>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : filteredProfiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center animate-in fade-in-50">
                    <div className="p-4 rounded-full bg-muted/50 ring-1 ring-border">
                        <SearchX className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold tracking-tight">No match found</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            We couldn't find any profiles matching your current filters. Try adjusting your search criteria.
                        </p>
                    </div>
                    <Button variant="outline" className="mt-4" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in-50">
                    {filteredProfiles.map((profile) => (
                        <Link
                            key={profile.id}
                            href={`/profile/${profile.username}`}
                            className="group relative h-[400px] overflow-hidden rounded-xl bg-muted transition-all hover:scale-[1.02] hover:shadow-xl focus:scale-[1.02] focus:shadow-xl focus:outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0">
                                {profile.profile_picture ? (
                                    <Image
                                        src={profile.profile_picture}
                                        alt={profile.firstname}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                                {/* Lighter full overlay for general ambience */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
                            </div>

                            {/* Content Layer with Blur */}
                            <div className="absolute inset-x-0 bottom-0">
                                <div className="p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-[2px] pt-10">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-2xl tracking-tight text-white">
                                            {profile.firstname} {profile.lastname.charAt(0)}.
                                        </h3>
                                        <span className="text-xl font-light opacity-90 text-white">{profile.age}</span>
                                    </div>

                                    <div className="flex items-center text-sm font-medium text-white/90 mb-3">
                                        <MapPin className="h-3.5 w-3.5 mr-1" />
                                        {profile.distance} km away
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {profile.tags && profile.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0 text-xs backdrop-blur-sm">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
