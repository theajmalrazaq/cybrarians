import { redirect } from "next/navigation";
import { requireRole } from "@/app/lib/auth";
import {
  getAllResearchAssistants,
  getPapersByUserId,
} from "@/app/lib/db/service";
import type { PaperWithAuthor } from "@/app/types";

export default async function ResearchAssistantsPage() {
  const session = await requireRole(["supervisor"]);

  if (!session) {
    redirect("/x9z2k8w5q");
  }

  const assistants = getAllResearchAssistants();

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Research Assistants
        </h1>
        <p className="text-muted mt-2">
          View research assistants and their publications
        </p>
      </div>

      <div className="space-y-6">
        {/* Statistics */}
        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-sm text-muted">Total Research Assistants</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {assistants.length}
          </p>
        </div>

        {/* Assistants List */}
        {assistants.length === 0 ? (
          <div className="bg-background border border-border rounded-lg p-8 text-center">
            <p className="text-muted">No research assistants found.</p>
            <p className="text-sm text-muted mt-2">
              Create a user with the &quot;Research Assistant&quot; role to get
              started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {assistants.map((assistant) => {
              const papers = getPapersByUserId(assistant.user_id);

              return (
                <div
                  key={assistant.user_id}
                  className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {assistant.profile_picture ? (
                          <img
                            src={assistant.profile_picture}
                            alt={assistant.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-700 font-semibold text-lg">
                              {assistant.name?.charAt(0).toUpperCase() || "R"}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {assistant.name || "No name set"}
                          </h3>
                          <p className="text-sm text-muted">
                            {assistant.email}
                          </p>
                        </div>
                      </div>

                      {assistant.bio && (
                        <p className="text-sm text-muted mb-4">
                          {assistant.bio}
                        </p>
                      )}

                      {/* Papers Section */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-foreground">
                            Publications ({papers.length})
                          </h4>
                        </div>

                        {papers.length === 0 ? (
                          <p className="text-sm text-muted">
                            No papers published yet
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {papers.map((paper: PaperWithAuthor) => (
                              <div
                                key={paper.id}
                                className="p-3 bg-surface rounded-lg"
                              >
                                <h5 className="text-sm font-medium text-foreground mb-1">
                                  {paper.title}
                                </h5>
                                {paper.description && (
                                  <p className="text-xs text-muted mb-2">
                                    {paper.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 text-xs">
                                  <a
                                    href={paper.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline font-medium"
                                  >
                                    View Paper →
                                  </a>
                                  {paper.published_date && (
                                    <span className="text-muted">
                                      Published:{" "}
                                      {new Date(
                                        paper.published_date,
                                      ).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted">
                          Joined:{" "}
                          {new Date(assistant.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
