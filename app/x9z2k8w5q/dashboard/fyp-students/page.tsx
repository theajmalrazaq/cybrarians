import { redirect } from "next/navigation";
import { requireRole } from "@/app/lib/auth";
import { getAllFYPStudents } from "@/app/lib/db/service";

export default async function FYPStudentsPage() {
  const session = await requireRole(["supervisor"]);

  if (!session) {
    redirect("/x9z2k8w5q");
  }

  const students = getAllFYPStudents();

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">FYP Students</h1>
        <p className="text-muted mt-2">
          View and manage Final Year Project students
        </p>
      </div>

      <div className="space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background border border-border rounded-lg p-4">
            <p className="text-sm text-muted">Total Students</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {students.length}
            </p>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <p className="text-sm text-muted">Ongoing Projects</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {students.filter((s) => s.status === "ongoing").length}
            </p>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <p className="text-sm text-muted">Completed Projects</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {students.filter((s) => s.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Students List */}
        {students.length === 0 ? (
          <div className="bg-background border border-border rounded-lg p-8 text-center">
            <p className="text-muted">No FYP students found.</p>
            <p className="text-sm text-muted mt-2">
              Create a user with the &quot;FYP Student&quot; role to get
              started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {students.map((student) => (
              <div
                key={student.user_id}
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {student.profile_picture ? (
                        <img
                          src={student.profile_picture}
                          alt={student.name || "Student"}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-semibold text-lg">
                            {student.name?.charAt(0).toUpperCase() || "S"}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {student.name || "No name set"}
                        </h3>
                        <p className="text-sm text-muted">{student.email}</p>
                      </div>
                    </div>

                    {student.bio && (
                      <p className="text-sm text-muted mb-4">{student.bio}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">
                          Project Title
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {student.project_title || "Not set"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">
                          Year
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {student.year || "Not set"}
                        </p>
                      </div>

                      {student.idea_description && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-muted uppercase tracking-wide mb-1">
                            Project Description
                          </p>
                          <p className="text-sm text-foreground">
                            {student.idea_description}
                          </p>
                        </div>
                      )}

                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">
                          Status
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            student.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : student.status === "on_hold"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {student.status === "ongoing"
                            ? "Ongoing"
                            : student.status === "completed"
                              ? "Completed"
                              : "On Hold"}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">
                          Joined
                        </p>
                        <p className="text-sm text-foreground">
                          {new Date(student.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
