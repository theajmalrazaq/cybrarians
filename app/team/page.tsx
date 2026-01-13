import Image from "next/image";
import PageHero from "@/app/components/PageHero";
import BottomCTA from "@/app/components/BottomCTA";
import {
  getAllResearchAssistants,
  getAllFYPStudents,
} from "@/app/lib/db/service";

export default async function TeamPage() {
  const researchAssistants = getAllResearchAssistants();
  const fypStudents = getAllFYPStudents();

  return (
    <div className="flex flex-col">
      <PageHero
        badge="Our Collective"
        title={
          <>
            The Minds Behind <br />
            <span className="text-gradient transition-transform duration-500">
              The Innovation.
            </span>
          </>
        }
        description="Our Team Consists Of Brilliant Research Assistants And Dedicated Final Year Students Working On Cutting-Edge Technology."
      />

      <div className="w-full px-6 md:px-16 lg:px-24 pb-24">
        {/* Research Assistants */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12 gap-10">
            <h2 className="text-2xl font-semibold text-black shrink-0">
              Research Assistants
            </h2>
            <div className="h-px flex-1 bg-zinc-100"></div>
            <div className="inline-flex items-center rounded-none border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted whitespace-nowrap">
              {researchAssistants.length} Researchers
            </div>
          </div>

          {researchAssistants.length === 0 ? (
            <div className="rounded-none border border-zinc-100 p-20 text-center bg-zinc-50/50">
              <p className="text-xl text-zinc-400 font-medium">
                No Research Assistants Listed.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {researchAssistants.map((member) => (
                <div
                  key={member.user_id}
                  className="group relative flex flex-col rounded-none border border-zinc-100 bg-white p-8 transition-all hover:bg-zinc-50 hover:border-brand/40"
                >
                  <div className="relative mb-8 h-56 w-full overflow-hidden rounded-none bg-zinc-100 grayscale transition-all duration-500 group-hover:grayscale-0">
                    {member.profile_picture ? (
                      <Image
                        src={member.profile_picture}
                        alt={member.name || "RA"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-200">
                        <span className="text-5xl font-bold text-zinc-300">
                          {member.name?.charAt(0) || "R"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-black">
                        {member.name}
                      </h3>
                      <p className="text-[10px] font-semibold text-brand mt-1">
                        Researcher
                      </p>
                      {member.bio && (
                        <p className="mt-5 text-sm leading-relaxed text-zinc-500 line-clamp-3 font-medium">
                          {member.bio}
                        </p>
                      )}
                    </div>
                    {member.email && (
                      <div className="mt-10 border-t border-zinc-100 pt-8">
                        <a
                          href={`mailto:${member.email}`}
                          className="text-[11px] font-medium text-black hover:text-brand transition-colors"
                        >
                          Send Inquiry ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FYP Students */}
        <section>
          <div className="flex items-center justify-between mb-12 gap-10">
            <h2 className="text-2xl font-semibold text-black shrink-0">
              FYP Students
            </h2>
            <div className="h-px flex-1 bg-zinc-100"></div>
            <div className="inline-flex items-center rounded-none border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted whitespace-nowrap">
              {fypStudents.length} Scholars
            </div>
          </div>

          {fypStudents.length === 0 ? (
            <div className="rounded-3xl border border-zinc-100 p-20 text-center bg-zinc-50/50">
              <p className="text-xl text-zinc-400 font-medium">
                No Students Listed.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {fypStudents.map((student) => (
                <div
                  key={student.user_id}
                  className="group flex flex-col rounded-none border border-zinc-100 bg-white p-8 transition-all hover:bg-zinc-50 hover:border-brand/40"
                >
                  <div className="relative mb-6 h-40 w-full overflow-hidden rounded-none bg-zinc-100">
                    {student.profile_picture ? (
                      <Image
                        src={student.profile_picture}
                        alt={student.name || "Student"}
                        fill
                        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-200">
                        <span className="text-4xl font-bold text-zinc-300">
                          {student.name?.charAt(0) || "S"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-black">
                      {student.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-brand mt-1">
                      {student.project_title || "FYP Scholar"}
                    </p>
                    <p className="mt-4 text-sm text-zinc-500 leading-relaxed line-clamp-3 font-medium">
                      {student.bio || student.idea_description}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-zinc-100">
                    <span className="text-[11px] font-medium text-zinc-400">
                      Scholar Class 2026
                    </span>
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
