"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiSpotify } from "react-icons/si";
import { Play, Pause } from "lucide-react";

type SpotifyData = {
    playlist?: Array<{
        title: string;
        artist: string;
        album: string;
        albumImageUrl: string;
        songUrl: string;
        previewUrl?: string;
        youtubeId?: string;
        duration_ms?: number;
    }>;
};

export function SpotifyCard() {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    // Data Fetching Logic
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

    // Autoplay & Interaction Logic
    useEffect(() => {
        if (!track || hasAttemptedAutoplay) return;

        const attemptPlay = () => {
            if (track.previewUrl && audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setHasAttemptedAutoplay(true);
                        // Cleanup interaction listeners once playing
                        removeInteractionListeners();
                    })
                    .catch((err) => {
                        console.warn("Autoplay blocked, waiting for interaction:", err);
                    });
            } else if (track.youtubeId && iframeRef.current) {
                // For YouTube, we just signal it to play if we haven't yet
                iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                setIsPlaying(true);
                setHasAttemptedAutoplay(true);
                removeInteractionListeners();
            }
        };

        const removeInteractionListeners = () => {
            window.removeEventListener("click", attemptPlay);
            window.removeEventListener("keydown", attemptPlay);
            window.removeEventListener("touchstart", attemptPlay);
        };

        // Attempt immediate play
        attemptPlay();

        // Fallback for browser restrictions: play on first interaction
        window.addEventListener("click", attemptPlay);
        window.addEventListener("keydown", attemptPlay);
        window.addEventListener("touchstart", attemptPlay);

        return () => removeInteractionListeners();
    }, [track, hasAttemptedAutoplay]);

    // Command Input Logic
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                const command = window.prompt("Enter command:");
                if (command?.toLowerCase().includes("lets play the song from spotify highway to hell")) {
                    if (track?.previewUrl && audioRef.current) {
                        audioRef.current.play();
                        setIsPlaying(true);
                    } else if (track?.youtubeId && iframeRef.current) {
                        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                        setIsPlaying(true);
                    } else if (track?.songUrl) {
                        window.open(track.songUrl, "_blank");
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [track]);

    const togglePlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (track?.previewUrl && audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        } else if (track?.youtubeId && iframeRef.current) {
            const command = isPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
            iframeRef.current.contentWindow?.postMessage(command, '*');
            setIsPlaying(!isPlaying);
        } else if (track?.songUrl) {
            window.open(track.songUrl, "_blank");
        }
    };

    if (!track) {
        return (
            <div className="h-full w-full min-h-[80px] rounded-xl bg-[#050505] animate-pulse border border-white/5 md:aspect-square" />
        );
    }

    return (
        <div className="group relative block h-full w-full min-h-[220px] overflow-hidden rounded-2xl glass transition-all duration-500 hover:shadow-2xl">
            {track.previewUrl && <audio ref={audioRef} src={track.previewUrl} loop />}
            {track.youtubeId && !track.previewUrl && (
                <iframe
                    ref={iframeRef}
                    className="hidden"
                    src={`https://www.youtube.com/embed/${track.youtubeId}?enablejsapi=1&autoplay=0&loop=1&playlist=${track.youtubeId}`}
                    allow="autoplay"
                />
            )}
            
            <div className="absolute inset-0 z-0">
                <Image
                    src={track.albumImageUrl}
                    alt="Blur"
                    fill
                    className="object-cover opacity-15 blur-3xl scale-150 transition-opacity duration-700 group-hover:opacity-25"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background/80" />
            </div>

            <div className="flex flex-row md:flex-col h-full items-center justify-between p-5 md:p-6 relative z-10 gap-4">
                <div className="flex flex-col md:flex-row w-auto md:w-full items-center justify-between gap-3 order-3 md:order-1">
                    <div className="hidden md:flex items-center gap-2 rounded-xl glass px-3 py-1.5 border border-white/10 shadow-sm">
                        <SiSpotify className="text-[#1DB954] text-base" />
                        <span className="text-[10px] font-bold text-foreground/80 uppercase tracking-widest">Live Now</span>
                    </div>
                    
                    <button 
                        onClick={togglePlay}
                        className="p-3 md:p-2.5 rounded-xl glass hover:bg-white/10 border border-white/10 transition-all active:scale-95 group/btn shadow-sm"
                    >
                        {isPlaying ? (
                            <Pause className="size-5 md:size-4 text-[#1DB954] fill-[#1DB954]" />
                        ) : (
                            <Play className="size-5 md:size-4 text-[#1DB954] fill-[#1DB954] ml-0.5" />
                        )}
                    </button>

                    <div className="flex items-end gap-[3px] h-4">
                        <div className={`w-1 bg-[#1DB954] rounded-full transition-all duration-500 ${isPlaying ? 'h-full animate-[music-bar_1s_ease-in-out_infinite]' : 'h-1.5 opacity-50'}`} />
                        <div className={`w-1 bg-[#1DB954] rounded-full transition-all duration-500 ${isPlaying ? 'h-3 animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]' : 'h-1.5 opacity-50'}`} />
                        <div className={`w-1 bg-[#1DB954] rounded-full transition-all duration-500 ${isPlaying ? 'h-2 animate-[music-bar_0.8s_ease-in-out_infinite_0.2s]' : 'h-1.5 opacity-50'}`} />
                    </div>
                </div>

                <div className="relative w-20 h-20 md:w-[60%] md:aspect-square shrink-0 rounded-xl shadow-2xl overflow-hidden border border-white/20 group-hover:scale-105 transition-transform duration-700 order-1 md:order-2">
                    <Image
                        src={track.albumImageUrl}
                        alt={track.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col items-start md:items-center text-left md:text-center gap-0.5 flex-1 min-w-0 order-2 md:order-3">
                    <h3 className="text-sm md:text-base font-bold text-foreground leading-tight truncate w-full tracking-tight">
                        {track.title}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground truncate w-full tracking-wide">
                        {track.artist}
                    </p>
                </div>
            </div>
            
            <div className="absolute bottom-3 left-0 right-0 hidden md:flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-center">
                <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-[0.2em]">Cmd+K to play</span>
            </div>
        </div>
    );
}
