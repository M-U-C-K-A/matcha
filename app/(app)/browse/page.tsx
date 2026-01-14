"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LayoutGrid, Map as MapIcon, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dynamically import Map component to avoid SSR issues with Leaflet
const UserMap = dynamic(() => import("@/components/map/user-map"), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full rounded-md border bg-muted flex items-center justify-center">
            Loading map...
        </div>
    ),
});

export default function BrowsePage() {
    // Mock data for profiles
    const profiles = [...Array(12)].map((_, i) => ({
        id: i.toString(),
        name: `User ${i + 1}`,
        age: 20 + i,
        distance: Math.floor(Math.random() * 50),
        image: `/avatars/0${(i % 5) + 1}.png`,
    }));

    // Mock data for map users (subset with coordinates)
    const mapUsers = profiles.map((p, i) => ({
        id: p.id,
        username: p.name,
        latitude: 48.8566 + (Math.random() - 0.5) * 0.1, // Near Paris
        longitude: 2.3522 + (Math.random() - 0.5) * 0.1,
        avatar: p.image,
    }));

    return (
        <div className="space-y-6 container mx-auto py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Browse</h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="grid" className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <TabsList className="grid w-auto grid-cols-2">
                        <TabsTrigger value="grid">
                            <LayoutGrid className="h-4 w-4 mr-2" />
                            Grid
                        </TabsTrigger>
                        <TabsTrigger value="map">
                            <MapIcon className="h-4 w-4 mr-2" />
                            Map
                        </TabsTrigger>
                    </TabsList>
                    <span className="text-sm text-muted-foreground hidden sm:inline-block">
                        Showing {profiles.length} results
                    </span>
                </div>

                <TabsContent value="grid" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {profiles.map((profile) => (
                            <div
                                key={profile.id}
                                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-muted transition-all hover:scale-105 hover:shadow-xl"
                            >
                                {/* Placeholder for user Image */}
                                <div className="absolute inset-0 bg-secondary/50" />

                                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                                    <h3 className="font-bold text-lg">{profile.name}, {profile.age}</h3>
                                    <p className="text-sm opacity-90">{profile.distance} km away</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="map" className="mt-0">
                    <UserMap users={mapUsers} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
