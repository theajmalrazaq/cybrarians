import { requireAuth } from "@/app/lib/auth";
import {
  getProfileByUserId,
  getFYPStudentByUserId,
  getPapersByUserId,
  getAllFYPStudents,
  getAllResearchAssistants,
  getAllCommunityMembers,
  getAllUsers,
} from "@/app/lib/db/service";
import type {
  User,
  ProfileWithUser,
  FYPStudentWithProfile,
  PaperWithAuthor,
  DashboardStats,
} from "@/app/types";

export default async function DashboardPage() {
  const session = await requireAuth();

  if (!session) {
    return null;
  }

  const isSupervisor = session.role === "supervisor";
  const isRA = session.role === "research_assistant";
  const isFYP = session.role === "fyp_student";

  // Get role-specific data
  let profile: ProfileWithUser | null = null;
  let fypData: FYPStudentWithProfile | null = null;
  let papers: PaperWithAuthor[] | null = null;
  let stats: DashboardStats | null = null;

  if (isRA || isFYP) {
    profile = getProfileByUserId(session.userId);
  }

  if (isFYP) {
    fypData = getFYPStudentByUserId(session.userId);
  }

  if (isRA) {
    papers = getPapersByUserId(session.userId);
  }

  if (isSupervisor) {
    const allUsers = getAllUsers();
    const allFYP = getAllFYPStudents();
    const allRA = getAllResearchAssistants();
    const allCommunity = getAllCommunityMembers();

    stats = {
      totalUsers: allUsers.length,
      totalFYP: allFYP.length,
      totalRA: allRA.length,
      totalCommunity: allCommunity.length,
      recentUsers: allUsers.slice(0, 5),
    };
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-2">Welcome back, {session.email}</p>
      </div>

      {/* Supervisor Dashboard */}
      {isSupervisor && stats && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Total Users</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stats.totalUsers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">FYP Students</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stats.totalFYP}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Research Assistants</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stats.totalRA}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Community Members</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stats.totalCommunity}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/x9z2k8w5q/dashboard/users"
                className="p-4 border border-border rounded-lg hover:bg-surface transition-colors"
              >
                <h3 className="font-semibold text-foreground">Add New User</h3>
                <p className="text-sm text-muted mt-1">
                  Create a new user account
                </p>
              </a>
              <a
                href="/x9z2k8w5q/dashboard/community"
                className="p-4 border border-border rounded-lg hover:bg-surface transition-colors"
              >
                <h3 className="font-semibold text-foreground">
                  Add Community Member
                </h3>
                <p className="text-sm text-muted mt-1">
                  Add a new community member
                </p>
              </a>
              <a
                href="/x9z2k8w5q/dashboard/fyp-students"
                className="p-4 border border-border rounded-lg hover:bg-surface transition-colors"
              >
                <h3 className="font-semibold text-foreground">
                  View FYP Projects
                </h3>
                <p className="text-sm text-muted mt-1">
                  Manage student projects
                </p>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Research Assistant Dashboard */}
      {isRA && (
        <div className="space-y-6">
          {/* Profile Card */}
          {profile && (
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Profile Information
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {profile.name || "Not set"}
                </p>
                <p>
                  <span className="font-semibold">Bio:</span>{" "}
                  {profile.bio || "Not set"}
                </p>
              </div>
              <a
                href="/x9z2k8w5q/dashboard/profile"
                className="inline-block mt-4 text-primary hover:text-primary-dark"
              >
                Edit Profile →
              </a>
            </div>
          )}

          {/* Papers Section */}
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">My Papers</h2>
              <a
                href="/x9z2k8w5q/dashboard/papers"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Manage Papers →
              </a>
            </div>
            {papers && papers.length > 0 ? (
              <div className="space-y-3">
                {papers.slice(0, 3).map((paper) => (
                  <div
                    key={paper.id}
                    className="p-4 border border-border rounded-lg"
                  >
                    <h3 className="font-semibold text-foreground">
                      {paper.title}
                    </h3>
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View Paper →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No papers added yet.</p>
            )}
          </div>
        </div>
      )}

      {/* FYP Student Dashboard */}
      {isFYP && (
        <div className="space-y-6">
          {/* Profile Card */}
          {profile && (
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Profile Information
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {profile.name || "Not set"}
                </p>
                <p>
                  <span className="font-semibold">Bio:</span>{" "}
                  {profile.bio || "Not set"}
                </p>
              </div>
              <a
                href="/x9z2k8w5q/dashboard/profile"
                className="inline-block mt-4 text-primary hover:text-primary-dark"
              >
                Edit Profile →
              </a>
            </div>
          )}

          {/* FYP Project Card */}
          {fypData && (
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                My FYP Project
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted">Project Title</p>
                  <p className="font-medium">
                    {fypData.project_title || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">Idea Description</p>
                  <p className="text-foreground">
                    {fypData.idea_description || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      fypData.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : fypData.status === "on_hold"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {fypData.status || "ongoing"}
                  </span>
                </div>
              </div>
              <a
                href="/x9z2k8w5q/dashboard/profile"
                className="inline-block mt-4 text-primary hover:text-primary-dark"
              >
                Update Project →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
