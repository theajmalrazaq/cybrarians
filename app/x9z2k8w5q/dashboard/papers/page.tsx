import { redirect } from "next/navigation";
import { requireAuth } from "@/app/lib/auth";
import PapersManager from "../../components/PapersManager";
import { getPapersByUserId } from "@/app/lib/db/service";

export default async function PapersPage() {
  const session = await requireAuth();

  if (!session) {
    redirect("/x9z2k8w5q");
  }

  // Only Research Assistants can access this page
  if (session.role !== "research_assistant") {
    redirect("/x9z2k8w5q/dashboard");
  }

  const papers = getPapersByUserId(session.userId);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">My Papers</h1>
        <p className="text-muted mt-2">
          Manage your research papers and publications
        </p>
      </div>

      <PapersManager userId={session.userId} initialPapers={papers} />
    </div>
  );
}
