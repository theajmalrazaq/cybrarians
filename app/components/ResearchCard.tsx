import { Research } from "@/app/lib/data";

export default function ResearchCard({ research }: { research: Research }) {
  return (
    <article className="rounded-lg border border-border bg-background p-6 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            research.type === "paper"
              ? "bg-surface text-primary"
              : "bg-surface text-foreground"
          }`}
        >
          {research.type === "paper" ? "Research Paper" : "FYP Project"}
        </span>
        <span className="text-sm text-muted">{research.year}</span>
      </div>

      <h3 className="mb-2 text-lg font-semibold leading-tight text-foreground">
        {research.title}
      </h3>

      <p className="mb-3 text-sm text-primary">{research.authors.join(", ")}</p>

      <p className="mb-4 text-sm leading-relaxed text-muted">
        {research.abstract}
      </p>

      <div className="flex flex-wrap gap-2">
        {research.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-surface px-2 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {research.link && (
        <a
          href={research.link}
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Read Paper
        </a>
      )}
    </article>
  );
}
