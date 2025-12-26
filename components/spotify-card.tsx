"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiSpotify } from "react-icons/si";

type SpotifyData = {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
    playlist?: Array<{
        title: string;
        artist: string;
        album: string;
        albumImageUrl: string;
        songUrl: string;
        duration_ms?: number;
    }>;
};

export function SpotifyCard() {
    const [data, setData] = useState<SpotifyData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/spotify");
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching Spotify data", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const track = data?.playlist?.[0];

    if (!track) {
        return (
            <div className="h-full w-full md:aspect-square min-h-[80px] rounded-[32px] bg-[#050505] animate-pulse border border-white/5" />
        );
    }

    return (
        <Link
            href={track.songUrl}
            target="_blank"
            className="group relative block h-full w-full overflow-hidden rounded-[32px] bg-black border border-white/10 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(255,255,255,0.1)] md:aspect-square"
        >
            {/* Background Blur (Common) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={track.albumImageUrl}
                    alt="Blur"
                    fill
                    className="object-cover opacity-20 blur-2xl scale-150"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />
            </div>

            {/* --- DESKTOP VIEW (md+) --- */}
            <div className="hidden md:flex flex-col h-full items-center justify-between p-5 relative z-10">
                {/* Header */}
                <div className="w-full flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/5">
                        <SiSpotify className="text-[#1DB954] text-base" />
                        <span className="text-xs font-semibold text-white/90 tracking-wide">Spotify</span>
                    </div>
                    <div className="flex items-end gap-[2px] h-4">
                        <div className="w-1 h-full bg-[#1DB954] rounded-full animate-[music-bar_1s_ease-in-out_infinite]" />
                        <div className="w-1 h-3 bg-[#1DB954] rounded-full animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]" />
                        <div className="w-1 h-2 bg-[#1DB954] rounded-full animate-[music-bar_0.8s_ease-in-out_infinite_0.2s]" />
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative w-[55%] aspect-square shrink-0 rounded-xl shadow-2xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-500">
                    <Image
                        src={track.albumImageUrl}
                        alt={track.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Text Details */}
                <div className="flex flex-col items-center text-center gap-0.5 w-full mt-3">
                    <h3 className="text-lg font-bold text-white leading-tight truncate w-full">
                        {track.title}
                    </h3>
                    <p className="text-sm font-medium text-white/60 truncate w-full">
                        {track.artist}
                    </p>
                </div>
            </div>

            {/* --- MOBILE VIEW (Horizontal Pill) --- */}
            <div className="flex md:hidden flex-row items-center p-4 gap-4 h-full relative z-10">
                {/* Album Art (Small) */}
                <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10">
                    <Image
                        src={track.albumImageUrl}
                        alt={track.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0 justify-center">
                    <h3 className="text-base font-bold text-white leading-tight truncate">
                        {track.title}
                    </h3>
                    <p className="text-sm text-white/60 truncate">
                        {track.artist}
                    </p>
                </div>

                {/* Icon/Badge */}
                <div className="flex flex-col items-end gap-2">
                    <SiSpotify className="text-[#1DB954] text-xl" />
                    <div className="flex items-end gap-[2px] h-3">
                        <div className="w-0.5 h-full bg-[#1DB954] rounded-full animate-[music-bar_1s_ease-in-out_infinite]" />
                        <div className="w-0.5 h-2 bg-[#1DB954] rounded-full animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]" />
                        <div className="w-0.5 h-1.5 bg-[#1DB954] rounded-full animate-[music-bar_0.8s_ease-in-out_infinite_0.2s]" />
                    </div>
                </div>

                {/* Progress Bar (Bottom Overlay) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div className="h-full bg-[#1DB954] w-1/3 rounded-r-full" />
                </div>
            </div>
        </Link>
    );
}

