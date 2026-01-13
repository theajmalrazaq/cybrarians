import Image from "next/image";
import {
  getAllResearchAssistants,
  getAllFYPStudents,
} from "@/app/lib/db/service";

export const metadata = {
  title: "Team | Cybrarians",
  description: "Meet our Research Assistants and FYP students.",
};

export default async function TeamPage() {
  const researchAssistants = getAllResearchAssistants();
  const fypStudents = getAllFYPStudents();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Team</h1>
          <p className="mt-4 text-muted">
            Meet the researchers and students driving our work forward.
          </p>
        </div>

        {/* Research Assistants */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-semibold text-foreground">
            Research Assistants
          </h2>
          {researchAssistants.length === 0 ? (
            <p className="text-muted">No research assistants yet.</p>
          ) : (
            <div className="space-y-6">
              {researchAssistants.map((member) => (
                <div
                  key={member.user_id}
                  className="flex gap-6 border-b border-border pb-6 last:border-0"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                    {member.profile_picture ? (
                      <Image
                        src={member.profile_picture}
                        alt={member.name || "Research Assistant"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100">
                        <span className="text-2xl font-bold text-blue-600">
                          {member.name?.charAt(0).toUpperCase() || "R"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {member.name || "Research Assistant"}
                    </h3>
                    <p className="text-sm text-primary">Research Assistant</p>
                    {member.bio && (
                      <p className="mt-2 text-muted">{member.bio}</p>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="mt-2 inline-block text-sm text-primary hover:underline"
                      >
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FYP Students */}
        <section>
          <h2 className="mb-8 text-2xl font-semibold text-foreground">
            FYP Students
          </h2>
          {fypStudents.length === 0 ? (
            <p className="text-muted">No FYP students yet.</p>
          ) : (
            <div className="space-y-6">
              {fypStudents.map((student) => (
                <div
                  key={student.user_id}
                  className="flex gap-6 border-b border-border pb-6 last:border-0"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                    {student.profile_picture ? (
                      <Image
                        src={student.profile_picture}
                        alt={student.name || "FYP Student"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-100">
                        <span className="text-2xl font-bold text-green-600">
                          {student.name?.charAt(0).toUpperCase() || "S"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {student.name || "FYP Student"}
                    </h3>
                    <p className="text-sm text-primary">
                      {student.project_title || "FYP Student"}
                    </p>
                    {student.bio && (
                      <p className="mt-2 text-muted">{student.bio}</p>
                    )}
                    {student.idea_description && !student.bio && (
                      <p className="mt-2 text-muted">
                        {student.idea_description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
