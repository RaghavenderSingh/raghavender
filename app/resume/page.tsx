
import { ResumeSection } from "@/components/resume/resume-section";
import { GithubChart } from "@/components/github-chart";
import { USER } from "@/features/portfolio/data/user";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResumePage() {
    return (
        <main className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="size-4" /> Back to Home
                </Link>

                <ResumeSection />

                <hr className="my-12 border-edge" />

                <GithubChart username={USER.username} />
            </div>
        </main>
    );
}
