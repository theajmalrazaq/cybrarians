import Link from "next/link";
import Image from "next/image";
import { team } from "@/app/lib/data";

export default function Home() {
  const experts = team.filter((m) => m.role === "ra");

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-20 md:flex-row">
          <div className="flex-1">
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Advancing Knowledge Through Collaborative Research
            </h1>
            <p className="mt-6 text-lg text-muted">
              We are a dedicated academic research group pushing the boundaries
              of knowledge in computer science, information systems, and
              emerging technologies.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/research"
                className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Explore Research
              </Link>
              <Link
                href="/team"
                className="rounded-lg border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-surface"
              >
                Meet the Team
              </Link>
            </div>
          </div>
          <div className="relative h-64 w-64 flex-shrink-0 md:h-80 md:w-80">
            <Image
              src="/globe.svg"
              alt="Research illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Find an Expert Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Find an Expert
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              Our research assistants bring deep expertise across multiple
              domains. Connect with the right expert for your research needs,
              industry collaboration, or academic guidance.
            </p>
          </div>

          <div className="space-y-6">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="flex gap-6 border-b border-border pb-6 last:border-0"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {expert.name}
                  </h3>
                  <p className="text-sm text-primary">{expert.title}</p>
                  <p className="mt-1 text-muted">{expert.bio}</p>
                  {expert.email && (
                    <a
                      href={`mailto:${expert.email}`}
                      className="mt-2 inline-block text-sm text-primary hover:underline"
                    >
                      Contact
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/team"
              className="inline-block rounded-lg border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-surface"
            >
              View All Team Members
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
