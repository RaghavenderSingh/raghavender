
import { getNowPlaying, getArtistTopTracks } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ACDC_ID = '711MCceyCBcFnzjGY4Q7Un'; // AC/DC Artist ID

export async function GET() {
    try {
        // Try to get what's currently playing first
        const response = await getNowPlaying();

        let isPlaying = false;
        let nowPlayingData = null;

        if (response && response.status === 200) {
            const song = await response.json();
            if (song.item && song.is_playing) {
                isPlaying = true;
                nowPlayingData = {
                    title: song.item.name,
                    artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
                    album: song.item.album.name,
                    albumImageUrl: song.item.album.images[0].url,
                    songUrl: song.item.external_urls.spotify,
                };
            }
        }

        // Always get AC/DC tracks for the "playlist" view
        console.log("Fetching AC/DC tracks...");
        const acdcResponse = await getArtistTopTracks(ACDC_ID);
        let tracks: {
            title: string;
            artist: string;
            album: string;
            albumImageUrl: string;
            songUrl: string;
            duration_ms?: number;
        }[] = [];

        if (acdcResponse) {
            console.log("AC/DC Response Status:", acdcResponse.status);
            if (acdcResponse.status === 200) {
                const data = await acdcResponse.json();
                if (data.tracks) {
                    // Try to find "Highway to Hell" specifically
                    const highwayToHell = data.tracks.find((t: any) => t.name.toLowerCase().includes("highway to hell"));
                    const targetTrack = highwayToHell || data.tracks[0]; // Fallback to top track

                    if (targetTrack) {
                        tracks = [{
                            title: targetTrack.name,
                            artist: targetTrack.artists.map((_artist: any) => _artist.name).join(', '),
                            album: targetTrack.album.name,
                            albumImageUrl: targetTrack.album.images[0].url,
                            songUrl: targetTrack.external_urls.spotify,
                            duration_ms: targetTrack.duration_ms // Add duration
                        }];
                    }
                } else {
                    console.error("No tracks found in AC/DC response:", data);
                }
            } else {
                const text = await acdcResponse.text();
                console.error("Failed to fetch AC/DC tracks. Status:", acdcResponse.status, "Body:", text);
            }
        } else {
            console.error("acdcResponse is null");
        }

        return NextResponse.json({
            isPlaying,
            ...nowPlayingData,
            playlist: tracks
        });

    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        return NextResponse.json({ isPlaying: false, playlist: [] });
    }
}
