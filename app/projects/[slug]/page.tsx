import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen p-4 pt-28 md:p-8 md:pt-25 max-w-350 mx-auto space-y-8">
      <div>
        <Link href="/">
          <Button variant="ghost" className="-ml-3 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 size-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        <div className="lg:col-span-7 space-y-8">

          <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-edge flex items-center justify-center text-muted-foreground">
             <span className="text-sm">Project Preview</span>
          </div>

          {project.techStack && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium border border-edge"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>


        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h1>
            <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full sm:w-auto">
                  Visit Project <ExternalLink className="ml-2 size-4" />
                </Button>
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full sm:w-auto">
                  View Source <Github className="ml-2 size-4" />
                </Button>
              </a>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none text-muted-foreground">
             <p>{project.longDescription}</p>
          </div>

          {project.features && (
            <div className="space-y-4 pt-4 border-t border-edge">
              <h3 className="text-lg font-semibold">Key Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
