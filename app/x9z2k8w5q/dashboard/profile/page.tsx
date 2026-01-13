import { redirect } from "next/navigation";
import { requireAuth } from "@/app/lib/auth";
import ProfileForm from "../../components/ProfileForm";
import {
  getProfileByUserId,
  getFYPStudentByUserId,
} from "@/app/lib/db/service";

export default async function ProfilePage() {
  const session = await requireAuth();

  if (!session) {
    redirect("/x9z2k8w5q");
  }

  // Only RAs and FYP students can access this page
  if (session.role === "supervisor") {
    redirect("/x9z2k8w5q/dashboard");
  }

  const profile = getProfileByUserId(session.userId);
  const fypData =
    session.role === "fyp_student"
      ? getFYPStudentByUserId(session.userId)
      : null;

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted mt-2">
          Update your profile information and project details
        </p>
      </div>

      <ProfileForm
        userId={session.userId}
        role={session.role as "research_assistant" | "fyp_student"}
        initialProfile={profile}
        initialFypData={fypData}
      />
    </div>
  );
}
