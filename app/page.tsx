import { ProfileHeader } from "@/components/profile-header";
import { SpotifyCard } from "@/components/spotify-card";
import { GithubChart } from "@/components/github-chart";
import { ProjectsCard } from "@/components/projects-card";
import { WorkExperienceCard } from "@/components/work-experience-card";
import { SkillsCard } from "@/components/skills-card";
import { AchievementsCard } from "@/components/achievements-card";

export default function Home() {
  return (
    <main className="min-h-screen p-4 pt-28 md:p-8 md:pt-25 max-w-5xl mx-auto space-y-4">
   
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 h-full">
          <ProfileHeader />
        </div>
        <div className="md:col-span-1 h-full">
          <SpotifyCard />
        </div>
      </div>

  
      <div className="w-full">
        <GithubChart username="RaghavenderSingh" />
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-full">
          <ProjectsCard />
        </div>
        <div className="h-full">
          <WorkExperienceCard />
        </div>
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-full">
          <SkillsCard />
        </div>
        <div className="h-full">
          <AchievementsCard />
        </div>
      </div>
    </main>
  );
}
