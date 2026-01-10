import { ProfileHeader } from "@/components/profile-header";
import { SpotifyCard } from "@/components/spotify-card";
import { GithubChart } from "@/components/github-chart";
import { ProjectsCard } from "@/components/projects-card";
import { WorkExperienceCard } from "@/components/work-experience-card";
import { SkillsCard } from "@/components/skills-card";
import { AchievementsCard } from "@/components/achievements-card";

export default function Home() {
  return (
    <main className="min-h-screen p-4 pt-32 md:p-8 md:pt-36 max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        <div className="md:col-span-3">
          <ProfileHeader />
        </div>
        <div className="md:col-span-1">
          <SpotifyCard />
        </div>
      </div>

      <div className="w-full">
        <GithubChart username="RaghavenderSingh" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectsCard />
        <WorkExperienceCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillsCard />
        <AchievementsCard />
      </div>
    </main>
  );
}
