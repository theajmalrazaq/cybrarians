import { Research } from "@/app/lib/data";

export default function ResearchCard({ research }: { research: Research }) {
  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-zinc-100 bg-background p-8 transition-all hover:bg-zinc-50 hover:border-brand/30">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              research.type === "paper" ? "text-brand" : "text-zinc-600"
            }`}
          >
            {research.type === "paper" ? "Publication" : "Project"}
          </span>
          <span className="text-[10px] font-medium text-zinc-400">
            {research.year}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-semibold leading-tight text-black group-hover:text-brand transition-colors">
          {research.title}
        </h3>

        <p className="mb-3 text-xs font-bold text-zinc-400">
          {research.authors.join(", ")}
        </p>

        <p className="mb-4 text-sm leading-relaxed text-zinc-500 line-clamp-3 font-medium">
          {research.abstract}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {research.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border bg-surface px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-zinc-100">
        {research.link && (
          <a
            href={research.link}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black hover:gap-3 transition-all hover:text-brand"
          >
            Access <span>→</span>
          </a>
        )}
      </div>
    </article>
  );
}
