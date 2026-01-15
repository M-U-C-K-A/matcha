"use client";

import { useState, useEffect } from "react";

export default function DevBadge() {
    const [token, setToken] = useState<string | null>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Only render in development
    const isDev = process.env.NODE_ENV === "development";

    useEffect(() => {
        if (!isDev) return;

        // Get token from cookie
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);
        setToken(cookies.token || null);

        // Set initial window size
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        // Update on resize
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isDev]);

    if (!isDev) return null;

    const getBreakpoint = (width: number) => {
        if (width < 640) return "xs";
        if (width < 768) return "sm";
        if (width < 1024) return "md";
        if (width < 1280) return "lg";
        if (width < 1536) return "xl";
        return "2xl";
    };

    const bp = getBreakpoint(windowSize.width);
    const truncatedToken = token ? `${token.slice(0, 20)}...${token.slice(-10)}` : "No token";

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            {/* Toggle button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
            >
                {isVisible ? "×" : "D"}
            </button>

            {isVisible && (
                <div className="bg-zinc-900 text-white text-xs font-mono p-3 rounded-lg shadow-xl border border-zinc-700 min-w-[280px] space-y-2">
                    <div className="text-yellow-500 font-bold mb-2">🔧 Dev Mode</div>

                    {/* Breakpoint */}
                    <div className="flex items-center gap-2">
                        <span className="text-zinc-400">Breakpoint:</span>
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded font-bold">
                            {bp}
                        </span>
                        <span className="text-zinc-500">
                            {windowSize.width} × {windowSize.height}
                        </span>
                    </div>

                    {/* Breakpoint indicators */}
                    <div className="flex gap-1">
                        {["xs", "sm", "md", "lg", "xl", "2xl"].map((b) => (
                            <span
                                key={b}
                                className={`px-1.5 py-0.5 rounded text-[10px] ${b === bp
                                        ? "bg-blue-500 text-white"
                                        : "bg-zinc-700 text-zinc-400"
                                    }`}
                            >
                                {b}
                            </span>
                        ))}
                    </div>

                    {/* JWT Token */}
                    <div className="pt-2 border-t border-zinc-700">
                        <span className="text-zinc-400">JWT Token:</span>
                        <div
                            className={`mt-1 px-2 py-1 rounded text-[10px] break-all ${token
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
                            title={token || "No token"}
                        >
                            {truncatedToken}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
