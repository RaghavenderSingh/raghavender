
import { USER } from "@/features/portfolio/data/user";

export function ResumeSection() {
    return (
        <div className="max-w-3xl mx-auto space-y-12 py-12">
            {/* Header / Summary */}
            <section className="space-y-4">
                <h1 className="text-4xl font-bold">{USER.displayName}</h1>
                <p className="text-xl text-muted-foreground">{USER.jobTitle}</p>
                <div className="prose dark:prose-invert max-w-none">
                    <p>{USER.bio}</p>
                </div>
            </section>

            <hr className="border-edge" />

            {/* Experience */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Experience</h2>
                <div className="space-y-8">
                    {USER.jobs.map((job, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <div>
                                <h3 className="text-lg font-medium">{job.title}</h3>
                                <a href={job.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    {job.company}
                                </a>
                            </div>
                            {/* Date would go here if available in data */}
                        </div>
                    ))}
                    {/* Placeholder for real experience if USER.jobs is limited */}
                    {USER.jobs.length === 0 && (
                        <p className="text-muted-foreground italic">Experience details to be added.</p>
                    )}
                </div>
            </section>

            <hr className="border-edge" />

            {/* Education */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Education</h2>
                <div className="space-y-4">
                    {/* Placeholder as USER data doesn't have education yet */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div>
                            <h3 className="text-lg font-medium">Degree Name (Placeholder)</h3>
                            <p className="text-muted-foreground">University Name</p>
                        </div>
                        <div className="text-sm text-muted-foreground">Year - Year</div>
                    </div>
                </div>
            </section>

            <hr className="border-edge" />

            {/* Skills */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {/* Extract skills from USER.about or keywords? For now using keywords */}
                    {USER.keywords.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
        </div>
    );
}
