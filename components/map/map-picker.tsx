"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from "react-leaflet"
import { useTheme } from "next-themes"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet marker icon issue in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
    center?: [number, number];
    radius?: number; // in kilometers
    onLocationSelect?: (lat: number, lng: number) => void;
}

function LocationMarker({ onLocationSelect }: { onLocationSelect?: (lat: number, lng: number) => void }) {
    const [position, setPosition] = useState<L.LatLng | null>(null)
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
            onLocationSelect?.(e.latlng.lat, e.latlng.lng)
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Selected Location</Popup>
        </Marker>
    )
}

export default function MapPicker({ center = [48.8566, 2.3522], radius = 50, onLocationSelect }: MapPickerProps) {
    const [selectedPos, setSelectedPos] = useState<[number, number]>(center);
    const { theme } = useTheme();

    const handleSelect = (lat: number, lng: number) => {
        setSelectedPos([lat, lng]);
        onLocationSelect?.(lat, lng);
    }

    const tileLayerUrl = theme === 'dark'
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    const attribution = theme === 'dark'
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    return (
        <div className="h-[400px] w-full rounded-md border overflow-hidden relative z-0">
            <MapContainer center={center} zoom={5} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                    attribution={attribution}
                    url={tileLayerUrl}
                />
                <Marker position={selectedPos} />
                <Circle center={selectedPos} radius={radius * 1000} pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }} />
                <LocationMarker onLocationSelect={handleSelect} />
            </MapContainer>
        </div>
    )
}
