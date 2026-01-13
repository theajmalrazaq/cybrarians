import { redirect } from "next/navigation";
import { requireRole } from "@/app/lib/auth";
import CommunityManager from "../../components/CommunityManager";
import { getAllCommunityMembers } from "@/app/lib/db/service";

export default async function CommunityPage() {
  const session = await requireRole(["supervisor"]);

  if (!session) {
    redirect("/x9z2k8w5q");
  }

  const members = getAllCommunityMembers();

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Community Members
        </h1>
        <p className="text-muted mt-2">
          Manage cybersecurity society community members
        </p>
      </div>

      <CommunityManager initialMembers={members} />
    </div>
  );
}
