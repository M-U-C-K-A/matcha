"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { MultiSelect } from "@/components/ui/multi-select"

const MapPicker = dynamic(() => import("@/components/map/map-picker"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-muted flex items-center justify-center">Loading Map...</div>
})

const TAGS_LIST = [
    { value: "vegan", label: "Vegan" },
    { value: "geek", label: "Geek" },
    { value: "music", label: "Music" },
    { value: "sport", label: "Sport" },
    { value: "travel", label: "Travel" },
    { value: "nature", label: "Nature" },
]

export default function SearchPage() {
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [radius, setRadius] = useState([50])
    const [location, setLocation] = useState<[number, number]>([48.8566, 2.3522])

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Advanced Search</h3>
                <p className="text-sm text-muted-foreground">
                    Find exactly who you are looking for.
                </p>
            </div>
            <Separator />

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Filters Column */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label>Age Range</Label>
                        <Slider defaultValue={[18, 99]} max={99} step={1} />
                    </div>
                    <div className="space-y-4">
                        <Label>Fame Rating</Label>
                        <Slider defaultValue={[0, 100]} max={100} step={1} />
                    </div>
                    <div className="space-y-4">
                        <Label>Distance ({radius} km)</Label>
                        <Slider
                            defaultValue={[50]}
                            max={500}
                            step={10}
                            onValueChange={(val) => setRadius(val as number[])}
                            value={radius}
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Interests (Tags)</Label>
                        <MultiSelect
                            options={TAGS_LIST}
                            selected={selectedTags}
                            onChange={setSelectedTags}
                            placeholder="Select interests..."
                        />
                    </div>
                    <Button className="w-full">Search</Button>
                </div>

                {/* Map Column */}
                <div className="space-y-4">
                    <Label>Location Area</Label>
                    <MapPicker
                        radius={radius[0]}
                        center={location}
                        onLocationSelect={(lat, lng) => setLocation([lat, lng])}
                    />
                    <p className="text-sm text-muted-foreground">Click on the map to change the search center.</p>
                </div>
            </div>

            <div className="min-h-[400px] flex items-center justify-center border border-dashed rounded-lg bg-slate-50/50">
                <p className="text-muted-foreground">Results will appear here based on selected filters.</p>
            </div>
        </div>
    )
}
