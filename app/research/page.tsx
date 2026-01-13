import { getAllPapers, getAllFYPStudents } from "@/app/lib/db/service";
import PageHero from "@/app/components/PageHero";
import BottomCTA from "@/app/components/BottomCTA";

export default async function ResearchPage() {
  const papers = getAllPapers();
  const fypProjects = getAllFYPStudents();

  return (
    <div className="flex flex-col">
      <PageHero
        badge="Archive & Contributions"
        title={
          <>
            Intellectual Output & <br />
            <span className="text-gradient transition-transform duration-500">
              Academic Impact.
            </span>
          </>
        }
        description="Explore Our Published Research Papers And High-Impact Final Year Projects Across Various Technological Domains."
      />

      <div className="w-full px-6 md:px-16 lg:px-24 py-20">
        {/* Research Papers Section */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-16 gap-10">
            <h2 className="text-2xl font-semibold text-black shrink-0">
              Published Papers
            </h2>
            <div className="h-px flex-1 bg-zinc-100"></div>
            <div className="inline-flex items-center rounded-none border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted whitespace-nowrap">
              {papers.length} Contributions
            </div>
          </div>

          {papers.length === 0 ? (
            <div className="rounded-none border border-zinc-100 p-20 text-center bg-zinc-50/50">
              <p className="text-xl text-zinc-400 font-medium">
                No Research Papers Published Yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className="group relative flex flex-col justify-between rounded-none border border-zinc-100 bg-white p-10 transition-all hover:border-brand/40"
                >
                  <div className="mb-8">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-brand">
                        Publication
                      </span>
                      <span className="text-xs font-bold text-zinc-300">
                        {paper.published_date
                          ? new Date(paper.published_date).getFullYear()
                          : "2026"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-black mb-4 group-hover:text-brand transition-colors leading-[1.2]">
                      {paper.title}
                    </h3>
                    {paper.author_name && (
                      <p className="text-base font-bold text-zinc-400 mb-4">
                        By{" "}
                        <span className="text-black underline decoration-zinc-100 decoration-2 underline-offset-4">
                          {paper.author_name}
                        </span>
                      </p>
                    )}
                    {paper.description && (
                      <p className="text-sm leading-relaxed text-zinc-500 line-clamp-3 font-medium">
                        {paper.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-zinc-50 pt-8">
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 text-[13px] font-medium text-black hover:gap-6 transition-all hover:text-brand"
                    >
                      Access Paper <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FYP Projects Section */}
        <section>
          <div className="flex items-center justify-between mb-16 gap-10">
            <h2 className="text-2xl font-semibold text-black shrink-0">
              FYP Projects
            </h2>
            <div className="h-px flex-1 bg-zinc-100"></div>
            <div className="inline-flex items-center rounded-none border border-border bg-surface px-3 py-1 text-xs font-medium text-muted whitespace-nowrap">
              {fypProjects.length} Scholars
            </div>
          </div>

          {fypProjects.length === 0 ? (
            <div className="rounded-3xl border border-zinc-100 p-20 text-center bg-zinc-50/50">
              <p className="text-xl text-zinc-400 font-medium">
                No FYP Projects Active.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fypProjects.map((project) => (
                <div
                  key={project.user_id}
                  className="group rounded-none border border-zinc-100 bg-white p-8 transition-all hover:border-brand/40"
                >
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center rounded-none px-3 py-1 text-[11px] font-medium ${
                        project.status === "completed"
                          ? "bg-green-50 text-green-600"
                          : project.status === "on_hold"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-brand/10 text-brand"
                      }`}
                    >
                      {project.status || "Ongoing"}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-brand transition-colors leading-tight">
                    {project.project_title || "Untitled Project"}
                  </h3>
                  {project.name && (
                    <p className="text-[11px] font-semibold text-zinc-400 mt-1">
                      By {project.name}
                    </p>
                  )}
                  {project.idea_description && (
                    <p className="text-sm leading-relaxed text-zinc-500 line-clamp-4 font-medium">
                      {project.idea_description}
                    </p>
                  )}

                  <div className="mt-8 flex items-center justify-between border-t border-zinc-50 pt-6">
                    <span className="text-[11px] font-medium text-zinc-300">
                      {project.year || "2025-26"}
                    </span>
                    <button className="text-[13px] font-medium text-black hover:text-brand transition-colors">
                      Review ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <BottomCTA />
    </div>
  );
}
