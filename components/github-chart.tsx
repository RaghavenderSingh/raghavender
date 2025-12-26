"use client";

import { ActivityCalendar } from 'react-activity-calendar';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface GithubChartProps {
    username: string;
}

export function GithubChart({ username }: GithubChartProps) {
    const { theme } = useTheme();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
            .then(response => response.json())
            .then(json => {
                if (json.contributions) {
                    setData(json.contributions);
                }
                setLoading(false);
            })
            .catch((e) => {
                console.error("Failed to fetch github data", e);
                setLoading(false);
            });
    }, [username]);

    if (loading) {
        return (
            <div className="flex w-full flex-col gap-4 border border-edge rounded-xl bg-card p-6 min-h-[200px] items-center justify-center">
                <div className="text-zinc-500 animate-pulse">Loading contributions...</div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-4 border border-edge rounded-xl bg-card p-6">
            <h2 className="text-xl font-semibold">GitHub Contributions</h2>
            <div className="flex justify-center overflow-x-auto no-scrollbar">
                <ActivityCalendar
                    data={data}
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    fontSize={12}
                    blockSize={12}
                    blockMargin={5}
                />
            </div>
        </div>
    );
}
