import { getAllPapers, getAllFYPStudents } from "@/app/lib/db/service";
import ResearchCard from "@/app/components/ResearchCard";

export const metadata = {
  title: "Research | Cybrarians",
  description: "Explore our research papers and FYP projects",
};

export default async function ResearchPage() {
  const papers = getAllPapers();
  const fypProjects = getAllFYPStudents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground">Research</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Browse our published research papers and Final Year Projects. Our work
          spans machine learning, blockchain, IoT, and more.
        </p>
      </div>

      {/* Research Papers Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Research Papers
        </h2>
        {papers.length === 0 ? (
          <p className="text-muted">No research papers published yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="rounded-lg border border-border bg-background p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {paper.title}
                </h3>
                {paper.author_name && (
                  <p className="text-sm text-primary mb-3">
                    By {paper.author_name}
                  </p>
                )}
                {paper.description && (
                  <p className="text-sm text-muted mb-4">{paper.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View Paper →
                  </a>
                  {paper.published_date && (
                    <span className="text-xs text-muted">
                      {new Date(paper.published_date).getFullYear()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FYP Projects Section */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          FYP Projects
        </h2>
        {fypProjects.length === 0 ? (
          <p className="text-muted">No FYP projects yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {fypProjects.map((project) => (
              <div
                key={project.user_id}
                className="rounded-lg border border-border bg-background p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.project_title || "Untitled Project"}
                </h3>
                {project.name && (
                  <p className="text-sm text-primary mb-3">By {project.name}</p>
                )}
                {project.idea_description && (
                  <p className="text-sm text-muted mb-4">
                    {project.idea_description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : project.status === "on_hold"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {project.status === "ongoing"
                      ? "Ongoing"
                      : project.status === "completed"
                        ? "Completed"
                        : "On Hold"}
                  </span>
                  {project.year && (
                    <span className="text-xs text-muted">{project.year}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
