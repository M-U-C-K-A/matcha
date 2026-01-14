"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Fix for default marker icon in Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface UserLocation {
    id: string;
    username: string;
    latitude: number;
    longitude: number;
    avatar?: string;
}

interface UserMapProps {
    users: UserLocation[];
}

export default function UserMap({ users }: UserMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="h-[600px] w-full rounded-md border bg-muted flex items-center justify-center">
                Loading map...
            </div>
        );
    }

    // Default center (Paris)
    const center: [number, number] = [48.8566, 2.3522];
    const { theme } = useTheme();

    const tileLayerUrl = theme === 'dark'
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    const attribution = theme === 'dark'
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    return (
        <MapContainer
            center={center}
            zoom={5}
            scrollWheelZoom={true}
            className="h-[600px] w-full rounded-md border z-0"
        >
            <TileLayer
                attribution={attribution}
                url={tileLayerUrl}
            />
            {users.map((user) => (
                <Marker
                    key={user.id}
                    position={[user.latitude, user.longitude]}
                >
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold">{user.username}</h3>
                            {/* Add link to profile or more info here */}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
